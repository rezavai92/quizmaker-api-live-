import React ,{useState,useEffect,useContext} from 'react'
//import {quizContext} from '../../contexts/quizContext'
import {Modal,Button,Spinner} from 'react-bootstrap'
import axios from 'axios'
import './quizMaker.css'
import { Redirect } from 'react-router-dom'
import {Helmet} from 'react-helmet'
import Timer from 'react-compound-timer'
import {quizContext} from '../../contexts/quizContext'
import { CircularProgressbar ,buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import TestQuestion from './testquestion'
const QuizMaker = ()=>{

   
    const [quiz,setQuiz] = useState({title:"",duration:"",questions:[],author:"" });
    const path =window.location.pathname;
    const {saveRecord} = useContext(quizContext)
    const [startAgain,setStartAgain] = useState(false)
    const [willShowResultModal, setWillShowResultModal] = useState(false);
    const [willRedirectToDetail,setWillRedirectToDetail] = useState(false)
  const handleShowResultClose = () => {
    
    setWillShowResultModal(false);
    closeModal();
   } ;
  const handleShowResultShow = () => setWillShowResultModal(true);

    const [willShowModal,setWillShowModal] = useState(true)
    const [willStartTest,setWillStartTest] = useState(false)
    //const[recordId,setRecordId] = useState("")
    const [willTakeBack,setWillTakeBack] =useState(false);
    const[quizSubmissionSpins,setQuizSubmissionSpins]= useState(false);
    const [answerSheet,setAnswerSheet] = useState([]);
    const [obtainedMarks,setObtainedMarks] = useState(0);
    const[totalMarks,setTotalMarks] = useState(0);
    const[willShowTimeupModal ,setWillShowTimeupModal] = useState(false)
    const pathsep= path.split("/");

    //console.log(pathsep)
   const id = pathsep[2] ;
   //console.log("quiz id is ",path)
    useEffect(()=>{

        const getQuiz = async ()=>{

            try{

                const quizContent = await axios.get(`/quiz/${id}`);

                setQuiz(quizContent.data)
              //  console.log("quiz content ",quizContent);
            }

            catch(error){


            }


        }

        getQuiz();
    },[])

    const takeBack = ()=>{

        setWillTakeBack(true)
    }


    //get trail color,textcolor for score

    const getScoreFeatures=(score,total)=>{

        const ratio = (score/total);
        let feedback="";
        let trailColor ="";
        if( ratio===1 ){

          feedback="Master!";
          trailColor="#ff3dd2"
        }
        else if ( ratio>=.8){
          feedback ="Excellent!";
          trailColor ="#3da5ff"

        }
        
      else  if(ratio>0.65){
          feedback="Well Done!"
          trailColor="#3da5ff"
        }
        else  if(ratio>=0.5){
          feedback="Good!"
          trailColor="#3da5ff"
        }
        
        else {
          feedback="Try Again!"
          trailColor="red"
        }

        return{feedback,trailColor}
    }
    
    const startTestHandler = ()=>{
        setWillShowModal(false)
        setWillStartTest(true)
    }
   const closeTimeupModal= ()=>{
        setWillShowTimeupModal(false);
        takeBack();

    }
    const closeModal = ()=>{
        setWillShowModal(false)
        takeBack();
    }

    const quizSubmitHandler=()=>{

      setWillShowResultModal(true)
      setQuizSubmissionSpins(true)
      const postData =async ()=>{


        try{
          const res= await axios.post(`/quiz/evaluation/${id}`,{answerSheet })

          setQuizSubmissionSpins(false)
        
         // console.log(res.data);
          setObtainedMarks(res.data.marksObtained);
          setTotalMarks(res.data.total);

          const recordResponse = await axios.post('/record',{

            answerSheet,
            obtainedMarks:res.data.marksObtained,
            totalMarks :res.data.total,
            quiz : id
          })
          console.log(recordResponse.data);
          setAnswerSheet([]);
          saveRecord(recordResponse.data.newRecord._id);
          setWillStartTest(false);

          
        }
        catch(error){
          setQuizSubmissionSpins(false);
         
          throw error;
        }

      }
     setTimeout(()=>{
      postData();

     },1000)
    }
  //  console.log("answers sheets",answerSheet);



    return(<div className="container quizMaker " >

            <Helmet>
                <meta charSet="utf-8" />
                <meta property="og:title" content={quiz.title} data-rh="true" />
                <meta property="og:description" content={quiz.title} data-rh="true" />
                <meta property="og:image" 
                content='https://i.imgur.com/mpcNFUA.png'
                data-rh="true" />

                
                
            </Helmet>

        {willTakeBack?<Redirect to="/answerquiz" /> : null}

      {willShowModal?
      
    <div>
        <Modal show={willShowModal} 
            onHide={closeModal} 
            backdrop="static"
            keyboard={false}
            animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Reminder!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you ready to take this test? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Go Back
          </Button>
          <Button variant="primary" onClick ={startTestHandler} >
            Start
          </Button>
        </Modal.Footer>
      </Modal>
    </div> :
    null
    }

{willShowTimeupModal?
      
      <div>
          <Modal show={willShowTimeupModal} 
              onHide={closeTimeupModal} 
              backdrop="static"
              keyboard={false}
              animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Finshed!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your Thank you for participating </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeTimeupModal}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </div> :
      null
      }
  

    {willStartTest?
        <div>
            <div className ="quizHeader">
                <h2 style={{color :"white"}} > <span  >Title : </span> {quiz.title}</h2>
              
                <Timer
                initialTime={quiz.duration*60*1000}
                direction="backward"
                checkpoints={[
                    {
                        time: 0,
                        callback: () =>{
                            
                            
                            setQuiz({});
                            setWillShowTimeupModal(true);
                            setWillStartTest(false);
                        
                        },
                            



                    }
                   
                ]}
                 >
                {() => (
                    <h4 style={{color:"red"}} >
                       <span style={{fontWeight:"normal"}} >   Time Remaining : {" "}</span>
                        <Timer.Hours /> : 
                        <Timer.Minutes /> : 
                        <Timer.Seconds />
                        
                    </h4>
                    
                )}
              </Timer>
              
                <p style={{color:"#4287f5"}} > <em style={{color:"white"}} >Prepared by : </em> {quiz.author.name } </p>
            </div>
           {quiz.questions?
             <div className="questionFlex" >
             {quiz.questions.map((question,index)=>{
                 return(<div key={question._id} > 
                             <TestQuestion  
                                 questionNo={index+1} 
                                 options ={question.options}
                                 title ={question.title}
                                 questionId={question._id}
                                 selectedOptionHandler={(selectedOptionId)=>{
                                   const queId =question._id;
                                  const answers= [...answerSheet];
                                const foundQuestion=  answers.find((a)=>{
                                    return a.question_id===queId;
                                  })
                                  console.log("hello, found question",foundQuestion)

                                  if(foundQuestion!=undefined){
                                   const queIndex= answers.findIndex((a)=>{
                                      return a.question_id===queId;
                                    });
                                    if(queIndex>=0){
                                      answers[queIndex]={question_id :queId, selectedOption:selectedOptionId}
                                      
                                    }
                                    
                                  }
                                  else{
                                    console.log("hello, found question",foundQuestion)
                                    answers.push({question_id :queId, selectedOption:selectedOptionId})
                                  }
                                  setAnswerSheet(answers);
                                  
                                 } }
                             />
                         </div>
                     )
             }) } 

             <div style={{textAlign:"center"}} > 
               <Button variant="success" 
               onClick={()=>{

              quizSubmitHandler();
               }}
               >Submit</Button> 
               </div>
         </div> :null   
        }
        </div>   : null 
    }

{/* Result Pop Up Modal */}

{
 willShowResultModal?


 <div className="submit-spinner" >
  
  <Modal show={willShowResultModal} onHide={handleShowResultClose} >

      <Modal.Header closeButton >
        {!quizSubmissionSpins? <h4 style={{marginLeft:"40%",color:"#3da5ff"}}>

         { getScoreFeatures(obtainedMarks,totalMarks).feedback}
        </h4> :null}
      </Modal.Header>
        <Modal.Body>
          
        {quizSubmissionSpins?         
        <div style={{textAlign:"center" ,padding:"10%" }}>
         <p>
           Processing...
         </p>
        <Spinner animation="border" variant="success" />
        </div>: <div style={{textAlign:"center" ,padding:"10%" }} >
        <CircularProgressbar value={(obtainedMarks/totalMarks)*100} 
        
        text={obtainedMarks+"/"+totalMarks} />;
        </div> 
        
        
        }
        </Modal.Body>
        {!quizSubmissionSpins ?
        <Modal.Footer>
            <Button variant="warning" onClick={()=>{

              
              setWillShowResultModal(false)
              setWillStartTest(true)
             
              //setStartAgain(true);
            }} >
              Try Again
            </Button>
            <Button variant="success" onClick={()=>{

                setWillRedirectToDetail(true)

            }}  >
              View Details
            </Button>
            <Button variant="info" onClick={handleShowResultClose}  >
              Home
            </Button>
        </Modal.Footer>
        :null}
        
      </Modal>
   </div>
  
 : null
}


{
  willRedirectToDetail? 
  <Redirect to={`/quiz/result/details/${id}`} />
  :null
}

    </div>)

}

export default QuizMaker