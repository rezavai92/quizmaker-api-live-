import React, {useContext} from 'react'
import { Link,Redirect } from 'react-router-dom'
import {quizContext} from '../../contexts/quizContext'
import "./index.css"
const Index = ()=>{

     const {loginToken} = useContext(quizContext)
    
    console.log('login token is',loginToken)
    return(<div className="container" >

       {loginToken? <div className="index-card-flex" >

            <Link to="/makequiz" style={{textDecoration : "none"}}  >
            <div className="make-quiz-card" >
              MAKE QUIZ
            </div>
            </Link>

            <Link to="/answerquiz"  style={{textDecoration : "none"}} >
            <div className="answer-quiz-card" >
               ANSWER QUIZ
            </div>
            </Link>

          </div>
    : <Redirect to="/login" /> 

    
    }
    </div>)
}

export default Index