import React, { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, handleLike, showRemove, handleDelete }) => {
  const [isDetailsVisible, setDetailsVisibility] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const detailsStyle = { display: isDetailsVisible ? "" : "none" }

  return (
    <div style={blogStyle}>
      <div className="blog__title-and-author">
        <span>
          TITLE: {blog.title} by {blog.author}{" "}
        </span>
        <button
          className="blog__visibility-button"
          onClick={() => setDetailsVisibility(!isDetailsVisible)}
        >
          {isDetailsVisible ? "Hide" : "Show"}
        </button>
      </div>
      <div className="blog__details" style={detailsStyle}>
        <p>url: {blog.url}</p>
        <p>
          likes: {blog.likes}{" "}
          <button className="blog__like-button" onClick={handleLike}>
            Like
          </button>
        </p>
        {showRemove ? (
          <button className="blog__remove-button" onClick={handleDelete}>
            Remove
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  showRemove: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blog
