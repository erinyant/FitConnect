import React from "react";
import NavBar from "../components/NavBar";
import SignUpForm from "../components/SignUpForm";

function SignUp({user, setUser}) {
    return (
    <div>
        <NavBar user={user} setUser={setUser} />
        <main>
       <h1 className="signup-header">Welcome to FitConnect!</h1>
       <h4 className="signup-sub-header">Use the form below to get started.</h4>
       <SignUpForm setUser={setUser} />
       </main>
    </div>
    )
}

export default SignUp;