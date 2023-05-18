import Axios from "axios"

const axios = Axios.create({
  baseURL: "https://komorebi-production.onrender.com/",
})

export default axios
