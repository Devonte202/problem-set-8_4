import React from 'react';
import './App.css';
import Board from './components/board'
import Scoreboard from './components/scoreboard.js'
import {ScoreProvider} from './contexts/ScoreContext.js'

function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <h5>Powered by React</h5>
      <p>Engineered by Devonte Duncan</p>
      <ScoreProvider>
        <Board />
        <Scoreboard />
      </ScoreProvider>
    </div>
  );
}

export default App;
