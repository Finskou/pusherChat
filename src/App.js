import React, { Component } from 'react';
import './App.css';
import UsernameForm from './component/UsernameForm'
import ChatScreen from './ChatScreen'

class App extends Component {
  constructor(){
    super()
    this.state ={
      currentUsername : '',
      currentScreen: 'yourscreen'
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }

  onUsernameSubmitted(username) {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
    .then(response => {
      this.setState({
        currentUsername: username,
        currentScreen: 'ChatScreen'
      })
    })
    .catch(error => console.error('error', error))
  }
  render() {
    if (this.state.currentScreen === 'yourscreen') {
    return <UsernameForm onSubmit={this.onUsernameSubmitted} />
    }
    if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen currentUsername={this.state.currentUsername} />
    }
    
  }
}

export default App;
