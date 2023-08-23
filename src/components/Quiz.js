import React, { useEffect, useState } from 'react'
import Questions from './Questions'
import { MoveNextAction } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';

// redux store
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function Quiz() {

  const [check, setChecked] = useState(undefined)
  const [timer, setTimer] = useState(60);
  const result = useSelector(state => state.result.result);
  const { queue, trace } = useSelector(state => state.questions);
  const dispatch = useDispatch();
  // const trace=state

  useEffect(() => {
    const timer = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    if (timer === 0) {
      onNext();
    }
    return () => clearInterval(timer);
  })

  // next button event handler
  function onNext() {
    // console.log('on next click')
    // update the trace value by one
    setTimer(60);
    if (trace < queue.length) {
      // console.log(result)
      dispatch(MoveNextAction())
      //insert a new result in the array
      dispatch(PushAnswer(check))
    }
    //reset the value of the checked variable
    setChecked(undefined)
  }

  function onChecked(check) {
    // console.log(check)
    setChecked(check)
  }

  //finish exam after the last question
  if (result.length && result.length >= queue.length) {
    return <Navigate to={'/result'} replace="true"></Navigate>
  }

  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>

      {/* display questions */}
      <Questions onChecked={onChecked}></Questions>

      <div className='grid'>
        {/* {trace > 0 ? <button className='btn prev' onClick={onPrev} >Prev</button> : <div></div>} */}
        <div className="btn prev">{timer}</div>
        <button className='btn next' onClick={onNext} >Next</button>
      </div>

    </div>
  )
}