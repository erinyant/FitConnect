import React from "react";
import Stack from 'react-bootstrap/Stack';
import GymCard from "../components/GymCard";
// import Col from 'react-bootstrap/Col';

function GymContainer({user, gyms}) {

    const gym = gyms.map((gym) => {
        return (
            <GymCard key={gym.id} gym={gym}/>
              );
            }
        )

        return (
            <div>
                <Stack className="workout-stack" gap={4}>
                    {gym}
               </Stack>
            </div>
        )
    }

export default GymContainer;