import React from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/users/:id">Profile</Link>
      <Link to="/users">Users</Link>
    </div>
  )
}

export default Navbar
