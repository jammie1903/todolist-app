import { IDataStore } from './IDataStore'
import LocalDataStore from './LocalDataStore'
import MongoDataStore from './MongoDataStore'

const MONGO_URL = process.env.MONGO_URL

let instance: IDataStore

export default function getDataStore() {
  if(!instance) {
    if(MONGO_URL) {
      instance = new MongoDataStore(MONGO_URL)
    } else {
      instance = new LocalDataStore()
    }
  }
  return instance
}
