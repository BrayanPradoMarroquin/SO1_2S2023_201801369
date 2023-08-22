import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Formulario from './Formulario';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
            <h2>SISTEMAS OPERATIVOS 1 - TAREA 3</h2>
            <h3>201801369  --- Brayan Hamllelo Prado Marroquin</h3>
        </div>
        <p className="App-intro">
          <Formulario />
        </p>
      </div>
    );
  }
}

export default App;
