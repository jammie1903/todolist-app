import { connect } from 'react-redux'
import TodoLists from './TodoLists'

const mapStateToProps = state => ({ 
  lists: state.lists
})

const TodoListsContainer = connect(mapStateToProps)(TodoLists)

export default TodoListsContainer
