import React ,{useContext,useState,useEffect} from 'react'
import {quizContext} from '../../contexts/quizContext'
import QuizCard from '../QuizCard/quizcard'
import {Helmet} from 'react-helmet'
import './quizFeed.css'
import axios from 'axios'
const QuizFeed = ()=>{

   
    const [quizzes,setQuizzes] = useState([{title:"",questions:[],duration:""}]);

    useEffect(()=>{

        //console.log("from quiz feed")
        const getQuiz = async ()=>{

            try{

                const quizContent = await axios.get('/quiz');
               // console.log("quiz content ",quizContent);
                setQuizzes(quizContent.data);

            }

            catch(error){


            }


        }

        getQuiz();
    },[])


    return(<div className="container quizFlex" >

        
            <Helmet>
                <meta charSet="utf-8" />
                <meta property="og:title" content="Quizophile" data-rh="true" />
                <meta property="og:description" content="Quizophile is an online quiz bulding and sharing platform" data-rh="true" />
                <meta property="og:image" 
                content='https://i.imgur.com/mpcNFUA.png'
                data-rh="true" />

                
                
            </Helmet>


        {quizzes.map((q)=>{

            return(<QuizCard 
                title={q.title} 
                duration ={q.duration}
                quizId ={q._id}
                key={q._id}
                
            >

            </QuizCard>)
        })}

    </div>)

}

export default QuizFeed