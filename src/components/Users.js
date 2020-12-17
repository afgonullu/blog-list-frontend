import React from "react"
import { ListGroup, ListGroupItem, Row, Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <Row className="p-5">
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blog Entries</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
  )
}

export default Users
