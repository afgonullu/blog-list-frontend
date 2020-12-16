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

const reducer = (
  state = { name: "", token: "", username: "", id: "" },
  action
) => {
  // console.log("ACTION: ", action)
  switch (action.type) {
    case "LOGIN":
      console.log(action.data)
      return action.data
    case "LOGOUT":
      return { name: "", token: "", username: "", id: "" }
    default:
      return state
  }
}

export default reducer
