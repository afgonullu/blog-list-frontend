import axios from "axios"
const baseUrl = "/api/blogs"

const create = async (blogId, newObject) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, newObject)
  return response.data
}

const getAll = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}/comments`)
  return response.data
}

export default { getAll, create }
