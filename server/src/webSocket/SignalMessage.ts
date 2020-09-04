interface AddMessage {
  type: 'ADD'
  text: string
}

interface DeleteMessage {
  type: 'DELETE'
  id: string
}

interface SetStateMessage {
  type: 'SET_STATE'
  id: string
  value: boolean
}

export type SignalMessage = AddMessage | DeleteMessage | SetStateMessage
