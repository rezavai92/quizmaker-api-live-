import React,{useState,useEffect,useContext} from 'react' 
import {Card,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const QuizCard = (props)=>{

    
    return(<div className="quizCard" >


<Card style={{ width: "100%" ,margin:"3% 0%" }}>
 
  <Card.Body>
    <Card.Title>{props.title}</Card.Title>
    <Card.Text>
      <p>duration : {props.duration} min </p>
      <p>      topic :{props.topic.title}</p>
    </Card.Text>
    <Button variant="primary"  >

        <Link to={`/takequiz/${props.quizId}`} style={{color:"white"}} > 
        Start
        </Link>
    </Button>
  </Card.Body>
</Card>
    </div>)

}

export default QuizCard