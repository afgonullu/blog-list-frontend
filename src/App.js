import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Toggleable from "./utilities/Toggleable"
import InfoMessage from "./components/InfoMessage"
import CreateBlog from "./components/CreateBlog"
// import blogService from "./services/blogs"
// import loginService from "./services/login"
import { initialize, giveLike, deleteBlog } from "./reducers/blogReducer"
import { changeNotification } from "./reducers/notificationReducer"
import { login, logout, setLoggedIn } from "./reducers/userReducer"
import { useDispatch, useSelector } from "react-redux"

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  // const [user, setUser] = useState(null)
  // const [alert, setAlert] = useState({})

  const createBlogRef = useRef()

  useEffect(() => {
    dispatch(initialize())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedIn(user))
      // setUser(user)
      // blogService.setToken(user.token)
      console.log(user)
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
      // blogService.setToken(user.token)
      // setUser(user)
      // window.localStorage.setItem("loggedBlogListUser", JSON.stringify(user))
      setUsername("")
      setPassword("")
      console.log(user)
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

  const handleLogout = () => {
    dispatch(logout())
    // setUser(null)
    // window.localStorage.removeItem("loggedBlogListUser")
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

  const handleLike = (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    dispatch(giveLike(blog.id, updatedBlog))
    dispatch(changeNotification("success", `we also like ${blog.title}`, 5))
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div>
      <h1>Blog List App by Afg</h1>
      <InfoMessage message={alert.message} alertType={alert.type} />
      <h2>blogs</h2>
      <p>{user.name} is logged in.</p>
      <button className="logout" onClick={handleLogout}>
        Log Out
      </button>
      <Toggleable buttonLabel="New Note" ref={createBlogRef}>
        <CreateBlog
          toggleRef={createBlogRef}
          // setAlert={setAlert}
          // blogs={blogs}
          // setBlogs={setBlogs}
        ></CreateBlog>
      </Toggleable>
      <div className="blogsList">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={() => handleLike(blog)}
            handleDelete={() => handleDelete(blog)}
            showRemove={user.username === blog.user.username ? true : false}
          />
        ))}
      </div>
    </div>
  )
}

export default App
