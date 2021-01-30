const mongoose = require("mongoose")
const config = require('config')
mongoose.connect(config.get("connectionString"),{

useUnifiedTopology:true,
useNewUrlParser:true,
useCreateIndex:true,
}).then((res)=>{

    console.log("mongo set up done")
}).catch((error)=>{

    console.log(error)
})