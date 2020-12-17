import React, { useRef } from "react"
import Blog from "./Blog/Blog"
import Toggleable from "../utilities/Toggleable"
import CreateBlog from "./Blog/CreateBlog"

import { useSelector } from "react-redux"
import { ListGroup, Row, ListGroupItem } from "react-bootstrap"
import { Link } from "react-router-dom"

const Home = () => {
  const blogs = useSelector((state) => state.blogs)

  const createBlogRef = useRef()

  return (
    <Row>
      <h2>blogs</h2>
      <Toggleable className="my-5" buttonLabel="New Note" ref={createBlogRef}>
        <CreateBlog toggleRef={createBlogRef}></CreateBlog>
      </Toggleable>
      <ListGroup className="blogsList my-5">
        {blogs.map((blog) => {
          return (
            <ListGroupItem key={blog.id} blog={blog}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </ListGroupItem>
          )
        })}
      </ListGroup>
    </Row>
  )
}

export default Home
