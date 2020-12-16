import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom"
import { initializeUsers } from "./reducers/usersReducer"
import { initialize } from "./reducers/blogReducer"
import Home from "./components/Home"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Users from "./components/Users"
import InfoMessage from "./components/InfoMessage"
import BlogProfile from "./components/BlogProfile"
import NavBar from "./utilities/Navbar"
import Footer from "./utilities/Footer"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  const userMatch = useRouteMatch("/users/:id")
  const userProfile = userMatch
    ? users.find((user) => {
        return user.id === userMatch.params.id
      })
    : null

  const blogMatch = useRouteMatch("/blogs/:id")
  const blogProfile = blogMatch
    ? blogs.find((blog) => {
        return blog.id === blogMatch.params.id
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
      <div className="NavBar">
        <NavBar />
      </div>
      <InfoMessage message={alert.message} alertType={alert.type} />

      <Switch>
        <Route path="/users/:id">
          <Profile profile={userProfile} />
        </Route>
        <Route path="/blogs/:id">
          {blogProfile ? (
            <BlogProfile blog={blogProfile} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/users">{user.name !== "" ? <Users /> : <Login />}</Route>
        <Route path="/">{user.name !== "" ? <Home /> : <Login />}</Route>
      </Switch>
      <div className="Footer">footer</div>
    </div>
  )
}

export default App
