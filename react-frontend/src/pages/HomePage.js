import { Link } from "react-router-dom"

import ExercisesTable from "../components/ExercisesTable"

function HomePage(props) {
  return (
    <div>
      <h1 className="mb-5">Home Page</h1>
      <nav>
        <Link to='/exercises/create'>Create Exercise</Link>
      </nav>
      <hr />
      <ExercisesTable />
    </div>
  )
}

export default HomePage