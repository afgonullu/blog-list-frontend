import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import InfoMessage from "./components/InfoMessage"
import CreateBlog from "./components/CreateBlog"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState({})

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem("loggedBlogListUser", JSON.stringify(user))
      setUsername("")
      setPassword("")
      console.log(user)
      setAlert({
        message: `login successful for ${user.username}`,
        type: "success",
      })
      setTimeout(() => {
        setAlert({})
      }, 3000)
    } catch (exception) {
      setAlert({ message: "Wrong credentials", type: "danger" })
      setTimeout(() => {
        setAlert({})
      }, 3000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem("loggedBlogListUser")
  }

  if (user === null) {
    return (
      <div>
        <h1>Blog List App by Afg</h1>
        <InfoMessage message={alert.message} alertType={alert.type} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1>Blog List App by Afg</h1>
      <InfoMessage message={alert.message} alertType={alert.type} />
      <h2>blogs</h2>
      <p>{user.name} is logged in.</p>
      <button onClick={handleLogout}>Log Out</button>
      <CreateBlog setAlert={setAlert} setBlogs={setBlogs}></CreateBlog>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
