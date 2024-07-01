import React, {useState, useEffect} from "react";
import NavBar from "../components/NavBar";
import WorkoutsContainer from "../components/WorkoutsContainer";
import WorkDropdownFilter from "../components/WorkDropdownFilter";

function Workouts({ user, setUser }) {
    const [workouts, setWorkouts] = useState([])
    useEffect(() => {
        fetch("/workouts")
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                }
                throw Error('Network response was not ok.');
            })
            .then((workoutsData) => setWorkouts(workoutsData));
    }, []);

    return (
        <div>
            <NavBar user={user} setUser={setUser} />
            <main>
                <h1 className="workout-gym-header">Workouts</h1>
                <WorkDropdownFilter setWorkoutss={setWorkouts} workouts={workouts} />
                <WorkoutsContainer user={user} setUser={setUser} workouts={workouts} setWorkouts={setWorkouts} />
            </main>
        </div>
    )
}
export default Workouts;