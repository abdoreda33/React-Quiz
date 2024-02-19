import React from 'react'
import DateCounter from '../DateCounter'

function Progress({index,numQuestion,points,maxPossiblePoint,answer}) {
  return (
    <header className='progress'>
      <progress max={numQuestion} value={index + Number(answer !== null)} />
        <p>Question <strong>{index+1}</strong>  / {numQuestion}</p>
        <p><strong>{points}/{maxPossiblePoint}</strong></p>
    </header>
  )
}

export default Progress
