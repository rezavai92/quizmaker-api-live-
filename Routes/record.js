const { ObjectId } = require("bson")
const express =require("express")
const auth = require('../middlewares/auth')

const Record = require('../Model/record')
const {validationResult,body} = require('express-validator')
const router = express.Router()


//get result record by id

router.get("/:id" ,async (req,res)=>{

    try{
       const foundRecord=  await Record.findById(req.params.id);
       
       res.json({record:foundRecord})
    }

    catch(error){


    }
})

// post result record
router.post("/",async (req,res)=>{


    try{

        const {obtainedMarks,totalMarks,quiz,answerSheet} =req.body;
        const record = new Record({
            answerSheet,
            obtainedMarks,
            totalMarks,
            quiz

        })

        const newRecord = await record.save();

        res.json({newRecord})


    }

    catch(error){

        res.status(500).json({msg:"internal server error"})
    }

});

module.exports = router;