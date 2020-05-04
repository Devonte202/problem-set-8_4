import React, {createContext} from 'react'

export const ScoreContext = createContext()

export const ScoreProvider = (props) => {
  const [score, setScore] = React.useState({playerOne: 0, playerTwo: 0})
  
  return(
          <ScoreContext.Provider value={[score, setScore]}>
           {props.children}
          </ScoreContext.Provider>
        )
}