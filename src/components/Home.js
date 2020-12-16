import React, { useEffect, useRef } from "react"
import Blog from "./Blog/Blog"
import Toggleable from "../utilities/Toggleable"
import CreateBlog from "./Blog/CreateBlog"
import { initialize, giveLike, deleteBlog } from "../reducers/blogReducer"
import { changeNotification } from "../reducers/notificationReducer"

import { useDispatch, useSelector } from "react-redux"

const Home = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const createBlogRef = useRef()

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
      <h2>blogs</h2>
      <Toggleable buttonLabel="New Note" ref={createBlogRef}>
        <CreateBlog toggleRef={createBlogRef}></CreateBlog>
      </Toggleable>
      <div className="blogsList">
        {blogs.map((blog) => {
          console.log("user", user)
          console.log("blog", blog)
          return (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={() => handleLike(blog)}
              handleDelete={() => handleDelete(blog)}
              showRemove={user.username === blog.user.username ? true : false}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Home
