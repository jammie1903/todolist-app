import React from 'react'
import styled from "styled-components"

const Header = styled.h1`
  padding: 16px;
  font-size: 32px;
  line-height: 1;
  margin: 0;
  background: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.white};
`

export default () => (
  <Header>
    {window.document.title}
  </Header>
)
