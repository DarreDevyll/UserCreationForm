import React, { Component } from 'react';
import './App.css';
import { FormContainer } from './components/styles/FormContainer.styled';

import UserCreationForm from './components/UserCreationForm';

class App extends Component {
  render() {
  return (
    <>
    <div className="App" >
      <h1>This is my App</h1>
      <FormContainer>
        <UserCreationForm />
      </FormContainer>
    </div>
    </>
  );
}
}

export default App;
