import { Link } from "react-router-dom"

const HomeHelper = () => {
  return (
    <div>
         <Link to="/register">Register</Link>
        <Link to="/directory">Directory</Link>
        <Link to="/help">Help</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/chat">Chat</Link>
    </div>
  )
}

export default HomeHelper