import React from "react"
import { logout } from "../reducers/userReducer"
import { useDispatch, useSelector } from "react-redux"

const LoggedIn = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <span>
      <span>{user.name} is logged in.</span>
      <button className="logout" onClick={handleLogout}>
        {" "}
        Log Out
      </button>
    </span>
  )
}

export default LoggedIn
