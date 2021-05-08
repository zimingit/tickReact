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
    const key = 'folders'
    await ls.set(key, [...await ls.getFolders(), folder])
    return folder
  },

  delFolder: async (folderName) => {
    const key = 'folders'
    const folders = await ls.getFolders()
    const newFolders = folders.filter(({label}) => label !== folderName)
    const deletedFolder = folders.find(({label}) => label === folderName)
    await ls.set(key, newFolders)
    return deletedFolder
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

  addTask: async (folder, task) => {
    const key = 'tasks'
    const newTasks = (await ls.getTasks()).map(data => {
          return data.label !== folder.label
          ? data
          : {...data, tasks: [...data.tasks, task]}
        })
    await ls.set(key, newTasks)
    return task
  },

  completeTask: async (folder, task) => {
    const key = 'tasks'
    const newTasks = (await ls.getTasks()).map(data => {
          return data.label !== folder.label
          ? data
          : {...data, tasks: data.tasks.map(t => (t.text === task.text ? task : t)) }
        })
    await ls.set(key, newTasks)
    return task
  },

  delTask: async (folder, task) => {
    const key = 'tasks'
    const newTasks = (await ls.getTasks()).map(data => {
          return data.label !== folder.label
          ? data
          : {...data, tasks: data.tasks.filter(t => t.text !== task.text)}
        })
    await ls.set(key, newTasks)
    return task
  }
}

export default ls;