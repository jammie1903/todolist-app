import React, { useState } from 'react'
import { send } from '../utilities/webSocket'
import { ADD_LIST } from '../utilities/requestTypes'
import InputWithButton from './InputWithButton'
import Panel from './Panel'

const CreateListForm = () => {
  const [value, setValue] = useState('')
  const onSubmit = event => {
    event.preventDefault()
    if (!value.trim()) return

    send(ADD_LIST, { text: value.trim() })
    setValue('')
  }
  return (
    <form onSubmit={onSubmit}>
      <Panel white title='Add a New List'>
        <InputWithButton
          placeholder='Enter list name'
          value={value}
          onChange={e => setValue(e.target.value)}
          buttonText='Create List' />
      </Panel>
    </form>
  )
}

export default CreateListForm
