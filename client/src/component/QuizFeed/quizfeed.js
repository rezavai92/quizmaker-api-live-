import React ,{useState,useEffect} from 'react'

import QuizCard from '../QuizCard/quizcard'
import TopicDropdown from '../Questions/dropdown'
import {Helmet} from 'react-helmet'
import './quizFeed.css'
import axios from 'axios'
const QuizFeed = ()=>{

   
    const [quizzes,setQuizzes] = useState([]);
    const[topicId,setTopicId] = useState()

    useEffect(()=>{

        //console.log("from quiz feed")
        const getQuiz = async ()=>{

            try{

                const quizContent = await axios.get('/quiz');
                console.log("quiz content ",quizContent);
                setQuizzes(quizContent.data);

            }

            catch(error){


            }


        }

        getQuiz();
    },[])

    const searchByTopicHandler=(id)=>{

        async function search(){
            try{

                const response =await axios.get(`/quiz/search/${id}`);
                setQuizzes(response.data.searchedQuizes)
            }
            catch(error){

                    throw error;
            }
        }

        search();
    }

    return(<div className="container quizFlex" >

        
            <Helmet>
                <meta charSet="utf-8" />
                <meta property="og:title" content="Quizophile" data-rh="true" />
                <meta property="og:description" content="Quizophile is an online quiz bulding and sharing platform" data-rh="true" />
                <meta property="og:image" 
                content='https://i.imgur.com/mpcNFUA.png'
                data-rh="true" />

                
                
            </Helmet>
            <div style={{textAlign:"center",marginTop:"1%"}} >
            <TopicDropdown 
            inQuizFeed= {true}
            selectTopicHandler={(id)=>{

                searchByTopicHandler(id)
            }} />

            </div>

        {quizzes.map((q)=>{

            return(<QuizCard 
                title={q.title} 
                duration ={q.duration}
                quizId ={q._id}
                key={q._id}
                topic={q.topic}
            >

            </QuizCard>)
        })}

    </div>)

}

export default QuizFeed