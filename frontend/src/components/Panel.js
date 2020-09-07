import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  margin: 16px;
  padding: 0 16px 16px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  background: ${props => props.white ? props.theme.colors.white : props.theme.colors.background};
`

const Title = styled.h2`
  margin: 4px -16px 16px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: 0 16px 4px;
`

const Panel = ({ title, children, white }) => (
  <Container white={white}>
    <Title>{title}</Title>
    {children}
  </Container>
)

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  white: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Panel
