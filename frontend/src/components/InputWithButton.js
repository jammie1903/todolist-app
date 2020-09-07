import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const InputWrapper = styled.div`
  display: flex;

  @media only screen and (max-width: 320px) {
    flex-wrap: wrap;
  }
`

const Button = styled.button`
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.button};
  flex-shrink: 0;

  border-radius: 0;
  padding: 4px 8px;
  margin-bottom: 4px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.focus};
  }

  &:active {
    background: ${props => props.theme.colors.active};
  }
`

const Input = styled.input`
  border: 1px solid ${props => props.theme.colors.border};
  border-right-width: 0;
  border-radius: 0;
  padding: 4px 8px;
  margin-bottom: 4px;
  flex-shrink: 1;
  width: 250px;
  min-width: 50px;


  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.focus};
    border-right-width: 1px;
  }

  &:focus + ${Button} {
    border-left-width: 0px;
  }

  @media only screen and (max-width: 320px) {
    border-right-width: 1px;

    &:focus + ${Button} {
      border-left-width: 1px;
    }
  }
`

const InputWithButton = ({placeholder, value, onChange, buttonText}) => (
  <InputWrapper>
    <Input type='text' placeholder={placeholder} value={value} onChange={onChange} />
    <Button type='submit'>Create List</Button>
  </InputWrapper>
)

InputWithButton.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired
}

export default InputWithButton
