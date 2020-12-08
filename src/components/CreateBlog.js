import React, { useState } from "react"
import blogService from "../services/blogs"

const CreateBlog = (props) => {
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
      await blogService.create(newBlog)
      props.setAlert({
        message: `New Blog is Created: ${title} by ${author}`,
        type: "success",
      })
      setTimeout(() => {
        props.setAlert({})
      }, 3000)
      const blogs = await blogService.getAll()
      props.setBlogs(blogs)
      setTitle("")
      setAuthor("")
      setUrl("")
    } catch (error) {
      props.setAlert({
        message: "All Fields must be properly filled.",
        type: "danger",
      })
      setTimeout(() => {
        props.setAlert({})
      }, 3000)
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
