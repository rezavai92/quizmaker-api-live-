import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'

const TopicDropdown= (props)=>{

const [topics,setTopics] = useState([])
useEffect(()=>{
    async function fetchData(){

        try{

            const response = await axios.get('/topic/all');
            
            const existingTopics =[...response.data.topics,topics]
            console.log("existing topics ",response.data)
        

            if(!props.inQuizFeed){
            setTopics(existingTopics)    
            props.selectTopicHandler(response.data.topics[0]._id)
            }
            else{
                existingTopics.unshift({title:"select topic",_id:null});
                setTopics(existingTopics)
            }

        }   
        catch(error){

            throw error;
        }
    }
    fetchData()
    
},[])

const mappedDropdowns = topics.length>0?(
    
    <select 
    style={{height:"5vh",width:"60vw"}}
    required={true}
    onChange={(e)=>{
        props.selectTopicHandler(e.target.value);
        
    }} >

         {topics.map((t,index)=>{
            return <option 
            value={t._id}
            
            
            >

                            {t.title}
                    </option>
})} </select>
) : []

return(<div>
        
      {mappedDropdowns }    
</div>)

}

export default TopicDropdown