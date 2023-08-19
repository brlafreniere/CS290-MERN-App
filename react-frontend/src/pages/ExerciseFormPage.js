import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const flexRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '2em'
}

const paddedStyle = {
  padding: '3em'
}

const formStyle = {
  backgroundColor: 'white',
  border: '1px solid black'
}

function ExerciseFormPage(props) {
  const { _id } = useParams()

  const [exercise, setExercise] = useState({name: "", reps: "", weight: "", unit: "", date: ""})
  const navigate = useNavigate()

  useEffect(() => {
    if (_id) {
      fetch(`/exercises/${_id}`).then(response => response.json()).then(json => setExercise(json))
    }
  }, [])

  async function submitForm() {
    const method = _id ? "PUT" : "POST"
    const url = _id ? `/exercises/${_id}` : '/exercises'
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...exercise, reps: Number(exercise.reps), weight: Number(exercise.weight)})
    }

    const response = await fetch(url, options)

    if (response.status === 201 || response.status === 200) {
      alert("Exercise successfully saved.")
    } else {
      alert("Failed to save exercise.")
    }

    navigate('/') // useHistory renamed to useNavigate in react-router-dom v6.x
  }

  return (
    <div>
      <h1>{_id ? "Edit" : "Create"} Exercise</h1>
      <hr />
      <form style={{...formStyle, ...paddedStyle}}>
        <div className="inputs" style={flexRow}>
          <div>
            <label>Name: </label>
            <input
              value={exercise.name}
              onChange={(event) => setExercise({...exercise, name: event.target.value})}
              type="text" className="form-control" />
          </div>
          <div>
            <label>Reps: </label>
            <input
            value={exercise.reps}
            onChange={(event) => setExercise({...exercise, reps: event.target.value})}
            type="text" className="form-control" />
          </div>
          <div>
            <label>Weight: </label>
            <input
            value={exercise.weight}
            onChange={(event) => setExercise({...exercise, weight: event.target.value})}
            type="text" className="form-control" />
          </div>
          <div>
            <label>Unit: </label>
            <select
            value={exercise.unit}
            onChange={(event) => setExercise({...exercise, unit: event.target.value})}
            type="text" className="form-control" style={{}}>
              <option value="kgs">kgs</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
          <div>
            <label>Date: </label>
            <input
            value={exercise.date}
            onChange={(event) => setExercise({...exercise, date: event.target.value})}
            type="text" className="form-control" />
          </div>
        </div>
        <div>
          <button
          onClick={(event) => { event.preventDefault(); submitForm() }}
          className="btn btn-primary form-control mt-3"
          >
            Submit Exercise
          </button>
        </div>
      </form>
    </div>
  )
}

export default ExerciseFormPage