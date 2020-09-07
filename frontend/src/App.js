import React from 'react'
import TodoListsContainer from './components/TodoListsContainer'
import Header from './components/Header'
import CreateListForm from './components/CreateListForm'

function App() {
  return (
    <div className="App">
      <Header />
      <TodoListsContainer />
      <CreateListForm />
    </div>
  )
}

export default App
