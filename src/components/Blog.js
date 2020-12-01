import React, { useState } from "react"

const Blog = ({ blog, handleLike }) => {
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
      <div>
        <span>TITLE: {blog.title}</span>
        <button onClick={() => setDetailsVisibility(!isDetailsVisible)}>
          {isDetailsVisible ? "Hide" : "Show"}
        </button>
      </div>
      <div style={detailsStyle}>
        <p>author: {blog.author}</p>
        <p>url: {blog.url}</p>
        <p>
          likes: {blog.likes} <button onClick={handleLike}>Like</button>
        </p>
      </div>
    </div>
  )
}

export default Blog
