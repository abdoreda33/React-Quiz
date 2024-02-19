
import React , { useEffect, useReducer } from 'react'
import './App.css'
import Header from "./components/Header"
import Main from './components/Maiin'
import Loader from "./components/Loader"
import Error from "./components/Error"
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import NextButton from './components/NextButton'
import Progress from './components/Progress'
import FinfshScreen from './components/FinfshScreen'
import Footer from './components/Footer'
import Timer from './components/Timer'


//عدد الثواني
const SECS_PER_QUESTION=30;


//   القيمه الاوليه
const initialState={
questions:[],
status:"Loading",
index:0, // مهمتها معرفه عدد الاساله وتعمل علي اتاحه الاساله الاخري
answer:null,
points:0,
highscore:0,
secondsRemaning:null
}

//  داله reducer 
function reducer(state,action){
  switch(action.type){
    
    case "dataRecived":  
      return{
        ...state,
        questions: action.payload,
        status:"ready"
      }
      case "dataFailed":
        return {
          ...state,
           status:"error"
        }
        case "start":
          return{
            ...state,
            status:"active",
            secondsRemaning:state.questions.length*SECS_PER_QUESTION
          }
          case "newAnswer":
            const question=state.questions.at(state.index)
            return{
              ...state,
              answer:action.payload,
              points:action.payload===question.correctOption?state.points+question.points:state.points
            }
            case"nextQuestion":
            return{
              ...state,
              index:state.index+1,
              answer:null
            }
            case "finish":
              return{
                ...state,
                status:"finished",
                highscore:state.points>state.highscore?state.points:state.highscore
              }
              case "restart":
              
                return{
                  ...initialState,
                  questions:state.questions,
                  status:"ready",
                };
                return{
                  ...state,
                  points:0,
                  highscore:0,
                  index:0,
                  answer:null,
                  status:"ready"
                }
              case "tick":
                return{
                  ...state,
                  secondsRemaning:state.secondsRemaning-1,
                  status:state.secondsRemaning===0?"finished":state.status
                }
      default:
       throw new Error("Action Unknown")
  }
}
function App() { 
  const [{questions,status,index,answer,points,highscore,secondsRemaning},dispatch]=useReducer(reducer,initialState)
  // عدد الاساله
const numQuestion=questions.length;
const maxPossiblePoint=questions.reduce((prev,cur)=>prev+cur.points,0)
// جلب الداتا
  useEffect(function(){
    fetch("http://localhost:3000/questions").then((res)=>res.json())
    .then((data)=>dispatch({type:"dataRecived",payload:data}))
    .catch((err)=>dispatch({type:"dataFailed"}))
  },[] )
  return (
    <div className='app'>
     <Header/>
     <Main >
    
    {status==="Loading"&&<Loader/>}
    {status==="error"&&<Error/>}
    {status==="ready"&&<StartScreen numQuestion={numQuestion} dispatch={dispatch} />}
    {status==="active"&&
  
    <>
    <Progress index={index} numQuestion={numQuestion} points={points} maxPossiblePoint={maxPossiblePoint} answer={answer}/>
    <Question question={questions[index]}
     dispatch={dispatch} 
     answer={answer}/>
     <Footer>
     <Timer dispatch={dispatch} secondsRemaning={secondsRemaning}/>
    <NextButton dispatch={dispatch} answer={answer} index={index} numQuestion={numQuestion}/>
     </Footer>
    </>
     }
     {status==="finished"&&<FinfshScreen points={points} maxPossiblePoint={maxPossiblePoint} highscore={highscore} dispatch={dispatch} />}
     </Main>
    </div>
  )
}

export default App

