import React,{useState} from 'react'
import axios from 'axios'
const VerifyAccount = ()=>{

    const [code,setCode] = usState("")
    const formSubmitHandler = (e)=>{

        e.preventDefault();
        

        async function postData (){
            try{
              const res=  await axios.post('/user/register/verify',{code:code});
              console.log(res)

            }
            catch(error){


            }
        }
    }
    return(<div>

       <form onSubmit={(e)=>{formSubmitHandler(e) }}>
       <input type="text" value={code} onChange={(e)=>{setCode(e.target.value)}} />
       </form>
    </div>)

}

export default VerifyAccount