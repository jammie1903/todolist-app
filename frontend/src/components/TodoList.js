import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import styled from 'styled-components'
import CreateItemForm from './CreateItemForm'

const Container = styled.div`
  margin: 16px;
  padding: 16px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  background: ${props => props.theme.colors.background};
`

const List = styled.ul`
  padding: 0;
  margin: 0;
`

const TodoList = ({ items, onToggleItem }) => (
  <Container>
    <CreateItemForm />
    <List>
      {items && items.map(todo => (
        <TodoItem key={todo.id} {...todo} onChange={() => onToggleItem(todo.id, !todo.state)} />
      ))}
    </List>
  </Container>
)

TodoList.propTypes = {
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
