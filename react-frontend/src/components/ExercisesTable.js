import { useEffect, useState } from "react"
import ExerciseRow from "./ExerciseRow"

function ExercisesTable(props) {
  const [exercises, setExercises] = useState([])
  const [reload, setReload] = useState(0)

  async function fetchExercises() {
    const response = await fetch('/exercises')
    const data = await response.json()
    setExercises(data)
  }

  function refreshExercises() { setReload(reload+1) }

  useEffect(() => { fetchExercises() }, [])
  useEffect(() => { fetchExercises() }, [reload])

  if (exercises.length > 0) {
    return (
      <table className="table">
        <thead className="thead">
          <tr>
            <th>Name</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Unit</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map(exercise => <ExerciseRow {...{exercise, refreshExercises}} />)}
        </tbody>
      </table>
    )
  } else {
    return (<p>No exercises yet.</p>)
  }
}

export default ExercisesTable