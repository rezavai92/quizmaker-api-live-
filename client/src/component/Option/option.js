import React ,{useState,useEffect,useContext,createRef} from 'react'
import {quizContext} from '../../contexts/quizContext'
import {Button,Form} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash,faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import './option.css'
const Option = (props)=>{

   // const [correctButtonText,setCorrectButtonText] =useState(false)
    
    //console.log("from option")
    const {correctOptionChangeHandler,deleteOptionHandler} =useContext(quizContext)

    

   return(<div className="option-flex" >


       <div className="option-text">
       <Form.Group>
        
        <Form.Control  type="text" placeholder="Option" 
        value={props.title}
        style={{width:"100%"}}
        onChange={(e)=>{props.optionTextChange(e, props.questionId, props.id)} }
        />
        </Form.Group>

       </div>
       
       
      <div className="optionButton" > 
      <Button  variant="light"  type="button" 
        onClick={()=>{deleteOptionHandler(props.questionId,props.id)}}> 
            <FontAwesomeIcon icon={faTrash}/>
        </Button>  
      </div>
       
      <div>
      <Button className="optionButton" 
       variant ={props.isCorrect?"success":"info"}
       onClick={()=>{
           
           correctOptionChangeHandler(props.questionId, props.id)
           
           }} >
           
           <FontAwesomeIcon icon={faCheckCircle} /> 
           
     </Button>
      </div>
   </div>)
}

export default Option