import React, { useState ,useContext, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import {quizContext} from '../../contexts/quizContext'
import Login from '../LogIn/login'

const Index = ()=>{

     const {loginToken} = useContext(quizContext)
    
    console.log('login token is',loginToken)
    return(<div>

       {loginToken? <Redirect to="/makequiz" /> 
    : <Login /> 

    
    }
    </div>)
}

export default Index