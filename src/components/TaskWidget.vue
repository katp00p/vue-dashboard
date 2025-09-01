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
            class="rounded-lg border border-accent/40 bg-accent/10 group"
          >
            <Disclosure>
              <DisclosureButton
                class="w-full flex items-center justify-between gap-3 px-3 py-2 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-accent/40 rounded-lg"
                :aria-label="`Toggle project ${p.title}`"
              >
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-folder text-slate-200"></i>
                  <span
                    class="text-[10px] uppercase tracking-wide rounded px-1.5 py-0.5 bg-white/20 text-slate-100"
                    >Project</span
                  >
                  <span class="text-slate-100 font-medium">{{ p.title }}</span>
                </div>
                <div class="flex items-center gap-3">
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
                  <!-- Hover icons -->
                  <div
                    class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <button class="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded">
                      <i class="fa-solid fa-pencil text-xs"></i>
                    </button>
                    <button class="p-1 text-slate-300 hover:text-red-400 hover:bg-white/10 rounded">
                      <i class="fa-solid fa-xmark text-xs"></i>
                    </button>
                  </div>
                </div>
              </DisclosureButton>
              <DisclosurePanel class="px-3 pb-3">
                <ul class="space-y-2">
                  <li
                    v-for="l in listsInProject(p.id)"
                    :key="l.id"
                    class="rounded-lg border border-white/10 bg-white/5 group"
                  >
                    <Disclosure>
                      <DisclosureButton
                        class="w-full flex items-center justify-between gap-3 px-3 py-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40 rounded-lg"
                        :aria-label="`Toggle list ${l.title}`"
                      >
                        <div class="flex items-center gap-2">
                          <i class="fa-solid fa-list-ul text-slate-200"></i>
                          <span
                            class="text-[10px] uppercase tracking-wide rounded px-1.5 py-0.5 bg-white/20 text-slate-100"
                            >List</span
                          >
                          <span class="text-slate-100 font-medium">{{ l.title }}</span>
                        </div>
                        <div class="flex items-center gap-3">
                          <div class="text-xs text-slate-300">
                            {{ l.taskIds.length }} tasks
                            <i class="fa-solid fa-chevron-down ml-2"></i>
                          </div>
                          <!-- Hover icons -->
                          <div
                            class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <button
                              class="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded"
                            >
                              <i class="fa-solid fa-pencil text-xs"></i>
                            </button>
                            <button
                              class="p-1 text-slate-300 hover:text-red-400 hover:bg-white/10 rounded"
                            >
                              <i class="fa-solid fa-xmark text-xs"></i>
                            </button>
                          </div>
                        </div>
                      </DisclosureButton>
                      <DisclosurePanel class="px-2 pb-2">
                        <ul class="space-y-1">
                          <li
                            v-for="t in tasksInList(l.id)"
                            :key="t.id"
                            class="flex items-center justify-between gap-2 px-2 py-1 rounded hover:bg-white/5 group"
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
                            <!-- Hover icons -->
                            <div
                              class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <button
                                class="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded"
                              >
                                <i class="fa-solid fa-pencil text-xs"></i>
                              </button>
                              <button
                                class="p-1 text-slate-300 hover:text-red-400 hover:bg-white/10 rounded"
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
            class="rounded-lg border border-white/10 bg-white/5 group"
          >
            <Disclosure>
              <DisclosureButton
                class="w-full flex items-center justify-between gap-3 px-3 py-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40 rounded-lg"
                :aria-label="`Toggle list ${l.title}`"
              >
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-list-ul text-slate-200"></i>
                  <span
                    class="text-[10px] uppercase tracking-wide rounded px-1.5 py-0.5 bg-white/20 text-slate-100"
                    >List</span
                  >
                  <span class="text-slate-100 font-medium">{{ l.title }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="text-xs text-slate-300">
                    {{ l.taskIds.length }} tasks
                    <i class="fa-solid fa-chevron-down ml-2"></i>
                  </div>
                  <!-- Hover icons -->
                  <div
                    class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <button class="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded">
                      <i class="fa-solid fa-pencil text-xs"></i>
                    </button>
                    <button class="p-1 text-slate-300 hover:text-red-400 hover:bg-white/10 rounded">
                      <i class="fa-solid fa-xmark text-xs"></i>
                    </button>
                  </div>
                </div>
              </DisclosureButton>

              <DisclosurePanel class="px-2 pb-2">
                <ul class="space-y-1">
                  <li
                    v-for="t in tasksInList(l.id)"
                    :key="t.id"
                    class="flex items-center justify-between gap-2 px-2 py-1 rounded hover:bg-white/5 group"
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
                    <!-- Hover icons -->
                    <div
                      class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <button class="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded">
                        <i class="fa-solid fa-pencil text-xs"></i>
                      </button>
                      <button
                        class="p-1 text-slate-300 hover:text-red-400 hover:bg-white/10 rounded"
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
          <li
            v-for="t in ungroupedTasks"
            :key="t.id"
            class="flex items-center justify-between gap-2 px-2 py-1 rounded border border-white/10 bg-white/5 hover:bg-white/5 group"
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
            <!-- Hover icons -->
            <div
              class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <button class="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded">
                <i class="fa-solid fa-pencil text-xs"></i>
              </button>
              <button class="p-1 text-slate-300 hover:text-red-400 hover:bg-white/10 rounded">
                <i class="fa-solid fa-xmark text-xs"></i>
              </button>
            </div>
          </li>
        </ul>
      </section>
    </div>

    <!-- Modal unchanged -->
    <!-- ... keep your modal code here ... -->
  </section>
</template>
