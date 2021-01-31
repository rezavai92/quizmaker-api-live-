const { ObjectId } = require("bson")
const express =require("express")
const auth = require('../middlewares/auth')
const Quiz = require('../Model/quiz')
const {validationResult,body} = require('express-validator')
const router = express.Router()


router.post('/',[auth,body("title").not().isEmpty(),
                body("questions").exists(),
                
],async (req,res)=>{


const errors = validationResult(req);
if(!errors.isEmpty()){

    return res.status(400).json(errors.array());
}    

const quiz = new Quiz({
    author : req.user.id,
    title : req.body.title,
    questions:req.body.questions,
    duration : req.body.duration,

})    

try{
    const createdQuiz = await quiz.save();
    res.json({createdQuiz})
}
catch(error){

    
        res.status(500).json({"msg":"internal server error"})

    

}

//console.log(req.body);

})
// get all quizzes


router.get('/',async (req,res)=>{

    try{

        const allQuizzes = await Quiz.find().select("title _id  author duration");

        res.json(allQuizzes);


    }

    catch(error){

        res.status(500).json({"msg":"internal server error" })
    }

} )
//get particular quiz by quiz id

router.get('/:quizId',async(req,res)=>{

try{

        const newQuiz = await Quiz.findById(req.params.quizId).populate("author");

       // console.log(newQuiz);
        if(!newQuiz){
            return res.status(404).json({"msg":"no quiz found"});
        }
       const q =[...newQuiz.questions]
       
       
       q.forEach((que)=>{
        que.options.forEach((o)=>{
             o.isCorrect=null;
          //  console.log(o)
        })
        
       })
       
       newQuiz.questions=q;
        res.json(newQuiz);
}
catch(error){
    res.status(500).json({"msg":"internal server error" })

}

})

router.post("/evaluation/:quizId",async(req,res)=>{

    try{

      //  console.log("hello from quiz evaluation")
        const foundQuiz =  await Quiz.findById(req.params.quizId);
     //   console.log(req.body);
        if (!foundQuiz){
            return res.status(404).json({msg:"quiz not found"});
        }

        const answerSheet = [...req.body.answerSheet];
        //console.log(req.body);
        let marks=0;
        answerSheet.forEach((a)=>{
          //  console.log("hi ");
            foundQuiz.questions.forEach((q)=>{
                //console.log(typeof(q._id),a.question_id)
                
                if (String(q._id)===a.question_id){

                   
                    const correctOption = q.options.find((o)=>{
                        return o.isCorrect
                    })
                   // console.log("correctOption",correctOption)
                   
                    if (a.selectedOption===String(correctOption._id)) {
                        marks++;
                    }
                    
                    

                }
            });
        });
        res.json({marksObtained:marks,total:foundQuiz.questions.length})


    }

    catch(error){

    }
} )

module.exports=router