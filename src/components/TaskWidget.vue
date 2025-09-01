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

// render helpers
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
      <!-- Projects (accordion) -->
      <section v-if="projects.length">
        <h3 class="text-slate-200 font-semibold text-sm mb-2">Projects</h3>
        <ul class="space-y-2">
          <li
            v-for="p in projects"
            :key="p.id"
            class="rounded-lg border border-accent/40 bg-accent/10"
          >
            <Disclosure>
              <DisclosureButton
                class="w-full flex items-center justify-between gap-3 px-3 py-2 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-accent/40 rounded-lg"
                :aria-label="`Toggle project ${p.title}`"
              >
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-diagram-project text-slate-200"></i>
                  <span class="text-slate-100 font-medium">{{ p.title }}</span>
                  <span
                    class="ml-2 text-[10px] uppercase tracking-wide rounded px-1.5 py-0.5 bg-accent/30 text-slate-100"
                    >Project</span
                  >
                </div>
                <div class="text-xs text-slate-300">
                  {{ (p.listIds || []).length }} lists •
                  {{
                    (p.listIds || []).reduce(
                      (acc, lid) => acc + (store.lists[lid]?.taskIds?.length || 0),
                      0,
                    )
                  }}
                  tasks
                  <i class="fa-solid fa-chevron-down ml-2"></i>
                </div>
              </DisclosureButton>

              <DisclosurePanel class="px-3 pb-3">
                <!-- Lists inside this project -->
                <ul class="space-y-2">
                  <li
                    v-for="l in listsInProject(p.id)"
                    :key="l.id"
                    class="rounded-lg border border-white/10 bg-white/5"
                  >
                    <Disclosure>
                      <DisclosureButton
                        class="w-full flex items-center justify-between gap-3 px-3 py-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40 rounded-lg"
                        :aria-label="`Toggle list ${l.title}`"
                      >
                        <div class="flex items-center gap-2">
                          <i class="fa-solid fa-list-ul text-slate-200"></i>
                          <span class="text-slate-100 font-medium">{{ l.title }}</span>
                          <span
                            class="ml-2 text-[10px] uppercase tracking-wide rounded px-1.5 py-0.5 bg-white/20 text-slate-100"
                            >List</span
                          >
                        </div>
                        <div class="text-xs text-slate-300">
                          {{ l.taskIds.length }} tasks
                          <i class="fa-solid fa-chevron-down ml-2"></i>
                        </div>
                      </DisclosureButton>

                      <DisclosurePanel class="px-2 pb-2">
                        <ul class="space-y-1">
                          <li
                            v-for="t in tasksInList(l.id)"
                            :key="t.id"
                            class="flex items-start gap-2 px-2 py-1 rounded hover:bg-white/5"
                          >
                            <input
                              class="mt-1"
                              type="checkbox"
                              :checked="t.done"
                              @change="store.toggleTask(t.id)"
                            />
                            <p
                              class="text-slate-100 text-sm"
                              :class="t.done ? 'line-through text-slate-400' : ''"
                            >
                              <i class="fa-solid fa-check mr-2 opacity-60"></i>{{ t.title }}
                            </p>
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

      <!-- Ungrouped Lists (accordion) -->
      <section v-if="ungroupedLists.length">
        <h3 class="text-slate-200 font-semibold text-sm mb-2">Lists (not in a Project)</h3>
        <ul class="space-y-2">
          <li
            v-for="l in ungroupedLists"
            :key="l.id"
            class="rounded-lg border border-white/10 bg-white/5"
          >
            <Disclosure>
              <DisclosureButton
                class="w-full flex items-center justify-between gap-3 px-3 py-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40 rounded-lg"
                :aria-label="`Toggle list ${l.title}`"
              >
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-list-ul text-slate-200"></i>
                  <span class="text-slate-100 font-medium">{{ l.title }}</span>
                  <span
                    class="ml-2 text-[10px] uppercase tracking-wide rounded px-1.5 py-0.5 bg-white/20 text-slate-100"
                    >List</span
                  >
                </div>
                <div class="text-xs text-slate-300">
                  {{ l.taskIds.length }} tasks
                  <i class="fa-solid fa-chevron-down ml-2"></i>
                </div>
              </DisclosureButton>

              <DisclosurePanel class="px-2 pb-2">
                <ul class="space-y-1">
                  <li
                    v-for="t in tasksInList(l.id)"
                    :key="t.id"
                    class="flex items-start gap-2 px-2 py-1 rounded hover:bg-white/5"
                  >
                    <input
                      class="mt-1"
                      type="checkbox"
                      :checked="t.done"
                      @change="store.toggleTask(t.id)"
                    />
                    <p
                      class="text-slate-100 text-sm"
                      :class="t.done ? 'line-through text-slate-400' : ''"
                    >
                      <i class="fa-solid fa-check mr-2 opacity-60"></i>{{ t.title }}
                    </p>
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
        <h3 class="text-slate-200 font-semibold text-sm mb-2">Tasks (not in a List)</h3>
        <ul class="space-y-2">
          <li
            v-for="t in ungroupedTasks"
            :key="t.id"
            class="flex items-start gap-2 px-2 py-1 rounded border border-white/10 bg-white/5"
          >
            <input
              class="mt-1"
              type="checkbox"
              :checked="t.done"
              @change="store.toggleTask(t.id)"
            />
            <p class="text-slate-100 text-sm" :class="t.done ? 'line-through text-slate-400' : ''">
              <i class="fa-solid fa-check mr-2 opacity-60"></i>{{ t.title }}
            </p>
            <span
              class="ml-auto text-[10px] uppercase tracking-wide rounded px-1.5 py-0.5 bg-white/10 text-slate-300"
              >Task</span
            >
          </li>
        </ul>
      </section>
    </div>

    <!-- (Modal code you already have, unchanged) -->
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
                  <div class="flex items-center justify-between px-4">
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
                    <button
                      type="button"
                      aria-label="Close"
                      class="p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40"
                      @click="closeAdd"
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>

                <div class="px-6 py-5 space-y-4">
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
                      ref="initialFocusRef"
                      type="text"
                      autocomplete="off"
                      :placeholder="
                        addType === 'task'
                          ? 'e.g., Call mover for quote'
                          : addType === 'list'
                            ? 'e.g., Prep for Showings'
                            : 'e.g., Sell House'
                      "
                      class="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/40"
                      v-model="title"
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
                      <optgroup label="Lists (no Project)">
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
                      type="button"
                      class="px-3 py-2 rounded-lg bg-white/10 text-slate-100 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-50"
                      :disabled="!canSubmit"
                      @click="submitAdd"
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
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </section>
</template>

<style scoped></style>
