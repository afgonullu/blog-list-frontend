import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className="blogRow" style={blogStyle}>
      <div className="blog__title-and-author">
        <span>
          <Link to={`/blogs/${blog.id}`}>
            TITLE: {blog.title} by {blog.author}{" "}
          </Link>
        </span>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
