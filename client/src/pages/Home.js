import React from "react";
import HomeImageCarousel from "../components/HomeImageCarousel";
import NavBar from "../components/NavBar";
import About from "../components/About";

function Home( {user, setUser}) {

    return (
    <div>
        <NavBar user={user} setUser={setUser} />
        <main>
            <HomeImageCarousel />
            <About />
        </main>
    </div>
    )
}

export default Home;