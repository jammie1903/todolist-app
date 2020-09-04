import { Server } from 'http'
import { SignalMessage } from './SignalMessage'
import { TodoListSocket } from './TodoListSocket'

export default (server: Server) => {
  return new TodoListSocket(server)
}

export function isSignalMessage(arg: any): arg is SignalMessage {
  return !!arg.type
}
