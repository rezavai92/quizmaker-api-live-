
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
 
        title:{type : String}
    } )
    
    


const Topic = mongoose.model("topics",topicSchema)


module.exports = Topic;