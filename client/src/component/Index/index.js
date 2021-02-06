import React, {useContext} from 'react'
import { Redirect } from 'react-router-dom'
import {quizContext} from '../../contexts/quizContext'
import QuizMaker from '../QuizMaker/quizmaker'
import Questions from '../Questions/questions'
const Index = ()=>{

     const {loginToken} = useContext(quizContext)
    
    console.log('login token is',loginToken)
    return(<div>

       {loginToken? <Questions/> 
    : <Redirect to="/login" /> 

    
    }
    </div>)
}

export default Index