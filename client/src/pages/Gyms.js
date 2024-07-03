import React, {useState, useEffect} from "react";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import GymContainer from "../components/GymContainer";


function Gyms({ user, setUser}) {
  
  const [gyms, setGyms] = useState([])

  const [searchGym, setSearchGym] = useState("")

  useEffect(() => {
    fetch("/gyms")
        .then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
            throw Error('Network response was not ok.');
        })
        .then((gymsData) => {
          setGyms(gymsData)
        });
}, []);

  const searchedGyms = gyms.filter((gym) => {
    return (gym.name.toLowerCase().includes(searchGym.toLowerCase()))
  })

  return (
    <>
    <NavBar user={user} setUser={setUser} />
    <main>
      <h1 className="workout-gym-header">Gyms</h1>
        {/* <Search setSearchGym={setSearchGym}/> */}
        <GymContainer gyms={searchedGyms} />
    </main>
    </>
  );
}

export default Gyms;