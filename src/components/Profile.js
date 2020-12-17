import React from "react"
import { ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { useSelector } from "react-redux"

const Profile = (props) => {
  const blogs = useSelector((state) => state.blogs)

  if (!props.profile) {
    return null
  }
  return (
    <Row className="p-5">
      <h2>{props.profile.username}'s blog entries</h2>
      <ListGroup>
        {blogs
          .filter((blog) => {
            return blog.user.username === props.profile.username
          })
          .map((blog) => (
            <ListGroupItem key={blog.id}>{blog.title}</ListGroupItem>
          ))}
      </ListGroup>
    </Row>
  )
}

export default Profile
