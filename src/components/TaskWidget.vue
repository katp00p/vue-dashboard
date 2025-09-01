<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTasksStore } from '@/stores/useTasksStore'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'

const store = useTasksStore()

onMounted(() => {
  store.load()
  store.seedIfEmpty()
})

/* ---------- Add Modal State ---------- */
const addOpen = ref(false)
const addType = ref('list')
const title = ref('')
const parentProjectId = ref(null)
const parentListId = ref(null)
const initialFocusRef = ref(null)

function openAdd(type = 'list') {
  addType.value = type
  title.value = ''
  parentProjectId.value = null
  parentListId.value = null
  addOpen.value = true
}
function closeAdd() {
  addOpen.value = false
}

const canSubmit = computed(() => title.value.trim().length > 0)
function submitAdd() {
  if (!canSubmit.value) return
  const t = addType.value
  const text = title.value.trim()
  if (t === 'project') store.addProject(text)
  else if (t === 'list') store.addList(text, parentProjectId.value || null)
  else store.addTask(text, parentListId.value || null)
  closeAdd()
}

/* ---------- Edit Modal State ---------- */
const editOpen = ref(false)
const editType = ref('task') // 'task' | 'list' | 'project'
const editId = ref(null)
const editTitle = ref('')
const initialEditFocusRef = ref(null)

function openEdit(type, id) {
  editType.value = type
  editId.value = id
  if (type === 'project') editTitle.value = store.projects[id]?.title || ''
  else if (type === 'list') editTitle.value = store.lists[id]?.title || ''
  else editTitle.value = store.tasks[id]?.title || ''
  editOpen.value = true
}
function closeEdit() {
  editOpen.value = false
  editId.value = null
  editTitle.value = ''
}
const canSaveEdit = computed(() => editTitle.value.trim().length > 0)
function saveEdit() {
  if (!canSaveEdit.value || !editId.value) return
  const text = editTitle.value.trim()
  if (editType.value === 'project') store.renameProject(editId.value, text)
  else if (editType.value === 'list') store.renameList(editId.value, text)
  else store.renameTask(editId.value, text)
  closeEdit()
}

/* ---------- Delete Confirm Modal ---------- */
const deleteOpen = ref(false)
const deleteType = ref('task') // 'task' | 'list' | 'project'
const deleteId = ref(null)
const initialDeleteFocusRef = ref(null)

function openDelete(type, id) {
  deleteType.value = type
  deleteId.value = id
  deleteOpen.value = true
}
function closeDelete() {
  deleteOpen.value = false
  deleteId.value = null
}

const deleteTitle = computed(() => {
  if (!deleteId.value) return ''
  if (deleteType.value === 'project')
    return store.projects[deleteId.value]?.title || 'Untitled Project'
  if (deleteType.value === 'list') return store.lists[deleteId.value]?.title || 'Untitled List'
  return store.tasks[deleteId.value]?.title || 'Untitled Task'
})

const cascadeCounts = computed(() => {
  if (!deleteId.value) return { lists: 0, tasks: 0 }
  if (deleteType.value === 'project') {
    const p = store.projects[deleteId.value]
    const listIds = p?.listIds || []
    const lists = listIds.length
    const tasks = listIds.reduce((acc, lid) => acc + (store.lists[lid]?.taskIds?.length || 0), 0)
    return { lists, tasks }
  }
  if (deleteType.value === 'list') {
    const l = store.lists[deleteId.value]
    return { lists: 0, tasks: l?.taskIds?.length || 0 }
  }
  return { lists: 0, tasks: 0 }
})

function confirmDelete() {
  if (!deleteId.value) return
  if (deleteType.value === 'project') store.deleteProject(deleteId.value)
  else if (deleteType.value === 'list') store.deleteList(deleteId.value)
  else store.deleteTask(deleteId.value)
  closeDelete()
}

/* ---------- Render Helpers ---------- */
const projects = computed(() =>
  store.order.projects.map((id) => store.projects[id]).filter(Boolean),
)
const listsInProject = (pid) =>
  (store.projects[pid]?.listIds || []).map((id) => store.lists[id]).filter(Boolean)
const tasksInList = (lid) =>
  (store.lists[lid]?.taskIds || []).map((id) => store.tasks[id]).filter(Boolean)

const ungroupedLists = computed(() => store.ungroupedLists)
const ungroupedTasks = computed(() => store.ungroupedTasks)
</script>

