import { MdDelete, MdEditDocument } from 'react-icons/md'
import { Link } from "react-router-dom"

function ExerciseRow(props) {
  const exercise = props.exercise

  async function deleteExercise(_id) {
    const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'})
    props.refreshExercises()
  }

  return (
    <tr key={exercise.id}>
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{exercise.date}</td>
      <td>
        <Link to={`/exercises/${exercise._id}/edit`} style={{color: "black"}}>
          <MdEditDocument />
        </Link>
      </td>
      <td>
        <Link onClick={(event) => deleteExercise(exercise._id)} style={{color: "black"}}>
          <MdDelete />
        </Link>
      </td>
    </tr>
  )
}

export default ExerciseRow