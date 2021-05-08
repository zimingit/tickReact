import { tasks as tasksDefault,
         folders as foldersDefault} from '../dataset/tasks.json'

const ls = {
  get: async (key) => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : data
  },
  set: async (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
  },

  // Folders
  getFolders: async () => {
    const data = await ls.get('folders')
    return data ? data : foldersDefault
  },

  updFolders: async (folders) => {
    const key = 'folders'
    await ls.set(key, folders)
    return await ls.getFolders()
  },

  addFolder: async (folder) => {
    const newFolders = [...await ls.getFolders(), folder]
    return await ls.updFolders(newFolders)
  },

  delFolder: async (folderName) => {
    const newFolders = (await ls.getFolders()).filter(({label}) => label !== folderName)
    return await ls.updFolders(newFolders)
  },

  // Tasks
  getTasks: async (filter = null) => {
    const folders = await ls.getFolders()
    const data = await ls.get('tasks')
    const tasks = data ? data : tasksDefault

    const getColor = (label) => folders.find(f => f.label === label).color
    const folderNames = folders.map(({label}) => label)

    const tasksFiltered = tasks
      .filter(({label}) => ((!filter || label === filter) && folderNames.includes(label)))
      .map(task => ({ ...task, color: getColor(task.label)}))

    return tasksFiltered
  },

  updTasks: async (tasks) => {
    const key = 'tasks'
    await ls.set(key, tasks)
    return await ls.getTasks()
  },

  initTasks: async (label) => {
    const init = {
      label,
      filter: null,
      tasks: []
    }
    return await ls.addTasks(init)
  },

  addTasks: async (tasks) => {
    const newTasks = [...(await ls.getTasks()), tasks]
    return await ls.updTasks(newTasks)
  },

  delTasks: async (tasksLabel) => {
    const newTasks = (await ls.getTasks()).filter(data => data.label !== tasksLabel)
    return await ls.updTasks(newTasks)
  },

  // Task
  getTask: async (folder, id) => {
    const task = ((await ls.getTasks()).find(tasks => tasks.label === folder) || { tasks: [] }).tasks[id]
    if (!task) return null

    const color = ((await ls.getFolders()).find(f => f.label === folder) || {}).color || ''
    
    return { ...task, color }
  },

  addTask: async (folder, task) => {
    const newTasks = (await ls.getTasks()).map(data => {
          return data.label !== folder.label
          ? data
          : {...data, tasks: [...data.tasks, task]}
        })
    return await ls.updTasks(newTasks)
  },

  completeTask: async (folder, task) => {
    const newTasks = (await ls.getTasks()).map(data => {
          return data.label !== folder.label
          ? data
          : {...data, tasks: data.tasks.map(t => (t.text === task.text ? task : t)) }
        })
    return await ls.updTasks(newTasks)
  },

  delTask: async (folder, task) => {
    const newTasks = (await ls.getTasks()).map(data => {
          return data.label !== folder.label
          ? data
          : {...data, tasks: data.tasks.filter(t => t.text !== task.text)}
        })
    return await ls.updTasks(newTasks)
  },

  updTask: async (folder, task) => {
    const newTasks = (await ls.getTasks()).map(data => {
          return data.label !== folder
          ? data
          : {...data, tasks: data.tasks.map(t => (t.text === task.text? task : t))}
        })
    return await ls.updTasks(newTasks)
  }
}

export default ls;