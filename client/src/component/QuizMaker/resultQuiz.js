import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import React  from 'react'
//import {quizContext} from '../../contexts/quizContext'
//import {Modal,Button} from 'react-bootstrap'
//import axios from 'axios'
//import { Redirect } from 'react-router-dom'
import './testQuestion.css'

const ResultQuiz = (props)=>{

   // const [bgColor,setBgColor] = useState("white"
    



return(<div>


    <div className="test-question" >
        <h3>{props.questionNo +". "+ props.title  } </h3>
        {props.userSelected==null?<p style={{color:"red"}} >You didn't select any option</p>:null}
    </div>

    <div className="test-question-option" >


        {props.options.map((option,index)=>{

            let bg ="black";
            let verdict ="";

            if( (String(option._id)===String(props.correctOption._id))){

                // bg ="green";
                bg="green"
                verdict="correct answer"
                console.log("optiontitle is",option.title)
                 
             }
            if ( (String(option._id)===props.userSelected && String(option._id)===String(props.correctOption._id))){
                verdict="You Got it!";
                //bg="green"
            }

             if ( (String(option._id)===props.userSelected && String(option._id)!==String(props.correctOption._id))){
                bg="red";
                verdict="You selected this!"
            }

            return(<div key={option._id}>
                    <input type="radio" 
                     disabled={true}
                     value={props.correctAnswer}
                     id={option._id}
                    
                    value={option._id} name={props.questionId}  />     
                    <label for={option._id} 
                    
                    
                    > {" "+option.title}
                                <span style={{color:bg}} >{" "+verdict}</span>
                     </label>              
                </div>)
        })}
    </div>

</div>)

}


export default ResultQuiz