import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
const Error = ()=>{
    return(<div className="container" >

        <p style={{color:"red"}} >
        Please Provide correct email and password
        </p>
        <Button variant="warning"   >
            <Link to="/" >
            Back to Login Page
            </Link>
        </Button>
    </div>)
}

export default Error