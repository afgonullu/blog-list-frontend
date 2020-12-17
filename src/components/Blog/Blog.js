import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { ListGroupItem } from "react-bootstrap"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <ListGroupItem className="blogRow" style={blogStyle}>
      <div className="blog__title-and-author">
        <span>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </span>
      </div>
    </ListGroupItem>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
