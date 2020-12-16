import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import LoggedIn from "../components/LoggedIn"
import Login from "../components/Login"

const Navbar = () => {
  const user = useSelector((state) => state.user)
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <Link to={`/users/${user.id}`}>Profile</Link>
        <Link to="/users">Users</Link>
      </div>

      {user.name !== "" ? <LoggedIn /> : null}
    </div>
  )
}

export default Navbar
