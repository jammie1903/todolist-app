import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Li = styled.li`
  list-style: none;
`

const CheckboxLabel = styled.label`
  user-select: none;
  display: inline-flex;
  margin: 4px 0;
`

const Text = styled.span`
  position: relative;
  top: 2px;
`

const Checkbox = styled.div`
  position: relative;
  background-color: #ffffff;
  margin: 0 8px 0 0;
  display: block;
  overflow: hidden;
  min-width: 25px;
  max-width: 25px;
  max-height: 25px;
  min-height: 25px;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    left: 35%;
    top: 10%;
    width: 22.5%;
    height: 50%;
    border: solid #ffffff;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  &:hover {
    background-size: 100%;
  }
`

const CheckboxBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: #666666;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  transform: scale(0);
  transition: all 300ms ease 0ms;
`

const CheckboxBorder = styled.div`
  min-width: 23px;
  max-width: 23px;
  max-height: 23px;
  min-height: 23px;
  position: absolute;
  z-index: 1;
  pointer-events: none;
  border: 1px solid #000000;
  transition: border 300ms;
`

const CheckboxInput = styled.input.attrs({type: 'checkbox'})`
  position: absolute;
  cursor: pointer;
  opacity: 0;

  &:checked ~ ${CheckboxBackground} {
    transform: scale(1.5);
  }

  &:focus ~ ${CheckboxBorder},
  &:active ~ ${CheckboxBorder} {
    border: 1px solid #ff6605;
  }
`

const TodoItem = ({text, state, onChange}) => (
  <Li>
    <CheckboxLabel>
      <Checkbox>
        <CheckboxInput checked={state} onChange={onChange}></CheckboxInput>
        <CheckboxBackground />
        <CheckboxBorder />
      </Checkbox>
      <Text>{text}</Text>
    </CheckboxLabel>
  </Li>
)

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
  state: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TodoItem
