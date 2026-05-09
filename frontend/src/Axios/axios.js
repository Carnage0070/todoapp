import axios from "axios"

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8001/api"

const instance = axios.create({
    baseURL: baseURL
})
export default instance