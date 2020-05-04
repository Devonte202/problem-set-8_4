import React, {useState} from 'react'

const TimeMachine = (props) => {
  
  const [step, setStep] = useState(0)
  
  const deleteParadox = (clickedButton) => {
    props.timeSteps.splice(clickedButton)
    setStep(step+1)
  }
  
  return (
      <div className="timeMachine">
        {
          props.timeSteps.map((step,index) => <button 
            className="timeSteps" 
            key={index}
            onClick ={() => {
            props.dispatch({type: 'back', step: props.timeSteps[index]})
            deleteParadox(index)
          }}
          >Go back to move {index}</button>)
        }
      </div>
    )
}

export default TimeMachine