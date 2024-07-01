import Stack from 'react-bootstrap/Stack';
import NavBar from "./NavBar";

function About() {
  return (
    <div id="about">
        <NavBar />
        <header className="about">
            What is Fit Connect?
        </header>
        <div className="container">
            <div className="left-div">
                <h2>Get Your Sweat On</h2>
                <p>FitConnect is your connection to fitness in your area.  
                    Search workouts and fitness centers to find something 
                    that speaks to you.  </p>
                <br></br>
                <h2>Today</h2>
                <p>Whether it is a tried and true workout, or something new,
                    FitConnect lets you explore options in your neighborhood
                    for fitness. </p>
            </div>
        </div>
    </div>
    )
}

export default About;