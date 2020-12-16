import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { giveLike, deleteBlog } from "../reducers/blogReducer"
import { createComment } from "../reducers/blogReducer"
import { changeNotification } from "../reducers/notificationReducer"

const BlogProfile = ({ blog }) => {
  const [text, setText] = useState("")
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleAddComment = async (event) => {
    event.preventDefault()

    try {
      const newComment = {
        text,
      }
      dispatch(createComment(blog.id, newComment))
      // dispatch(
      //   changeNotification(
      //     "success",
      //     `New Blog is Created: ${title} by ${author}`,
      //     5
      //   )
      // )
      setText("")
    } catch (error) {
      // dispatch(
      //   changeNotification("danger", "All Fields must be properly filled.", 5)
      // )
    }
  }

  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    dispatch(giveLike(blog.id, updatedBlog))
    dispatch(changeNotification("success", `we also like ${blog.title}`, 5))
  }

  const handleDelete = () => {
    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>author: {blog.author}</p>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes so far! Wanna Like Too?{" "}
        <button className="blog__like-button" onClick={handleLike}>
          Like
        </button>
      </p>
      <p>added by -&gt; {blog.user.username}</p>

      {user.username === blog.user.username ? (
        <button className="blog__remove-button" onClick={handleDelete}>
          Remove
        </button>
      ) : (
        ""
      )}
      <div>
        <h2>comments</h2>
        <form onSubmit={handleAddComment}>
          <div>
            text:
            <input
              id="comment"
              type="comment"
              value={text}
              name="Comment"
              onChange={({ target }) => setText(target.value)}
            />
          </div>
          <button type="submit">Add New Comment</button>
        </form>
        <ul>
          {blog.comments.map((c) => (
            <li key={c.id}>{c.text}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogProfile
