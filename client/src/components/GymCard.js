import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Router, Link } from "react-router-dom";
import Logo2 from "../assets/Logo2.png";

function GymCard({gym}) {
  const {name, website, category, workouts} = gym
  console.log(gym)

  const workout = workouts.map((workout) => {
    return (<div key={workout.id}>
      <Link  to={`../workouts/${workout.id}`} >{workout.title}</Link>
    </div>)
  })

    return (
      <Card className="gym-card"> 
        <Card.Header className="card-header" as="h5">{name}</Card.Header>
        <div className="gymcard-text">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Workouts Available:</Card.Text>
          <div className="gym-workouts">{workout}</div>
          <br></br>
          <Card.Text className="gym-website">{website}</Card.Text>
          <Card.Text className="gym-category">Type: {category}</Card.Text>
          <div className="buttons">
          </div>
        </Card.Body>
        </div>
        <div className="workoutcard-img">
          <img className="card-logo" src={Logo2} alt="Workout"/>
        </div>
      </Card>
    )
}

export default GymCard;