//const { ObjectId } = require("bson")
const express =require("express")
const auth = require('../middlewares/auth')

const Topic = require('../Model/topic')
//const {validationResult,body} = require('express-validator')
const router = express.Router()


//get all topics by id

router.get("/all" ,async (req,res)=>{

    try{
       const topics=  await Topic.find({}).sort("title");
       
       res.json({topics})
    }

    catch(error){

        res.status(500).json({msg:"internal server error"})
    }
})

// post topic
router.post("/",async (req,res)=>{


    try{

        const {title} =req.body;
        const topic = new Topic({
            title

        })

        const newTopic = await topic.save();

        res.json({newTopic})


    }

    catch(error){

        res.status(500).json({msg:"internal server error"})
    }

});

module.exports = router;