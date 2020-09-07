import { ITodoDataStore } from './TodoItem/ITodoDataStore'
import LocalTodoDataStore from './TodoItem/LocalTodoDataStore'
import MongoTodoDataStore from './TodoItem/MongoTodoDataStore'
import LocalTodoListDataStore from './TodoList/LocalTodoListDataStore'
import MongoTodoListDataStore from './TodoList/MongoTodoListDataStore'
import { ITodoListDataStore } from './TodoList/ITodoListDataStore'

const MONGO_URL = process.env.MONGO_URL

type InstanceTypes = [{new (): any}, {new (url: string): any}]

const instanceTypes: {
  [key: string] : InstanceTypes
} = {
  todoItems: [LocalTodoDataStore, MongoTodoDataStore],
  todoLists: [LocalTodoListDataStore, MongoTodoListDataStore]
}

function getDataStore(type: keyof typeof instanceTypes) {
  if(!instanceTypes[type]) return undefined
  const [LocalStore, MongoStore] = instanceTypes[type]
  if(MONGO_URL) {
    return new MongoStore(MONGO_URL)
  } else {
    return new LocalStore()
  }
}

type DataStores = {
  todoItems: ITodoDataStore,
  todoLists: ITodoListDataStore
} & { [key:string]: any }

const target = {} as DataStores

const handler = {
  get: (target: DataStores, prop: string) => {
    if(!target.hasOwnProperty(prop)) {
      target[prop] = getDataStore(prop)
    }

    return target[prop]
  }
}

export default new Proxy(target, handler)
