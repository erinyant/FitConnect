import { setNestedObjectValues } from "formik";
import React, { useState } from "react";

function WorkDropdownFilter({ setWorkouts, workouts}) {
    const [sort, setSort] = useState("");

    function handleChangeFilter(event) {
        const value = event.target.value;  
        setSort(value);
        let sortedWorkouts = []

        switch (value) {
            case 'Workout':
                sortedWorkouts = [...workouts].sort((a, b) => a.workout.name.localeCompare(b.workout.name));
                break;
            case 'Category':
                sortedWorkouts = [...workouts].sort((a, b) =>  a.category.localeCompare(b.category));
                break;
            // case 'Date':
            //     sortedWorkouts = [...workouts].sort((a, b) => new Date(a.dates) - new Date(b.dates));
            //     break;
            default:
                sortedWorkouts = [...workouts];
        }
        setWorkouts(sortedWorkouts)
    }

    return (
        <div className="dropdown">
            <label className="filter" htmlFor="filter">Sort: </label>
            <select className= "select" name="filter" onChange={handleChangeFilter}>
                <option value="">Select</option>
                <option value="Workout">Workout</option>
                <option value="Category">Category</option>
                {/* <option value="Date">Date</option> */}
            </select>
        </div>
    )
}
export default WorkDropdownFilter;