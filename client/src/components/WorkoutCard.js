import React from "react";
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import { faker } from '@faker-js/faker';
import { useNavigate } from "react-router-dom";

function WorkoutCard({user, workout}) {
    const {title, description, category, dates, time, gym} = workout
    const navigate = useNavigate();

    function handleApplyButton() {
        if( user === null || user === undefined){
          alert ("User must be logged in.")
          return ;
        }
        navigate(`/workouts/${workout.id}`)
    }

    // let imageURl = faker.image.avatar()

    return (
      <Card className="workout-card">
        <Card.Header className="card-header" as="h5">{gym.name}</Card.Header>
        <div className="workoutcard-text">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text className="workout-description">{description}</Card.Text>
            <Card.Text className="work-category">Category: {category}</Card.Text>
            <Card.Text className="workout-dates">Date Range: {dates}</Card.Text>
            <Card.Text className="workout-time">Time: {time}</Card.Text>
            {/* <div className="buttons">
              <Button className="join-button" onClick={() => handleJoinButton()}>Join</Button>
            </div> */}
          </Card.Body>
        </div>
        <div className="workoutcard-img">
          {/* <img className="card-logo" src={imageURl} alt="Workout"/> */}
        </div>
      </Card>
    )
}

export default WorkoutCard;