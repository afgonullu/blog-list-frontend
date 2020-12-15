import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { changeNotification } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"

const CreateBlog = (props) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title,
        author,
        url,
      }
      props.toggleRef.current.toggleVisibility()
      dispatch(createBlog(newBlog))
      dispatch(
        changeNotification(
          "success",
          `New Blog is Created: ${title} by ${author}`,
          5
        )
      )
      setTitle("")
      setAuthor("")
      setUrl("")
    } catch (error) {
      dispatch(
        changeNotification("danger", "All Fields must be properly filled.", 5)
      )
    }
  }

  return (
    <form onSubmit={handleCreate}>
      <div>
        title:
        <input
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          id="url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default CreateBlog
