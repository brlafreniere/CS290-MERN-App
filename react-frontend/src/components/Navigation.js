import { Link } from "react-router-dom"

function Navigation(props) {
  return (
    <nav>
      <ul>
        <li><Link to="">Home Page</Link></li>
        <li><Link to="/exercises/create">Create Exercise</Link></li>
      </ul>
    </nav>
  )
}

export default Navigation