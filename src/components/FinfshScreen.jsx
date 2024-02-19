import React from 'react'

function FinfshScreen({points,maxPossiblePoint,highscore,dispatch}) {
    const precentage= (points/maxPossiblePoint)*100
    let emoji;
    if (precentage===100) emoji="🥇";
    if(precentage>=80&&precentage<100) emoji="🎉"
    if(precentage>=50&&precentage<80) emoji="🙃🙃"
    if(precentage>=0&&precentage<50) emoji="😌😌"
    if (precentage===0) emoji="🙆‍♀️🤦‍♂️";



  return (
    <>
      <p className='result'>
     <span>{emoji}</span>You scored <strong className='answerResult'>{points}</strong> out of <span className='allresult'> {maxPossiblePoint}</span> ({Math.ceil(precentage)}%)
      </p>
      <p className='highscore'>(Highscore: {highscore} Points) </p>
      <button className='btn btn-ui' onClick={()=>dispatch({type:"restart"})} >
      Restart Quiz
    </button>
      </>
  )
}

export default FinfshScreen
