import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { send } from '../utilities/webSocket'
import { ADD } from '../utilities/requestTypes'
import InputWithButton from './InputWithButton'

const CreateItemForm = ({listId}) => {
  const [value, setValue] = useState('')
  const onSubmit = event => {
    event.preventDefault()
    if (!value.trim()) return

    send(ADD, { text: value.trim(), listId })
    setValue('')
  }
  return (
    <form onSubmit={onSubmit}>
      <InputWithButton
        placeholder='Add a new item here...'
        value={value}
        onChange={e => setValue(e.target.value)}
        buttonText='Add Item' />
    </form>
  )
}

CreateItemForm.propTypes = {
  listId: PropTypes.string.isRequired
}

export default CreateItemForm
