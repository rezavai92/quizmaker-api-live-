import React ,{useState,useEffect,useContext} from 'react'
import {quizContext} from '../../contexts/quizContext'
import {Button,Form} from 'react-bootstrap'
import Option from '../Option/option'
import './question.css'
const Question= (props)=>{


   const{optionTextChangeHandler,createOption,deleteQuestionHandler  } = useContext(quizContext);

   return(<div className="jumbotron question"   >


    <div className="question-text" >

         <h5 style={{color:"white"}} >
            {"#"+props.questionNo +"." }
          </h5>
         <Form.Group>
            
        <Form.Control type="text" size="lg" 
        style={{width:"100%"}}
        value={props.title} onChange={(e)=>{props.textChange(e,props.id) }}
        required={true}
        placeholder="Question" />
        
        </Form.Group>
    </div>

  
   
    {props.options.map((o)=>{

        return(<div key={o.id}>
            
            <Option
            title={o.title}
            
            id={o.id}
            qId={props.id}
            questionId ={props.id}
            optionTextChange={optionTextChangeHandler}
            isCorrect={o.isCorrect}
            ></Option>
            </div>)
    })}

    <Button  variant="danger" onClick={()=>{deleteQuestionHandler(props.id)}}> Delete Question </Button>
    <Button variant="primary" onClick={()=>{createOption(props.id)} } >Add Option</Button>

   </div>)
   

}

export default Question