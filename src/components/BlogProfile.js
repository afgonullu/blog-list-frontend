import React, { useState } from "react"
import {
  Button,
  Form,
  FormGroup,
  Row,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap"
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
      <h4 className="text-primary">by {blog.author}</h4>
      <p className="bg-light text-dark">{blog.url}</p>
      <p className="display-4">
        {blog.likes} likes so far! Wanna Like Too?{" "}
        <Button
          variant="primary"
          className="blog__like-button"
          onClick={handleLike}
        >
          👍 Like
        </Button>
      </p>
      <p className="text-muted">added by -&gt; {blog.user.username}</p>

      {user.username === blog.user.username ? (
        <Button
          variant="danger"
          className="blog__remove-button"
          onClick={handleDelete}
        >
          Remove this entry
        </Button>
      ) : (
        ""
      )}
      <Row className="my-5">
        <h2>comments</h2>
        <Form onSubmit={handleAddComment}>
          <FormGroup className="mb-2">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              id="comment"
              type="comment"
              value={text}
              name="Comment"
              onChange={({ target }) => setText(target.value)}
            />
          </FormGroup>
          <Button className="mb-2" variant="primary" type="submit">
            Add New Comment
          </Button>
        </Form>
        <ListGroup>
          {blog.comments.map((c) => (
            <ListGroupItem key={c.id}>{c.text}</ListGroupItem>
          ))}
        </ListGroup>
      </Row>
    </div>
  )
}

export default BlogProfile
