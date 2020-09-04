import store from '../store'

const url = process.env.NODE_ENV === 'production' ? 
  `ws://${window.location.host}` : 
  'ws://localhost:3001'

let promise = null

function connect() {
  if(promise) return promise
  let socket = new WebSocket(url)

  promise = new Promise((resolve) => {
  // Listen for messages
    socket.addEventListener('message', function (event) {
      const data = JSON.parse(event.data)

      switch(data.type) {
        case 'ERROR': 
          onErrorMessage(data.message)
          break
        case 'CONNECTION_SUCCESSFUL': 
          console.log('connection to websocket established')
          resolve(socket)
          break
        default:
          store.dispatch(data)
      }
    })

    socket.addEventListener('close', function(e) {
      console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason)
      promise = null
      setTimeout(() => {
        connect()
      }, 1000)
    })
  })

  return promise
}

export async function send(type, content) {
  const socket = await connect()
  socket.send(JSON.stringify({
    type,
    ...content
  }))
}

connect()

function onErrorMessage(message) {
  console.error('The server returned the following error: ', message)
}
