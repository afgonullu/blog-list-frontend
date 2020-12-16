import React, { useRef } from "react"
import Blog from "./Blog/Blog"
import Toggleable from "../utilities/Toggleable"
import CreateBlog from "./Blog/CreateBlog"

import { useSelector } from "react-redux"

const Home = () => {
  const blogs = useSelector((state) => state.blogs)

  const createBlogRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <Toggleable buttonLabel="New Note" ref={createBlogRef}>
        <CreateBlog toggleRef={createBlogRef}></CreateBlog>
      </Toggleable>
      <div className="blogsList">
        {blogs.map((blog) => {
          return <Blog key={blog.id} blog={blog} />
        })}
      </div>
    </div>
  )
}

export default Home
