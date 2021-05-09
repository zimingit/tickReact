const base = 'https://6096d7e6116f3f00174b3a6a.mockapi.io/api/'
const next = (resp) => resp.json()

const mockapi = (url, method = "GET", data = {}) => {
  let config = {
    method,
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
     }
  }
  if (['PUT', 'POST'].includes(method)) {
    config.body = JSON.stringify(data)
  }
  return fetch(base + url, config).then(next)
}
const get = (url) => mockapi(url, 'GET')
const put = (url, data) => mockapi(url, 'PUT', data)
const del = (url, data) => mockapi(url, 'DELETE', data)
const post = (url, data) => mockapi(url, 'POST', data)

const ds = {
  // Folders
  getFolders: async () => {
    return await get('folders')
  },
  getFolder: async (id) => {
    return await get(`folders/${id}`)
  },
  updFolder: async (folder) => {
    return await put(`folders/${folder.id}`, folder)
  },
  addFolder: async (folder) => {
    return await post(`folders`, folder)
  },
  delFolder: async ({id = '-1'}) => {
    return await del(`folders/${id}`)
  },

  // Tasks
  getTasks: async (folder) => {
    return [{...folder, tasks: await get(`folders/${folder.id}/tasks`)}]
  },
  getAllTasks: async () => {
    return await Promise.all((await ds.getFolders()).map(async folder => ((await ds.getTasks(folder))[0])))
  },
  getTask: async (folder, taskID) => {
    return await get(`folders/${folder.id}/tasks/${taskID}`)
  },
  updTask: async (folder, task) => {
    return await put(`folders/${folder.id}/tasks/${task.id}`, task)
  },
  addTask: async (folder, task) => {
    return await post(`folders/${folder.id}/tasks`, task)
  },
  delTask: async (folder, task) => {
    return await del(`folders/${folder.id}/tasks/${task.id}`)
  }
}

export default ds;