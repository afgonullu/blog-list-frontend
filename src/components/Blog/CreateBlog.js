import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { changeNotification } from "../../reducers/notificationReducer"
import { createBlog } from "../../reducers/blogReducer"
import { Button, Form, FormGroup } from "react-bootstrap"

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
    <Form onSubmit={handleCreate}>
      <FormGroup>
        <Form.Label>Title</Form.Label>
        <Form.Control
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Form.Label>Author</Form.Label>
        <Form.Control
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Form.Label>Url</Form.Label>
        <Form.Control
          id="url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </FormGroup>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  )
}

export default CreateBlog
