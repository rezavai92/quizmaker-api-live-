import React  from 'react';
//import Router from './Components/Router/Router'
import Navigation from './component/Navigation/Header'
//import Homepage from './component/Homepage/Homepage'
import ContextProvider from './contexts/quizContext'
import Questions from './component/Questions/questions'
import QuizMaker from './component/QuizMaker/quizmaker'
import Error from './component/LogIn/error'
import {BrowserRouter,Route} from 'react-router-dom'
import Login from './component/LogIn/login'
import Index from './component/Index/index'
import QuizFeed from './component/QuizFeed/quizfeed'
import SignUp from './component/SignUp/signup'
import ViewDetail from './component/QuizMaker/viewdetails'
//import './App.css';

const App=()=>  {




  

return ( 


<ContextProvider>
<BrowserRouter>   
<Navigation />
        <Route path="/quiz/result/details/:id" exact component={ViewDetail}  />
        <Route path="/takequiz/:id" exact component ={QuizMaker} />
      
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login/error" exact component={Error} />     
        <Route path="/login" exact component={Login} />                  
        <Route path ="/answerquiz" exact component = {QuizFeed} />
        <Route path='/makequiz' exact component={Questions}></Route>
        <Route path="/" exact  component={Index} /> 
       
  </BrowserRouter>
</ContextProvider>
       
           
     

  )
  
}

export default App;
