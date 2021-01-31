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


   
   const quizSubmitHandler = (e)=>{

    e.preventDefault();
    // const postData = async ()=>{

    //     try{
    //         console.log("questions",questions)
    //       const res=  await axios.post('/quiz',{

           
    //         title : quizTitle,
    //         questions : questions,
    //         duration: quizDuration
           

    //       },{headers:{

    //         xAuthToken:loginToken
    //       }} );
    //       console.log("from questions.js,created quiz ",res);
    //       setQuizTitle("")
    //       setQuestions([])
    //       setDuration("")
         
    //     }
    //     catch(error){

    //         console.log(error)
    //     }
    // }

    // if(loginToken){
    //     postData()
    // }

    setWillShowModal(true)

   }

   const saveQuizHandler = ()=>{
      const postData = async ()=>{

        try{
     //       console.log("questions",questions)
          const res=  await axios.post('/quiz',{

           
            title : quizTitle,
            questions : questions,
            duration: quizDuration
           

          },{headers:{

            xAuthToken:loginToken
          }} );
  //        console.log("from questions.js,created quiz ",res);
          setQuizTitle("")
          setQuestions([])
          setDuration(null)
          setWillShowModal(false)
         
        }
        catch(error){

          //  console.log(error)
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
          <Modal.Title>Save Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Back
          </Button>
          <Button variant="primary"  onClick={saveQuizHandler}  >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
</div>

    {loginToken?
    <div>

<Button onClick={createQuestion}  variant="secondary" style={{width:"100%" , marginBottom:"2%"}} >{questions.length>0? "Add Question" : "Start"} </Button>

      <Form onSubmit={(e)=>{quizSubmitHandler(e)  } } >


      {questions.length> 0? 

<div>
  
    <Form.Group>
    
    <Form.Control type="text" size="lg" 
    style={{width:"100%"}}
    required={true}
    value={quizTitle} onChange={(e)=>{quizTitleChange(e) }}
    placeholder="Quiz Title" />
    
    </Form.Group>
    <Form.Group>
    
    <Form.Control type="number" 
    style={{width:"100%"}}
    min={5}
    required={true}
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

<Button variant="secondary" 
type="submit"
style={{width:"100%" , marginBottom:"2%"}} >Submit</Button> :null

}
      </Form>

    </div>
    
    :<Redirect to="/"  /> }


</div>


   </div>)
   

}

export default Questions