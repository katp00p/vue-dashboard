import { defineStore } from 'pinia'

const uid = () =>
  crypto && crypto.randomUUID ? crypto.randomUUID() : 'id_' + Math.random().toString(36).slice(2)

const STORAGE_KEY = 'vd_tasks_v1'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: {}, // id -> { id, title, done, listId|null, createdAt, updatedAt }
    lists: {}, // id -> { id, title, projectId|null, taskIds:[], createdAt, updatedAt }
    projects: {}, // id -> { id, title, listIds:[], createdAt, updatedAt }
    order: {
      // UI order (drag/drop-ready)
      tasks: [], // task ids (ungrouped or top-level ordering aid)
      lists: [], // list ids (top-level or within project—kept simple for now)
      projects: [], // project ids
    },
    lastLoadedAt: null,
    lastSavedAt: null,
  }),
  getters: {
    tasksByList: (s) => (listId) =>
      listId
        ? (s.lists[listId]?.taskIds || []).map((id) => s.tasks[id]).filter(Boolean)
        : Object.values(s.tasks).filter((t) => !t.listId),
    listsByProject: (s) => (projectId) =>
      projectId
        ? (s.projects[projectId]?.listIds || []).map((id) => s.lists[id]).filter(Boolean)
        : Object.values(s.lists).filter((l) => !l.projectId),
    ungroupedTasks: (s) => Object.values(s.tasks).filter((t) => !t.listId),
    ungroupedLists: (s) => Object.values(s.lists).filter((l) => !l.projectId),
  },
  actions: {
    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return
        const data = JSON.parse(raw)
        Object.assign(this, data)
        this.lastLoadedAt = Date.now()
      } catch (e) {
        console.warn('Tasks load failed', e)
      }
    },
    save() {
      try {
        const snap = {
          tasks: this.tasks,
          lists: this.lists,
          projects: this.projects,
          order: this.order,
          lastLoadedAt: this.lastLoadedAt,
          lastSavedAt: Date.now(),
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(snap))
        this.lastSavedAt = snap.lastSavedAt
      } catch (e) {
        console.warn('Tasks save failed', e)
      }
    },

    // ----- Create -----
    addProject(title) {
      const id = uid()
      this.projects[id] = {
        id,
        title: title.trim(),
        listIds: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      this.order.projects.push(id)
      this.save()
      return id
    },
    addList(title, projectId = null) {
      const id = uid()
      this.lists[id] = {
        id,
        title: title.trim(),
        projectId,
        taskIds: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      if (projectId && this.projects[projectId]) {
        this.projects[projectId].listIds.push(id)
        this.projects[projectId].updatedAt = Date.now()
      } else {
        this.order.lists.push(id)
      }
      this.save()
      return id
    },
    addTask(title, listId = null) {
      const id = uid()
      this.tasks[id] = {
        id,
        title: title.trim(),
        done: false,
        listId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      if (listId && this.lists[listId]) {
        this.lists[listId].taskIds.push(id)
        this.lists[listId].updatedAt = Date.now()
      } else {
        this.order.tasks.push(id)
      }
      this.save()
      return id
    },

    // ----- Update -----
    toggleTask(id) {
      const t = this.tasks[id]
      if (!t) return
      t.done = !t.done
      t.updatedAt = Date.now()
      this.save()
    },

    renameProject(id, title) {
      const p = this.projects[id]
      if (!p) return
      p.title = title.trim()
      p.updatedAt = Date.now()
      this.save()
    },
    renameList(id, title) {
      const l = this.lists[id]
      if (!l) return
      l.title = title.trim()
      l.updatedAt = Date.now()
      this.save()
    },
    renameTask(id, title) {
      const t = this.tasks[id]
      if (!t) return
      t.title = title.trim()
      t.updatedAt = Date.now()
      this.save()
    },

    // ----- Delete (simple; cascades downward) -----
    deleteTask(id) {
      const t = this.tasks[id]
      if (!t) return
      if (t.listId && this.lists[t.listId]) {
        this.lists[t.listId].taskIds = this.lists[t.listId].taskIds.filter((x) => x !== id)
      } else {
        this.order.tasks = this.order.tasks.filter((x) => x !== id)
      }
      delete this.tasks[id]
      this.save()
    },
    deleteList(id) {
      const l = this.lists[id]
      if (!l) return // delete child tasks
      ;(l.taskIds || []).forEach((tid) => this.deleteTask(tid))
      if (l.projectId && this.projects[l.projectId]) {
        this.projects[l.projectId].listIds = this.projects[l.projectId].listIds.filter(
          (x) => x !== id,
        )
      } else {
        this.order.lists = this.order.lists.filter((x) => x !== id)
      }
      delete this.lists[id]
      this.save()
    },
    deleteProject(id) {
      const p = this.projects[id]
      if (!p) return
      ;(p.listIds || []).forEach((lid) => this.deleteList(lid))
      this.order.projects = this.order.projects.filter((x) => x !== id)
      delete this.projects[id]
      this.save()
    },

    // ----- Seed (only if empty) -----
    seedIfEmpty() {
      if (
        Object.keys(this.projects).length ||
        Object.keys(this.lists).length ||
        Object.keys(this.tasks).length
      )
        return
      const proj = this.addProject('Sell House')
      const prep = this.addList('Prep', proj)
      this.addTask('Declutter living room & toy rotation', prep)
      this.addTask('Patch/paint scuffs in hallway', prep)
      this.addTask('Deep clean kitchen & appliances', prep)

      const show = this.addList('Showings', proj)
      this.addTask('Hide countertop items; wipe surfaces', show)
      this.addTask('Tidy Sofia’s play area; stash bin in closet', show)
      this.addTask('Quick vacuum high-traffic paths', show)

      this.addList('Dashboard App — MVP', null)
      this.addTask('Wire To-Do storage shape', null)
      this.addTask('LocalStorage save/restore', null)
      this.addTask('Add collapse/expand for groups', null)
    },
  },
})
