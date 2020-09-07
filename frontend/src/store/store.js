import { createStore } from 'redux'
import { INIT, NEW_LIST, NEW_ITEM, LIST_DELETED, ITEM_DELETED, ITEM_UPDATED} from './actionTypes'

function deleteById(items, id) {
  return items.filter(i => i.id !== id)
}

function replaceById(items, updatedItem) {
  return items.map(i => i.id === updatedItem.id ? updatedItem : i)
}

function handleCreatedItem(list, createdItem) {
  return createdItem.listId === list.id ? { ...list, items: [...list.items, createdItem] } : list
}

function handleDeletedItem(list, deletedId) {
  return { ...list, items: deleteById(list.items, deletedId) }
}

function handleUpdatedItem(list, updateItem) {
  return updateItem.listId === list.id ? { ...list, items: replaceById(list.items, updateItem) } : list
}

function reducer(state = { lists: [] }, action) {
  switch (action.type) {
    case INIT:
      return { ...state, lists: action.value }
    case NEW_LIST:
      return { ...state, lists: [...state.lists, action.value] }
    case NEW_ITEM:
      return { ...state, lists: state.lists.map(l => handleCreatedItem(l, action.value)) }
    case LIST_DELETED:
      return { ...state, lists: deleteById(state.lists, action.id) }
    case ITEM_DELETED:
      return { ...state, lists: state.lists.map(l => handleDeletedItem(l, action.id)) }
    case ITEM_UPDATED:
      return { ...state, lists: state.lists.map(l => handleUpdatedItem(l, action.value)) }
    default:
      return state
  }
}

const store = createStore(reducer)

export default store