<template>
  <section
    id="widget-todo"
    class="glass rounded-md shadow-card flex flex-col flex-1 min-h-0 w-full overflow-hidden"
  >
    <!-- Header -->
    <div class="sticky top-0 z-20 border-b border-white/10 bg-transparent px-4 py-2">
      <div class="flex items-center justify-between gap-3">
        <h2 class="card-title text-slate-100 font-semibold leading-tight">Tasks</h2>
        <button
          type="button"
          aria-label="Add"
          class="p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40"
          @click="openAdd('list')"
        >
          <i class="fa-solid fa-plus text-base"></i>
        </button>
      </div>
    </div>

    <!-- Body -->
    <div class="scrollbar px-4 py-3 pb-4 overflow-auto min-h-0 flex-1 space-y-6">
      <!-- Projects -->
      <section v-if="projects.length">
        <h3 class="text-slate-200 font-semibold text-sm mb-2">Projects</h3>
        <ul class="space-y-2">
          <li
            v-for="p in projects"
            :key="p.id"
            class="rounded-lg border border-accent/40 bg-accent/10"
          >
            <Disclosure>
              <!-- Named group for Project row -->
              <DisclosureButton
                class="w-full flex items-center justify-between gap-3 px-3 py-2 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-accent/40 rounded-lg group/project"
                :aria-label="`Toggle project ${p.title}`"
              >
                <div class="flex flex-wrap items-center gap-2">
                  <i class="fa-solid fa-folder text-slate-200"></i>
                  <span
                    class="text-[10px] uppercase tracking-wide rounded px-1.5 py-0.5 bg-white/20 text-slate-100"
                    >Project</span
                  >
                  <span class="text-slate-100 font-medium">{{ p.title }}</span>
                  <span class="ml-2 text-xs text-slate-300">
                    {{ (p.listIds || []).length }} lists •
                    {{
                      (p.listIds || []).reduce(
                        (acc, lid) => acc + (store.lists[lid]?.taskIds?.length || 0),
                        0,
                      )
                    }}
                    tasks
                  </span>
                </div>
                <!-- Hover icons (only on hovered project row) -->
                <div
                  class="flex items-center gap-1 opacity-0 group-hover/project:opacity-100 transition-opacity"
                >
                  <button
                    class="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded"
                    @click.stop.prevent="openEdit('project', p.id)"
                    aria-label="Edit project"
                  >
                    <i class="fa-solid fa-pencil text-xs"></i>
                  </button>
                  <button
                    class="p-1 text-slate-300 hover:text-red-400 hover:bg-white/10 rounded"
                    @click.stop.prevent="openDelete('project', p.id)"
                    aria-label="Delete project"
                  >
                    <i class="fa-solid fa-xmark text-xs"></i>
                  </button>
                </div>
              </DisclosureButton>

              <DisclosurePanel class="px-3 pb-3">
                <ul class="space-y-2">
                  <li
                    v-for="l in listsInProject(p.id)"
                    :key="l.id"
                    class="rounded-lg border border-white/10 bg-white/5"
                  >
                    <Disclosure>
                      <!-- Named group for List row -->
                      <DisclosureButton
                        class="w-full flex items-center justify-between gap-3 px-3 py-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40 rounded-lg group/list"
                        :aria-label="`Toggle list ${l.title}`"
                      >
                        <div class="flex flex-wrap items-center gap-2">
                          <i class="fa-solid fa-list-ul text-slate-200"></i>
                          <span
                            class="text-[10px] uppercase tracking-wide rounded px-1.5 py-0.5 bg-white/20 text-slate-100"
                            >List</span
                          >
                          <span class="text-slate-100 font-medium">{{ l.title }}</span>
                          <span class="ml-2 text-xs text-slate-300"
                            >{{ l.taskIds.length }} tasks</span
                          >
                        </div>
                        <!-- Hover icons (only on hovered list row) -->
                        <div
                          class="flex items-center gap-1 opacity-0 group-hover/list:opacity-100 transition-opacity"
                        >
                          <button
                            class="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded"
                            @click.stop.prevent="openEdit('list', l.id)"
                            aria-label="Edit list"
                          >
                            <i class="fa-solid fa-pencil text-xs"></i>
                          </button>
                          <button
                            class="p-1 text-slate-300 hover:text-red-400 hover:bg-white/10 rounded"
                            @click.stop.prevent="openDelete('list', l.id)"
                            aria-label="Delete list"
                          >
                            <i class="fa-solid fa-xmark text-xs"></i>
                          </button>
                        </div>
                      </DisclosureButton>

                      <DisclosurePanel class="px-2 pb-2">
                        <ul class="space-y-1">
                          <!-- Named group for Task row -->
                          <li
                            v-for="t in tasksInList(l.id)"
                            :key="t.id"
                            class="flex items-center justify-between gap-2 px-2 py-1 rounded hover:bg-white/5 group/task"
                          >
                            <div class="flex items-center gap-2">
                              <input
                                class="mt-1"
                                type="checkbox"
                                :checked="t.done"
                                @change="store.toggleTask(t.id)"
                              />
                              <span
                                class="text-[10px] uppercase tracking-wide rounded px-1.5 py-0.5 bg-white/20 text-slate-100"
                                >Task</span
                              >
                              <p
                                class="text-slate-100 text-sm"
                                :class="t.done ? 'line-through text-slate-400' : ''"
                              >
                                {{ t.title }}
                              </p>
                            </div>
                            <!-- Hover icons (only on hovered task row) -->
                            <div
                              class="flex items-center gap-1 opacity-0 group-hover/task:opacity-100 transition-opacity"
                            >
                              <button
                                class="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded"
                                @click.stop.prevent="openEdit('task', t.id)"
                                aria-label="Edit task"
                              >
                                <i class="fa-solid fa-pencil text-xs"></i>
                              </button>
                              <button
                                class="p-1 text-slate-300 hover:text-red-400 hover:bg-white/10 rounded"
                                @click.stop.prevent="openDelete('task', t.id)"
                                aria-label="Delete task"
                              >
                                <i class="fa-solid fa-xmark text-xs"></i>
                              </button>
                            </div>
                          </li>
                          <li
                            v-if="!tasksInList(l.id).length"
                            class="px-2 py-1 text-xs text-slate-400"
                          >
                            No tasks yet.
                          </li>
                        </ul>
                      </DisclosurePanel>
                    </Disclosure>
                  </li>
                </ul>
              </DisclosurePanel>
            </Disclosure>
          </li>
        </ul>
      </section>

      <!-- Ungrouped Lists -->
      <section v-if="ungroupedLists.length">
        <h3 class="text-slate-200 font-semibold text-sm mb-2">Lists</h3>
        <ul class="space-y-2">
          <li
            v-for="l in ungroupedLists"
            :key="l.id"
            class="rounded-lg border border-white/10 bg-white/5"
          >
            <Disclosure>
              <!-- Named group for List row -->
              <DisclosureButton
                class="w-full flex items-center justify-between gap-3 px-3 py-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40 rounded-lg group/list"
                :aria-label="`Toggle list ${l.title}`"
              >
                <div class="flex flex-wrap items-center gap-2">
                  <i class="fa-solid fa-list-ul text-slate-200"></i>
                  <span
                    class="text-[10px] uppercase tracking-wide rounded px-1.5 py-0.5 bg-white/20 text-slate-100"
                    >List</span
                  >
                  <span class="text-slate-100 font-medium">{{ l.title }}</span>
                  <span class="ml-2 text-xs text-slate-300">{{ l.taskIds.length }} tasks</span>
                </div>
                <!-- Hover icons (only on hovered list row) -->
                <div
                  class="flex items-center gap-1 opacity-0 group-hover/list:opacity-100 transition-opacity"
                >
                  <button
                    class="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded"
                    @click.stop.prevent="openEdit('list', l.id)"
                    aria-label="Edit list"
                  >
                    <i class="fa-solid fa-pencil text-xs"></i>
                  </button>
                  <button
                    class="p-1 text-slate-300 hover:text-red-400 hover:bg-white/10 rounded"
                    @click.stop.prevent="openDelete('list', l.id)"
                    aria-label="Delete list"
                  >
                    <i class="fa-solid fa-xmark text-xs"></i>
                  </button>
                </div>
              </DisclosureButton>

              <DisclosurePanel class="px-2 pb-2">
                <ul class="space-y-1">
                  <!-- Named group for Task row -->
                  <li
                    v-for="t in tasksInList(l.id)"
                    :key="t.id"
                    class="flex items-center justify-between gap-2 px-2 py-1 rounded hover:bg-white/5 group/task"
                  >
                    <div class="flex items-center gap-2">
                      <input
                        class="mt-1"
                        type="checkbox"
                        :checked="t.done"
                        @change="store.toggleTask(t.id)"
                      />
                      <span
                        class="text-[10px] uppercase tracking-wide rounded px-1.5 py-0.5 bg-white/20 text-slate-100"
                        >Task</span
                      >
                      <p
                        class="text-slate-100 text-sm"
                        :class="t.done ? 'line-through text-slate-400' : ''"
                      >
                        {{ t.title }}
                      </p>
                    </div>
                    <!-- Hover icons (only on hovered task row) -->
                    <div
                      class="flex items-center gap-1 opacity-0 group-hover/task:opacity-100 transition-opacity"
                    >
                      <button
                        class="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded"
                        @click.stop.prevent="openEdit('task', t.id)"
                        aria-label="Edit task"
                      >
                        <i class="fa-solid fa-pencil text-xs"></i>
                      </button>
                      <button
                        class="p-1 text-slate-300 hover:text-red-400 hover:bg-white/10 rounded"
                        @click.stop.prevent="openDelete('task', t.id)"
                        aria-label="Delete task"
                      >
                        <i class="fa-solid fa-xmark text-xs"></i>
                      </button>
                    </div>
                  </li>
                  <li v-if="!tasksInList(l.id).length" class="px-2 py-1 text-xs text-slate-400">
                    No tasks yet.
                  </li>
                </ul>
              </DisclosurePanel>
            </Disclosure>
          </li>
        </ul>
      </section>

      <!-- Ungrouped Tasks -->
      <section v-if="ungroupedTasks.length">
        <h3 class="text-slate-200 font-semibold text-sm mb-2">Tasks</h3>
        <ul class="space-y-2">
          <!-- Named group for Task row -->
          <li
            v-for="t in ungroupedTasks"
            :key="t.id"
            class="flex items-center justify-between gap-2 px-2 py-1 rounded border border-white/10 bg-white/5 hover:bg-white/5 group/task"
          >
            <div class="flex items-center gap-2">
              <input
                class="mt-1"
                type="checkbox"
                :checked="t.done"
                @change="store.toggleTask(t.id)"
              />
              <span
                class="text-[10px] uppercase tracking-wide rounded px-1.5 py-0.5 bg-white/20 text-slate-100"
                >Task</span
              >
              <p
                class="text-slate-100 text-sm"
                :class="t.done ? 'line-through text-slate-400' : ''"
              >
                {{ t.title }}
              </p>
            </div>
            <!-- Hover icons (only on hovered task row) -->
            <div
              class="flex items-center gap-1 opacity-0 group-hover/task:opacity-100 transition-opacity"
            >
              <button
                class="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded"
                @click.stop.prevent="openEdit('task', t.id)"
                aria-label="Edit task"
              >
                <i class="fa-solid fa-pencil text-xs"></i>
              </button>
              <button
                class="p-1 text-slate-300 hover:text-red-400 hover:bg-white/10 rounded"
                @click.stop.prevent="openDelete('task', t.id)"
                aria-label="Delete task"
              >
                <i class="fa-solid fa-xmark text-xs"></i>
              </button>
            </div>
          </li>
        </ul>
      </section>
    </div>

    <!-- Add Entity Modal -->
    <TransitionRoot as="template" :show="addOpen">
      <Dialog as="div" class="relative z-50" :initial-focus="initialFocusRef" @close="closeAdd">
        <div class="fixed inset-0 bg-slate-900/80" aria-hidden="true"></div>
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="transition ease-out duration-150"
              enter-from="opacity-0 translate-y-2 scale-95"
              enter-to="opacity-100 translate-y-0 scale-100"
              leave="transition ease-in duration-100"
              leave-from="opacity-100 translate-y-0 scale-100"
              leave-to="opacity-0 translate-y-2 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md rounded-xl border border-white/10 bg-[rgba(30,41,59,0.9)] backdrop-blur-md shadow-xl"
              >
                <div class="border-b border-white/10 px-5 pt-[1px] pb-2 -mx-5">
                  <!-- Added pt-2 to header row -->
                  <div class="flex items-center px-4 pt-2">
                    <DialogTitle class="card-title text-slate-100 font-semibold leading-tight">
                      Add
                      {{
                        addType === 'project'
                          ? 'Project'
                          : addType === 'list'
                            ? 'Task List'
                            : 'Task'
                      }}
                    </DialogTitle>
                  </div>
                </div>

                <form class="px-6 py-5 space-y-4" @submit.prevent="submitAdd">
                  <!-- Type buttons -->
                  <div class="flex gap-2" role="radiogroup" aria-label="Type">
                    <button
                      type="button"
                      :aria-pressed="addType === 'task'"
                      class="px-3 py-1.5 rounded-lg text-sm"
                      :class="
                        addType === 'task'
                          ? 'bg-white/15 text-white'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      "
                      @click="addType = 'task'"
                    >
                      Task
                    </button>
                    <button
                      type="button"
                      :aria-pressed="addType === 'list'"
                      class="px-3 py-1.5 rounded-lg text-sm"
                      :class="
                        addType === 'list'
                          ? 'bg-white/15 text-white'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      "
                      @click="addType = 'list'"
                    >
                      Task List
                    </button>
                    <button
                      type="button"
                      :aria-pressed="addType === 'project'"
                      class="px-3 py-1.5 rounded-lg text-sm"
                      :class="
                        addType === 'project'
                          ? 'bg-white/15 text-white'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      "
                      @click="addType = 'project'"
                    >
                      Project
                    </button>
                  </div>

                  <!-- Title -->
                  <div>
                    <label for="entity-title" class="block text-sm text-slate-300 mb-1"
                      >Title</label
                    >
                    <input
                      id="entity-title"
                      class="vd-input w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40 caret-white"
                      type="text"
                      autocomplete="off"
                      v-model="title"
                      :placeholder="
                        addType === 'task'
                          ? 'e.g., Call mover for quote'
                          : addType === 'list'
                            ? 'e.g., Prep for Showings'
                            : 'e.g., Sell House'
                      "
                    />
                  </div>

                  <!-- Parent selectors -->
                  <div v-if="addType === 'task'">
                    <label class="block text-sm text-slate-300 mb-1">Add to List (optional)</label>
                    <select
                      class="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-accent/40"
                      v-model="parentListId"
                    >
                      <option :value="null">— None —</option>
                      <optgroup
                        v-for="p in projects"
                        :key="'pg-' + p.id"
                        :label="'Project: ' + p.title"
                      >
                        <option v-for="lid in p.listIds" :key="lid" :value="lid">
                          {{ store.lists[lid]?.title || 'Untitled List' }}
                        </option>
                      </optgroup>
                      <optgroup label="Lists">
                        <option v-for="l in ungroupedLists" :key="l.id" :value="l.id">
                          {{ l.title }}
                        </option>
                      </optgroup>
                    </select>
                  </div>

                  <div v-if="addType === 'list'">
                    <label class="block text-sm text-slate-300 mb-1"
                      >Add to Project (optional)</label
                    >
                    <select
                      class="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-accent/40"
                      v-model="parentProjectId"
                    >
                      <option :value="null">— None —</option>
                      <option v-for="p in projects" :key="p.id" :value="p.id">{{ p.title }}</option>
                    </select>
                  </div>

                  <!-- Actions -->
                  <div class="flex items-center gap-2 pt-1">
                    <button
                      type="submit"
                      class="px-3 py-2 rounded-lg bg-white/10 text-slate-100 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-50"
                      :disabled="!canSubmit"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      class="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40"
                      @click="closeAdd"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Edit Entity Modal -->
    <TransitionRoot as="template" :show="editOpen">
      <Dialog
        as="div"
        class="relative z-50"
        :initial-focus="initialEditFocusRef"
        @close="closeEdit"
      >
        <div class="fixed inset-0 bg-slate-900/80" aria-hidden="true"></div>
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="transition ease-out duration-150"
              enter-from="opacity-0 translate-y-2 scale-95"
              enter-to="opacity-100 translate-y-0 scale-100"
              leave="transition ease-in duration-100"
              leave-from="opacity-100 translate-y-0 scale-100"
              leave-to="opacity-0 translate-y-2 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md rounded-xl border border-white/10 bg-[rgba(30,41,59,0.9)] backdrop-blur-md shadow-xl"
              >
                <div class="border-b border-white/10 px-5 pt-[1px] pb-2 -mx-5">
                  <!-- Added pt-2 to header row -->
                  <div class="flex items-center px-4 pt-2">
                    <DialogTitle class="card-title text-slate-100 font-semibold leading-tight">
                      Edit
                      {{
                        editType === 'project' ? 'Project' : editType === 'list' ? 'List' : 'Task'
                      }}
                    </DialogTitle>
                  </div>
                </div>

                <form class="px-6 py-5 space-y-4" @submit.prevent="saveEdit">
                  <div>
                    <label for="edit-title" class="block text-sm text-slate-300 mb-1">Title</label>
                    <input
                      id="edit-title"
                      class="vd-input w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40 caret-white"
                      type="text"
                      autocomplete="off"
                      v-model="editTitle"
                    />
                  </div>

                  <div class="flex items-center gap-2 pt-1">
                    <button
                      type="submit"
                      class="px-3 py-2 rounded-lg bg-white/10 text-slate-100 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-50"
                      :disabled="!canSaveEdit"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      class="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40"
                      @click="closeEdit"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Delete Confirm Modal -->
    <TransitionRoot as="template" :show="deleteOpen">
      <Dialog
        as="div"
        class="relative z-50"
        :initial-focus="initialDeleteFocusRef"
        @close="closeDelete"
      >
        <div class="fixed inset-0 bg-slate-900/80" aria-hidden="true"></div>
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="transition ease-out duration-150"
              enter-from="opacity-0 translate-y-2 scale-95"
              enter-to="opacity-100 translate-y-0 scale-100"
              leave="transition ease-in duration-100"
              leave-from="opacity-100 translate-y-0 scale-100"
              leave-to="opacity-0 translate-y-2 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md rounded-xl border border-white/10 bg-[rgba(15,23,42,0.95)] backdrop-blur-md shadow-xl"
              >
                <div class="border-b border-white/10 px-5 pt-[1px] pb-2 -mx-5">
                  <!-- Added pt-2 to header row -->
                  <div class="flex items-center px-4 pt-2">
                    <DialogTitle class="card-title text-slate-100 font-semibold leading-tight">
                      Delete
                      {{
                        deleteType === 'project'
                          ? 'Project'
                          : deleteType === 'list'
                            ? 'List'
                            : 'Task'
                      }}
                    </DialogTitle>
                  </div>
                </div>

                <form class="px-6 py-5 space-y-5" @submit.prevent="confirmDelete">
                  <div class="text-sm text-slate-200">
                    <p class="mb-2">
                      Are you sure you want to delete
                      <span class="font-semibold">“{{ deleteTitle }}”</span>?
                    </p>
                    <p v-if="deleteType === 'project'" class="text-slate-300">
                      This will also remove
                      <span class="font-semibold">{{ cascadeCounts.lists }}</span> list<span
                        v-if="cascadeCounts.lists !== 1"
                        >s</span
                      >
                      and <span class="font-semibold">{{ cascadeCounts.tasks }}</span> task<span
                        v-if="cascadeCounts.tasks !== 1"
                        >s</span
                      >.
                    </p>
                    <p v-else-if="deleteType === 'list'" class="text-slate-300">
                      This will also remove
                      <span class="font-semibold">{{ cascadeCounts.tasks }}</span> task<span
                        v-if="cascadeCounts.tasks !== 1"
                        >s</span
                      >
                      in this list.
                    </p>
                    <p v-else class="text-slate-300">This will remove this task.</p>
                    <p class="mt-3 text-slate-400 text-xs">This action cannot be undone.</p>
                  </div>

                  <div class="flex items-center gap-2">
                    <button
                      type="submit"
                      class="px-3 py-2 rounded-lg bg-red-500/20 text-red-200 hover:bg-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      class="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40"
                      @click="closeDelete"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </section>
</template>

<style scoped>
/* Selected text visibility inside inputs (works across browsers) */
.vd-input::selection {
  background: rgba(255, 255, 255, 0.96);
  color: #0f172a;
}
.vd-input::-moz-selection {
  background: rgba(255, 255, 255, 0.96);
  color: #0f172a;
}
</style>

<!-- Global (non-scoped) fallback in case some browsers ignore scoped ::selection on inputs -->
<style>
.vd-input::selection {
  background: rgba(255, 255, 255, 0.96);
  color: #0f172a;
}
.vd-input::-moz-selection {
  background: rgba(255, 255, 255, 0.96);
  color: #0f172a;
}
</style>
