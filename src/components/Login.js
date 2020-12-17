import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, setLoggedIn } from "../reducers/userReducer"
import { changeNotification } from "../reducers/notificationReducer"
import { Button, Form } from "react-bootstrap"

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
    <Form className="p-2" onSubmit={handleLogin}>
      <h2 className="mb-2">Log in to application</h2>
      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          id="username"
          type="text"
          value={username}
          name="Username"
          placeholder="Enter username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
        />
      </Form.Group>
      <Button
        className="mb-2"
        variant="primary"
        type="submit"
        id="login-button"
      >
        Submit
      </Button>
    </Form>
  )
}

export default Login
