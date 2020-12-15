import blogService from "../services/blogs"

export const giveLike = (id, blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, blog)
    dispatch({
      type: "LIKE",
      data: updatedBlog,
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: "ADD",
      data: newBlog,
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const deleted = await blogService.deleteBlog(id)
    console.log(deleted)
    dispatch({
      type: "DELETE",
      data: id,
    })
  }
}

export const initialize = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: "INIT",
      data: blogs,
    })
  }
}

const reducer = (state = [], action) => {
  console.log("ACTION: ", action)
  switch (action.type) {
    case "LIKE":
      const id = action.data.id
      const blog = state.find((item) => item.id === id)
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      return state
        .map((item) => (item.id !== id ? item : updatedBlog))
        .sort((a, b) => b.likes - a.likes)
    case "ADD":
      return [...state, action.data].sort((a, b) => b.likes - a.likes)
    case "DELETE":
      return state
        .filter((item) => item !== action.data.id)
        .sort((a, b) => b.likes - a.likes)
    case "INIT":
      return action.data.sort((a, b) => b.likes - a.likes)
    default:
      return state
  }
}

export default reducer
