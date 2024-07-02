import React from "react";
import Stack from 'react-bootstrap/Stack';
import WorkoutCard from "../components/WorkoutCard";


function WorkoutsContainer({user, workouts}) {

    const workout = workouts.map((workout) => {
        return (
            <div key={workout.idx}>
                <WorkoutCard key={workout.id} workout={workout} user={user}/>
            </div>
              );
            }
        )

        return (
            <div>
                <Stack className="workout-stack" gap={4}>
                  {workout}
                </Stack>
            </div>
        )
    }
export default WorkoutsContainer;