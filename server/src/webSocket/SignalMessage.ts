interface AddMessage {
  type: 'ADD_ITEM'
  text: string,
  listId: string
}

interface AddListMessage {
  type: 'ADD_LIST'
  text: string,
}

interface DeleteMessage {
  type: 'DELETE_ITEM'
  id: string
}


interface DeleteListMessage {
  type: 'DELETE_LIST'
  id: string
}

interface SetStateMessage {
  type: 'SET_STATE'
  id: string
  value: boolean
}

export type SignalMessage = AddMessage | DeleteMessage | AddListMessage | DeleteListMessage | SetStateMessage
