import * as WebSocket from 'ws'
import { Server } from 'http'

interface TrackedSocket extends WebSocket { 
  isAlive: boolean 
}

export abstract class WebSocketHandler {
  private wss: WebSocket.Server

  constructor(server: Server) {
    this.wss = new WebSocket.Server({ server })

    this.wss.on('connection', (ws: WebSocket) => {
      ws.on('message', (message: string) => {
        (ws as TrackedSocket).isAlive = true
        let data: any
        try {
          data = JSON.parse(message)
        }
        catch (e) {
          this.send(ws, { type: 'ERROR', message: 'Invalid JSON was received' })
        }

        if(data) this.onMessage(ws, data)
      })

      ws.on('pong', () => {
        (ws as TrackedSocket).isAlive = true
      })

      this.send(ws, { type: 'CONNECTION_SUCCESSFUL' })
      this.onConnection(ws)
    })

    setInterval(() => {
      this.wss.clients.forEach((ws: WebSocket) => {
        if (!(ws as TrackedSocket).isAlive) {
          return ws.terminate()
        }
        
        (ws as TrackedSocket).isAlive = false
        ws.ping()
      })
    }, 120000)
  }

  send(ws: WebSocket, message: any) {
    ws.send(JSON.stringify(message))
  }

  broadcast(message: any) {
    this.wss.clients.forEach(client => this.send(client, message))
  }


  abstract onMessage(ws: WebSocket, message: any): void
  abstract onConnection(ws: WebSocket): void
}
