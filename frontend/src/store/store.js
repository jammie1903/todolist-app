import { createStore } from 'redux'
import { INIT, ITEM_DELETED, ITEM_UPDATED, NEW_ITEM} from './actionTypes'

function deleteById(items, id) {
  return items.filter(i => i.id !== id)
}

function replaceById(items, updatedItem) {
  return items.map(i => i.id === updatedItem.id ? updatedItem : i)
}

function reducer(state = {}, action) {
  switch (action.type) {
    case INIT:
      return {...state, items: action.value}
    case ITEM_DELETED:
      return {...state, items: deleteById(state.items, action.id)}
    case ITEM_UPDATED:
      return {...state, items: replaceById(state.items, action.value)}
    case NEW_ITEM:
      return {...state, items: [...state.items, action.value]}
    default:
      return state
  }
}

const store = createStore(reducer)

export default store
