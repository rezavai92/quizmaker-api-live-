import React , {createContext,useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
export const quizContext = createContext();
const ContextProvider = (props)=>{


   
    const [quizTitle,setQuizTitle] = useState("")
    const [questions,setQuestions] = useState([])
    const [duration,setDuration] = useState("")



    const [token,setToken] =useState("");
const[loggedInUserId,setLoggedInUserId]=useState(null)
const[loginToken,setLoginToken] = useState("");
//console.log("from context")


useEffect(()=>{

setLoginToken(Cookies.get("token"))
setLoggedInUserId(Cookies.get("user"))
},[])
const registerUser = (token)=>{

    setToken(token);

}

const confirmLogin = (token,loggedInUserId)=>{

    setLoginToken(token);
    setLoggedInUserId(loggedInUserId)

}
const confirmLogout = ()=>{
    
    async function fetch (){

        try{
            await axios.get('/auth/logout',
           {headers:{
               xAuthToken :loginToken
           }} ,
            )
            setLoginToken(Cookies.get("token"))
            setLoggedInUserId(Cookies.get("user"))
            setQuizTitle("")
            setQuestions([])
            setDuration([])
            
        }
        catch(err){


        }
    }
    fetch()

    }
    //quiz title change
    const quizDurationChange = (e)=>{

        setDuration(e.target.value)
    }
    const quizTitleChange = (e)=>{

        setQuizTitle(e.target.value);
        
    }

    //correct option handler

    const correctOptionChangeHandler =(questionId,optionId)=>{

        let question ={};

        questions.forEach((q)=>{if(q.id===questionId){

            question = q;
        }})

        question.options.forEach((o)=>{

            if(o.id===optionId){


                o.isCorrect=!o.isCorrect;
            }
        })

        const indexes = questions.map((q)=>{return q.id});

        const replacableIndex= indexes.indexOf(questionId);
  
        const allQuestions =[...questions];
  
        allQuestions.splice(replacableIndex,1,question);
  
        setQuestions(allQuestions)
  


    }

    // delete option handler
    const deleteOptionHandler = (questionId,optionId)=>{

        let question ={};
        questions.forEach((q)=>{if(q.id===questionId){

            question = q;
        }})

        const optionIds = question.options.map((o)=>{return o.id});

        const removableIndex= optionIds.indexOf(optionId);

        const oldOptions =[...question.options];
        oldOptions.splice(removableIndex,1);

        question.options = oldOptions;

        
        const indexes = questions.map((q)=>{return q.id});

      const replacableIndex= indexes.indexOf(questionId);

      const allQuestions =[...questions];

      allQuestions.splice(replacableIndex,1,question);

      setQuestions(allQuestions)


    }


    // delete question handler 
    const deleteQuestionHandler = (questionId)=>{


        const oldQuestions = [...questions];
        const indexes = questions.map((q)=>{return q.id});

        const replacableIndex= indexes.indexOf(questionId);

        oldQuestions.splice(replacableIndex,1);
        setQuestions(oldQuestions);
  
        

    }
    //question text change
    const questionTextChange=(e,id)=>{

        const oldQuestion = [...questions]
        for (let q in oldQuestion){
            if(oldQuestion[q].id===id ){
                oldQuestion[q].title = e.target.value;
                break;
            }
        }
        setQuestions(oldQuestion);
    }


    //optiontextchange
    const optionTextChangeHandler =(e,questionId,optionId)=>{

        let question ={};

        questions.forEach((q)=>{
            if(q.id===questionId){

                 question = q;
            }
        })

        question.options.forEach((o)=>{

            if(o.id===optionId){

                o.title = e.target.value;
            }
        })

        
     const indexes = questions.map((q)=>{return q.id});

      const replacableIndex= indexes.indexOf(questionId);

      const allQuestions =[...questions];

      allQuestions.splice(replacableIndex,1,question);

      setQuestions(allQuestions)

        


    }
    //create option
    const createOption=(questionId)=>{

       const option ={
        id : generateKey(Math.random()),
        title : "",
        isCorrect : false
       }

       let question ={};

       questions.forEach((q)=>{

        if(q.id===questionId){
            question =q;
        }
       })

       

       const options = [...question.options]

       options.push(option);
      // const newOptions =[...options,option];
       question.options=options;

       const indexes = questions.map((q)=>{return q.id});

      const replacableIndex= indexes.indexOf(questionId);

      const allQuestions =[...questions];

      allQuestions.splice(replacableIndex,1,question);

      setQuestions(allQuestions)


    }
    //create question
    const createQuestion= ()=>{


        const question ={
            id : generateKey(Math.random()),
            title :"",
            options:[]
        }

    

    

    
        const contents = [...questions,question];

        setQuestions(contents);

    }

  //  const [Questions,setQuestions] = useState();

  const  generateKey = (pre) => {
        return `${ pre }_${ new Date().getTime() }`
  }


    return(<div>

        <quizContext.Provider
         value={ {generateKey,createQuestion,questions,
            correctOptionChangeHandler,
            quizTitle,
            quizDurationChange,
            quizTitleChange,
            optionTextChangeHandler,
            deleteQuestionHandler,
            deleteOptionHandler,
            setQuizTitle,
            setQuestions,
            setDuration,
            setLoginToken,setLoggedInUserId,
             loggedInUserId, 
             quizDuration : duration,
            loginToken,registerUser,
            confirmLogin,confirmLogout,
         questionTextChange,createOption }} >
            {props.children}
        </quizContext.Provider>
    </div>)
}

export default ContextProvider
