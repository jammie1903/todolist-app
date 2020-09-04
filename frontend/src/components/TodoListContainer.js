import { connect } from 'react-redux'
import { send } from '../utilities/webSocket'
import { SET_STATE } from '../utilities/requestTypes'
import TodoList from './TodoList'

const mapStateToProps = state => ({ 
  items: state.items,
  onToggleItem: (id, newValue) => send(SET_STATE, {id, value: newValue})
})

const TodoListContainer = connect(mapStateToProps)(TodoList)

export default TodoListContainer
