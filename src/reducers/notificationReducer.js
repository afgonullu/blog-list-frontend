const reducer = (state = { type: "", message: "" }, action) => {
  // console.log("ACTION: ", action)

  switch (action.type) {
    case "NOTIFY":
      return action.message
    case "CLEAR":
      return ""
    default:
      return state
  }
}

let timeOut

const fireNewNotification = (dispatch, t) => {
  clearTimeout(timeOut)
  timeOut = setTimeout(() => {
    dispatch(clearNotification())
  }, t * 1000)
}

const clearNotification = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR",
    })
  }
}

export const changeNotification = (type, message, timeout) => {
  return (dispatch) => {
    dispatch({
      type: "NOTIFY",
      message: { type, message },
    })
    fireNewNotification(dispatch, timeout)
  }
}

export default reducer
