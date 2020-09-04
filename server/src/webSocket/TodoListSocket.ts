import * as WebSocket from 'ws'
import { WebSocketHandler } from './WebSocketHandler'
import getDataStore from '../persistance'
import { isSignalMessage } from './webSocket'

export class TodoListSocket extends WebSocketHandler {
  private _dataStore = getDataStore()

  onMessage(ws: WebSocket, message: any): void {
    if (isSignalMessage(message)) {
      switch (message.type) {
        case 'ADD':
          this.handleAdd(message.text)
          break
        case 'DELETE':
          this.handleDelete(message.id)
          break
        case 'SET_STATE':
          this.handleSetState(message.id, message.value)
          break
      }
    }
  }

  async handleAdd(text: string) {
    const result = await this._dataStore.create(text)
    this.broadcast({
      type: 'NEW_ITEM',
      value: result
    })
  }

  async handleDelete(id: string) {
    const result = await this._dataStore.delete(id)
    if (result) {
      this.broadcast({
        type: 'ITEM_DELETED',
        id
      })
    }
  }

  async handleSetState(id: string, value: boolean) {
    const result = await this._dataStore.update(id, { state: value })
    this.broadcast({
      type: 'ITEM_UPDATED',
      value: result
    })
  }

  async onConnection(ws: WebSocket): Promise<void> {
    this.send(ws, {
      type: 'INIT',
      value: await this._dataStore.getAll()
    })
  }
}
