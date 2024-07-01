import React, {useState, useEffect} from "react";
import NavBar from "../components/NavBar";
import WorkoutCard from "../components/WorkoutCard";
import {useParams} from "react-router-dom"

function Workout({ user, setUser }) {
    let { id } = useParams();
    const [workout, setWorkout] = useState(null)

    useEffect(() => {
        fetch(`/workouts/${id}`)
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                }
                throw Error('Network response was not ok.');
            })
            .then((workoutsData) => setWorkout(workoutsData));
    }, []);

    return (
        <div>
            <NavBar user={user} setUser={setUser} />
            <main>
                <h1 className="workout-gym-header">Workouts</h1>
                <div>
                {workout === null || workout === undefined ? "Loading..." : <WorkoutCard key={workout.id} workout={workout} user={user}/>}
                </div>
            </main>
        </div>
    )
}

export default Workout;