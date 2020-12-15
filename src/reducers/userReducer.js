import loginService from "../services/login"
import blogService from "../services/blogs"

export const setLoggedIn = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)
    dispatch({
      type: "LOGIN",
      data: user,
    })
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    blogService.setToken(user.token)
    window.localStorage.setItem("loggedBlogListUser", JSON.stringify(user))
    dispatch({
      type: "LOGIN",
      data: user,
    })
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogListUser")
    dispatch({
      type: "LOGOUT",
    })
  }
}

const reducer = (state = { name: "", token: "", username: "" }, action) => {
  console.log("ACTION: ", action)
  switch (action.type) {
    case "LOGIN":
      return action.data
    case "LOGOUT":
      return { name: "", token: "", username: "" }
    default:
      return state
  }
}

export default reducer
