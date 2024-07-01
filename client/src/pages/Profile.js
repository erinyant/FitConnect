import React from "react";
import NavBar from "../components/NavBar"
import ProfileForm from "../components/ProfileForm";

function Profile({ user, setUser }) {
    return (
        <div>
            <NavBar user={user} setUser={setUser} />
            <main>
                <h1 className="profile-header">Your Profile</h1>
                <h4 className="profile-sub-header">Update your profile below.</h4>
                <ProfileForm setUser={setUser} user={user} />
            </main>
        </div>
    )
}

export default Profile;