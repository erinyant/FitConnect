import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import { faker } from '@faker-js/faker';
import { useNavigate } from "react-router-dom";
import Logo2 from "../assets/Logo2.png";

function WorkoutCard({user, workout}) {
    const {title, description, category, dates, time, gym} = workout
    const navigate = useNavigate();
    const [inWorkoutList, setInWorkoutList] = useState(false);

    function handleJoinButton() {
        if( user === null || user === undefined){
          alert ("User must be logged in.")
          return ;
        }
        navigate(`/workouts/${workout.id}`)
    }

    useEffect(() => {
      let workoutList = JSON.parse(localStorage.getItem("workoutList")) || [];
      setInWorkoutList(workoutList.some((w) => w.id === workout.id));
    }, []);

    function handleJoinClick() {
      let workoutList = JSON.parse(localStorage.getItem("workoutList")) || [];
      if (!inWorkoutList) {
        const workoutCard = workout;
        workoutList.push(workoutCard);
        localStorage.setItem("workoutList", JSON.stringify(workoutList));
      } else {
        let indexOfWorkout = workoutList.findIndex((w) => w.id === workout.id);
        workoutList.splice(indexOfWorkout, 1);
        localStorage.setItem("workoutList", JSON.stringify(workoutList));
      }
      setInWorkoutList(!inWorkoutList);
    }

    return (
      <Card className="workout-card">
        <Card.Header className="card-header" as="h5">{gym.name}</Card.Header>
        <div className="workoutcard-text">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text className="workout-description">{description}</Card.Text>
            <Card.Text className="work-category">Category: {category}</Card.Text>
            <Card.Text className="workout-dates">Date: {dates}</Card.Text>
            {/* <Card.Text className="workout-time">Time: {time}</Card.Text> */}
            <div className="buttons">
              <Button className="join-button" onClick={() => handleJoinButton()}>Join</Button>
            </div>
          </Card.Body>
        </div>
        <div className="workoutcard-img">
          <img className="card-logo" src={Logo2} alt="Workout"/>
        </div>
      </Card>
    )
}

export default WorkoutCard;