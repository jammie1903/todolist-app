import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import styled from 'styled-components'
import CreateItemForm from './CreateItemForm'
import Panel from './Panel'

const List = styled.ul`
  padding: 0;
  margin: 0;
`

const TodoList = ({ id, title, items, onToggleItem }) => (
  <Panel title={title}>
    <CreateItemForm listId={id} />
    <List>
      {items && items.map(todo => (
        <TodoItem key={todo.id} {...todo} onChange={() => onToggleItem(todo.id, !todo.state)} />
      ))}
    </List>
  </Panel>
)

TodoList.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: TodoItem.propTypes.text,
      state: TodoItem.propTypes.state,
    }).isRequired
  ),
  onToggleItem: PropTypes.func.isRequired
}

export default TodoList
