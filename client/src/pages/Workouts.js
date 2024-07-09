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
                } else {
                    throw Error('Network response was not ok.');
                  }
                // throw Error('Network response was not ok.');
            })
            .then((workoutsData) => setWorkouts(workoutsData))
            .catch((error) => {
                // Handle the error here
                console.error(error);
              });
    }, []);

    return (
        <div>
            <NavBar user={user} setUser={setUser} />
            <main>
                <h1 className="workout-gym-header">Workouts</h1>
                <WorkDropdownFilter setWorkouts={setWorkouts} workouts={workouts} />
                <WorkoutsContainer user={user} setUser={setUser} workouts={workouts} setWorkouts={setWorkouts} />
            </main>
        </div>
    )
}
export default Workouts;