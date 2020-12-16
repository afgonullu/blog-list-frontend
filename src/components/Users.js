import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Users = () => {
  const users = useSelector((state) => state.users)

  console.log(users)

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.username}>
            <Link to={`/users/${user.id}`}>
              {user.username} / {user.blogs.length}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
