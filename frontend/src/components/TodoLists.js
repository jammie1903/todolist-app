import React from 'react'
import PropTypes from 'prop-types'
import { send } from '../utilities/webSocket'
import { SET_STATE } from '../utilities/requestTypes'
import TodoList from './TodoList'

const TodoLists = ({ lists }) => {
  const onToggleItem = (id, newValue) => send(SET_STATE, {id, value: newValue})
  return <>
    {lists.map(list => <TodoList key={list.id} id={list.id} title={list.text} items={list.items} onToggleItem={onToggleItem} />)}
  </>
}

TodoLists.propTypes = {
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      items: PropTypes.array.isRequired
    }).isRequired
  )
}

export default TodoLists
