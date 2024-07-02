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
                    Search workouts and fitness centers to find something 
                    that speaks to you. Whether it is a tried and true workout,
                    or something new, FitConnect lets you explore numerous options
                    to get your sweat on. </p>
                <br></br>
                <h2>Placehold</h2>
                <p>Potential text on how to book classes? </p>
            </div>
        </div>
    </div>
    )
}

export default About;