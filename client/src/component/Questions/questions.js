import React ,{useState,useEffect,useContext} from 'react'
import {quizContext} from '../../contexts/quizContext'
import {Button,Form,Modal} from 'react-bootstrap'
import Question from '../Question/question'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import './questions.css'
import { faBatteryThreeQuarters } from '@fortawesome/free-solid-svg-icons'
const Questions= ()=>{


   const{quizDuration,setQuizTitle,setQuestions,setDuration ,quizTitle,quizDurationChange,questionTextChange,quizTitleChange ,questions,createQuestion,loginToken } = useContext(quizContext);
   const [willShowModal,setWillShowModal] = useState(false)
   

   const closeModal = ()=>{

    setWillShowModal(false);

   }


   
   const quizSubmitHandler = ()=>{

    
    const postData = async ()=>{

        try{
            console.log("questions",questions)
          const res=  await axios.post('/quiz',{

           
            title : quizTitle,
            questions : questions,
            duration: quizDuration
           

          },{headers:{

            xAuthToken:loginToken
          }} );
          console.log("from questions.js,created quiz ",res);
          setQuizTitle("")
          setQuestions([])
          setDuration("")
          setWillShowModal(true)

        }
        catch(error){

            console.log(error)
        }
    }

    if(loginToken){
        postData()
    }
   }

   return(<div style={{textAlign:"center" , marginTop:"2%",  }} 
   className="container ">


<div style={{
    backgroundColor:""
}}  className="questions" >


<div className="questionModal" >
<Modal show={willShowModal} 
onHide={closeModal} 
backdrop="static"
 keyboard={false}
animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary"  >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
</div>

    {loginToken?
    <div>

<Button onClick={createQuestion}  variant="info" style={{width:"100%" , marginBottom:"2%"}} >{questions.length>0? "Add Question" : "Start"} </Button>

{questions.length> 0? 

        <div>
            <Form.Group>
            
            <Form.Control type="text" size="lg" 
            style={{width:"100%"}}
            value={quizTitle} onChange={(e)=>{quizTitleChange(e) }}
            placeholder="Quiz Title" />
            
            </Form.Group>
            <Form.Group>
            
            <Form.Control type="number" 
            style={{width:"100%"}}
            min={5}
            size="sm"
            value={quizDuration}
            onChange={quizDurationChange}
            placeholder="duration" />
            
            </Form.Group>
        </div>
        

            
:null}

{
    questions.map((q,index)=>{
        return(<div  key={q.id} >
                <Question
                
                questionNo={index+1}
                textChange={questionTextChange}
                title ={q.title}
                options ={q.options}
                id={q.id}
                ></Question>

            </div>)
    })
    
}
{questions.length>0?

<Button variant="secondary" onClick={quizSubmitHandler}  style={{width:"100%" , marginBottom:"2%"}} >Submit</Button> :null

}

    </div>
    
    :<Redirect to="/"  /> }


</div>


   </div>)
   

}

export default Questions