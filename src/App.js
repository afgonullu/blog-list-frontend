import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import { initializeUsers } from "./reducers/usersReducer"
import { initialize } from "./reducers/blogReducer"
import Home from "./components/Home"
import Login from "./components/Login"
import LoggedIn from "./components/LoggedIn"
import Profile from "./components/Profile"
import Users from "./components/Users"
import InfoMessage from "./components/InfoMessage"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  const match = useRouteMatch("/users/:id")
  const profile = match
    ? users.find((user) => {
        console.log(user.id)
        console.log(match.params.id)
        return user.id === match.params.id
      })
    : null

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(initialize())
  }, [dispatch])

  return (
    <div>
      <h1>Blog List App by Afg</h1>
      <div className="NavBar">navbar</div>
      <InfoMessage message={alert.message} alertType={alert.type} />
      {user.name !== "" ? <LoggedIn /> : <Login />}
      <Switch>
        <Route path="/users/:id">
          <Profile profile={profile} />
        </Route>
        <Route path="/users">{user.name !== "" ? <Users /> : <Login />}</Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <div className="Footer">footer</div>
    </div>
  )
}

export default App
