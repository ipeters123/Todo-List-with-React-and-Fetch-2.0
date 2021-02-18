import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from './components/container.jsx'

function App() {
  return (
    <div>
      <Container />
    </div>
  );
}

export default App;

ReactDOM.render(<App />,document.querySelector("#root"))