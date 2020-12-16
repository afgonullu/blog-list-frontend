import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, setLoggedIn } from "../reducers/userReducer"
import { changeNotification } from "../reducers/notificationReducer"

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedIn(user))
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const credentials = {
        username,
        password,
      }
      dispatch(login(credentials))
      setUsername("")
      setPassword("")
      dispatch(
        changeNotification(
          "success",
          `login successful for ${user.username}`,
          5
        )
      )
    } catch (exception) {
      dispatch(changeNotification("danger", "Wrong credentials", 5))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default Login
