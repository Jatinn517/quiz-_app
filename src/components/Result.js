import '../styles/result.css'
import { Link } from 'react-router-dom'
import ResultTable from './ResultTable'
import { useDispatch, useSelector } from 'react-redux'
import { resetResultAction } from '../redux/result_reducer'
import { resetAllAction } from '../redux/question_reducer'
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper'
import { usePublishResult } from '../hooks/setResult'

// import actions

export default function Result() {

  const dispatch = useDispatch()

  const { questions: { queue, answers }, result: { result, userID } } = useSelector(state => state)

  // useEffect(() => {
  //   // console.log(flag)
  // })

  const totalpoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10)
  const flag = flagResult(totalpoints, earnPoints)

  // useEffect(()=>{
  //   console.log(earnPoints);
  // })

  //store user result
  usePublishResult({ result, username: userID, attempts, points: earnPoints, achieved: flag ? "passed" : "failed" })

  function onRestart() {
    dispatch(resetAllAction())
    dispatch(resetResultAction())
    // console.log('on Restart')
  }

  return (
    <div className='container'>
      <h1 className="title text-light">Quiz Application</h1>
      <div className="result flex-center">
        <div className='flex'>
          <span>Username</span>
          <span className="bold">{userID}</span>
        </div>
        <div className='flex'>
          <span>Total Quiz Points</span>
          <span className="bold">{totalpoints || 0}</span>
        </div>
        <div className='flex'>
          <span>Total Questions</span>
          <span className="bold">{queue.length}</span>
        </div>
        <div className='flex'>
          <span>Total Attempts :</span>
          <span className="bold">{attempts}</span>
        </div>
        <div className='flex'>
          <span>Total Earn Points :</span>
          <span className="bold">{earnPoints || 0}</span>
        </div>
        <div className='flex'>
          <span>Quiz Result</span>
          <span style={{ color: `${flag ? "green" : "red"}` }} className="bold">{flag ? "passed" : "failed"}</span>
        </div>
      </div>
      <div className="start">
        <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
      </div>

      <div className="container">
        {/* result table */}
        <ResultTable></ResultTable>
      </div>
    </div>
  )
}
