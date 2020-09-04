import React, { useState } from 'react'
import { send } from '../utilities/webSocket'
import { ADD } from '../utilities/requestTypes'
import styled from 'styled-components'

const Button = styled.button`
  border: 1px solid #ccc;
  background: #eeeeee;

  border-radius: 0;
  padding: 4px 8px;
  margin-bottom: 4px;

  &:focus {
    outline: none;
    border-color: #ff6605;
  }

  &:active {
    background: #d8d8d8;
  }
`

const Input = styled.input`
  border: 1px solid #ccc;
  border-right-width: 0;
  border-radius: 0;
  padding: 4px 8px;
  margin-bottom: 4px;
  &:focus {
    outline: none;
    border-color: #ff6605;
    border-right-width: 1px;
  }

  &:focus + ${Button} {
    border-left-width: 0px;
  }
`

const CreateItemForm = () => {
  const [value, setValue] = useState('')
  const onSubmit = event => {
    event.preventDefault()
    if (!value.trim()) return

    send(ADD, { text: value.trim() })
    setValue('')
  }
  return (
    <form onSubmit={onSubmit}>
      <Input type='text' placeholder='Add a new item here...' value={value} onChange={e => setValue(e.target.value)} />
      <Button type='submit'>Add Item</Button>
    </form>
  )
}

export default CreateItemForm
