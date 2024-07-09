import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";
import NavBar from "../components/NavBar";
import WorkoutList from "../components/WorkoutList";

function JoinedWorkouts() {
    const navigate = useNavigate();
    const useAppContext = () => useContext(AppContext);
    const { user, setUser } = useAppContext();

    return (
        <div>
            <NavBar />
            <main>
                <div className="workout-header">
                    <u >
                        <strong>Workout List: </strong>
                    </u>
                </div>
                <br></br>
                <br></br>
                <p className="workout-list">
                    <WorkoutList />
                </p>
            </main>
        </div>
    );
}
export default JoinedWorkouts;