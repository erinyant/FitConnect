import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Workouts from "../pages/Workouts";
import Workout from "../pages/Workout";
import Gyms from "../pages/Gyms";
import { AppContext } from "../context/Context";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    {
      fetch("/check_session")
        .then((resp) => {
          if (resp.ok) {
             return resp.json()
          }
        }).then((user) => {
          console.log(user)
          setUser(user)
        });
    }
  }, []);

return (
  <>
    <AppContext.Provider
      value={{user, setUser}}
    >
      <div>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} user={user}/>} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path="/workouts" element={<Workouts setUser={setUser} user={user} />}/>
          <Route path="/workouts/:id" element={<Workout setUser={setUser} user={user} />}/>
          <Route path="/gyms" element={<Gyms setUser={setUser} user={user} />} />
          <Route path="/signup" element={<SignUp setUser={setUser} user={user}/>} />
        </Routes>
      </div>
    </AppContext.Provider>
  </>
);
}

export default App;