import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Toggleable from "./utilities/Toggleable"
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

  const createBlogRef = useRef()

  const fetchData = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(blogs)
  }

  useEffect(() => {
    fetchData()
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

  const handleLike = (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }

    blogService.update(blog.id, updatedBlog)

    //update ui components without db fetch
    const updatedBlogs = [...blogs]

    let blogToUpdate = updatedBlogs.find((item) => item.title === blog.title)

    blogToUpdate = { ...blogToUpdate, ...updatedBlog }

    const index = updatedBlogs.findIndex((item) => item.title === blog.title)

    updatedBlogs
      .splice(index, 1, blogToUpdate)
      .sort((a, b) => b.likes - a.likes)

    setBlogs(updatedBlogs)
  }

  return (
    <div>
      <h1>Blog List App by Afg</h1>
      <InfoMessage message={alert.message} alertType={alert.type} />
      <h2>blogs</h2>
      <p>{user.name} is logged in.</p>
      <button onClick={handleLogout}>Log Out</button>
      <Toggleable buttonLabel="New Note" ref={createBlogRef}>
        <CreateBlog
          toggleRef={createBlogRef}
          setAlert={setAlert}
          blogs={blogs}
          setBlogs={setBlogs}
        ></CreateBlog>
      </Toggleable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog)} />
      ))}
    </div>
  )
}

export default App
