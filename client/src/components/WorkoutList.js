import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";


function WorkoutList() {
    const navigate = useNavigate();
    const useAppContext = () => useContext(AppContext);
    const { user, setUser } = useAppContext();

    const [workoutItems, setWorkoutItems] = useState([])

    useEffect(() => {
        let workoutList = JSON.parse(localStorage.getItem("workoutList")) || []
        setWorkoutItems(workoutList)
    }, [])
    
    const item = workoutItems.map((w) => (
        w.gym_workouts.map((gw) => (
                // <li>{gi.workout?.name} : {gi.weight_of_ingr}{gi.weight_type}</li>
                <li>{gw.id}: {gw.title}, {gw.description}, {gw.category}, {gw.dates}, {gw.time}</li>
        ))
    ));
    
    return (
            <div>
                {item.flat()}  
            </div>
    );
}
export default WorkoutList