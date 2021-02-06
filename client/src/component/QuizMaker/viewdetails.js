import React,{useState,useContext, useEffect} from 'react'
//import Quiz from '../../../../Model/quiz'
import axios from 'axios'
import {quizContext} from '../../contexts/quizContext'
import ResultQuiz from './resultQuiz'
const ViewDetail = ()=>{

    const path = window.location.pathname.split('/')
    const quizId = path[4];
    //const [quizId,setQuizId] = useState("")
    const [result,setResult] = useState({
        quizId:null,
        questionAnswerList : [],
        author :null

    })
    const {saveRecord,record} = useContext(quizContext)

    console.log("result is",result)
    useEffect(()=>{

       // console.log("record",record)
        async function fetchData(){

            try{
            
                const response = await axios.get(`/record/${record.id}`);
                console.log(response)
                const foundQuiz = await axios.get( `/quiz/answer/${quizId}`)
                console.log(foundQuiz.data)

               const mappedResult= foundQuiz.data.questions.map((q)=>{

                    const correctOption = q.options.find((o)=>{
                    
                            return o.isCorrect
                        
                    })
                   const foundRecord= response.data.record.answerSheet.find((a)=>{
                        return a.question_id===q._id
                    })

                    if(foundRecord!=undefined){
                        return {
                            questionId : q._id,
                            title : q.title,
                            
                            userSelected: foundRecord.selectedOption,
                            correctOption : correctOption,
                            options : q.options
                        }
                    }
                    else{
                        return {
                            title : q.title,
                            
                            questionId : q._id,
                            userSelected:null,
                            correctOption : correctOption,
                            options:q.options
                        }
                    }
                })

                setResult({
                    quizId:quizId,
                    questionAnswerList : mappedResult,
                    author : foundQuiz.data.author
                })



            }

            catch(error){


            }
        }

        fetchData()

    },[])

    return(<div className="container" style={{marginTop:"1%"}} >

            <h2 style={{textAlign:"center" , color:"green"}} > Details!</h2>
            {
                result.questionAnswerList.length>0?
                
                result.questionAnswerList.map((r,index)=>{

                    return(<div>
                            <ResultQuiz 
                            questionNo={index+1} 
                            options ={r.options}
                            title ={r.title}
                            questionId={r._id}
                            userSelected={r.userSelected}
                            correctOption={r.correctOption}
                                />
                        </div>)
                })
                :null
            
            }     
    </div>)

}


export default ViewDetail