import Stack from 'react-bootstrap/Stack';
import NavBar from "./NavBar";

function About() {
  return (
    <div id="about">
        <NavBar />
        <header className="about">
            Get Your Sweat On
        </header>
        <div className="container">
            <div className="left-div">
                <h2>Explore Your Fitness Options</h2>
                <p>FitConnect is your connection to fitness in your neighborhood.  
                    Search workouts and fitness centers nearby to find something 
                    that speaks to you. Whether it is a tried and true workout,
                    or something totally new, FitConnect lets you explore numerous
                    options to get your sweat on. </p>
                <br></br>
                {/* <h2>Placehold</h2>
                <p>Just search a fitness center or category, and you can book a spot
                    for your next workout.
                </p> */}
                <p>
                    Stay tuned: Blog coming soon!
                </p>
            </div>
        </div>
    </div>
    )
}

export default About;