const { ObjectId } = require("bson")
const express =require("express")
const auth = require('../middlewares/auth')

const Record = require('../Model/record')
const {validationResult,body} = require('express-validator')
const router = express.Router()

router.post("/",async (req,res)=>{


    try{

        const {obtainedMarks,totalMarks,quiz} =req.body;
        const record = new Record({

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