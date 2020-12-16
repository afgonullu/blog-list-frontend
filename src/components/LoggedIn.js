import React from "react"
import { logout } from "../reducers/userReducer"
import { useDispatch, useSelector } from "react-redux"

const LoggedIn = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logout())
    // setUser(null)
    // window.localStorage.removeItem("loggedBlogListUser")
  }
  return (
    <div>
      <p>{user.name} is logged in.</p>
      <button className="logout" onClick={handleLogout}>
        {" "}
        Log Out
      </button>
    </div>
  )
}

export default LoggedIn
