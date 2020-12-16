import React from "react"
import { useSelector } from "react-redux"

const Profile = (props) => {
  const blogs = useSelector((state) => state.blogs)

  if (!props.profile) {
    return null
  }
  return (
    <div>
      <h2>{props.profile.username}'s blog entries</h2>
      <h3>blogs</h3>
      <ul>
        {blogs
          .filter((blog) => {
            return blog.user.username === props.profile.username
          })
          .map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
      </ul>
    </div>
  )
}

export default Profile
