import React from 'react'
import { useState, useEffect } from 'react';

const Timer = (props) => {

//const [limit,setLimit] =useState("");
const [min,setMin] = useState(0);
const [sec,setSec] = useState(59);

useEffect(()=>{

    setMin(Number(props.duration)-1)
      const counter  = setInterval(()=>{
     //    console.log("i am running");

         let newMin=min;
         setMin(newMin--)
          

      },1000)
      
      

},[])



return(<div>

    <h2>
        {min+":"+sec}
    </h2>
</div>)

}


export default Timer;