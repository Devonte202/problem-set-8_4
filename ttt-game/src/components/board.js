import React, {useReducer, useEffect, useContext} from 'react'
import PlayerOne from './player-one.js'
import PlayerTwo from './player-two.js'
import TimeMachine from './TimeMachine.js'
import { ScoreContext } from '../contexts/ScoreContext.js'

const board = [null,null,null,null,null,null,null,null,null]
let turn = 0
let timeSteps = []


  
const Board = () => {
  const [score, setScore] =  useContext(ScoreContext)
  const boardReducer = (state, action) => {
    switch (action.type) {
      case 'move':
        return state.map((box, index) => {
          if(index === action.index && turn % 2 !== 0) return "X"
          if(index === action.index && turn % 2 === 0 ) return "O"
          return box
        })
        
      case 'back':
        return action.step
        
      case 'gameOver':
        return board
        
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(boardReducer, board)
  
  const checkBoard = () => {
    const winScenarios = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for(let scenario of winScenarios){
      
      if(state[scenario[0]] === state[scenario[1]] && state[scenario[0]] === state[scenario[2]] && state[scenario[0]] === "X"){
        setScore({playerOne: score.playerOne + 1, playerTwo: score.playerTwo})
        dispatch({type: 'gameOver'})
        timeSteps = []
      } 
      if(state[scenario[0]] === state[scenario[1]] && state[scenario[0]] === state[scenario[2]] && state[scenario[0]] === "O"){
        setScore({playerOne: score.playerOne, playerTwo: score.playerTwo + 1})
        dispatch({type: 'gameOver'})
        timeSteps = []
      } 
    }
  }

  
  useEffect(() => {
    timeSteps.push(state)
    turn += 1
    checkBoard()
  }, [state])
  
  return (
    <div>
        <div>
            {turn % 2 === 0 ? <h3>It is Player One's Turn</h3>: <h3>It is Player Two's Turn</h3>}
          </div>
        <div className="gameArea">
          <div className="boardArea">
            <div className="board">
               {state.map((box, index) => {
                 if(box === "X"){
                   return (
                    <div key={index} className="box" id={index} onClick={() =>dispatch({type: 'move', index: index})}><PlayerOne /></div>
                   )
                 }
                 else if(box ==="O"){
                   return (
                    <div key={index} className="box" id={index} onClick={() =>dispatch({type: 'move', index: index})}><PlayerTwo /></div>
                   )
                 }
                 else {
                   return (
                    <div key={index} className="box" id={index} onClick={() =>dispatch({type: 'move', index: index})}></div>
                   )
                 }
               })}
            </div>
            <TimeMachine timeSteps={timeSteps} dispatch={dispatch}/>
          </div>
        </div>
      </div>
    )
}

export default Board