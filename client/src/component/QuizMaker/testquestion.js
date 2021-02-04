import React  from 'react'
//import {quizContext} from '../../contexts/quizContext'
//import {Modal,Button} from 'react-bootstrap'
//import axios from 'axios'
//import { Redirect } from 'react-router-dom'
import './testQuestion.css'

const TestQuestion = (props)=>{

return(<div>

    <div className="test-question" >
        <h3>{props.questionNo +". "+ props.title  } </h3>
    </div>

    <div className="test-question-option" >


        {props.options.map((option,index)=>{

            return(<div key={option._id}>
                    <input type="radio" 
                    onChange={()=>{props.selectedOptionHandler(option._id)  } }
                    id={option._id}
                    
                    value={option._id} name={props.questionId}  />     
                    <label for={option._id}  > {" "+option.title}
                    
                     </label>              
                </div>)
        })}
    </div>

</div>)

}


export default TestQuestion