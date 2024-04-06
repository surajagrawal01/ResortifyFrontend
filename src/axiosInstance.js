import axios from "axios"

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config)=>{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmFiZjZlYmIxOTY4OGFlZTg3MDZmMSIsInJvbGUiOiJvd25lciIsImlhdCI6MTcxMTk1MzQ3MywiZXhwIjoxNzEyNTU4MjczfQ.5Jvig6YmFMNpjTzUoJdtTCnlYXmbsbnrwpU_9TgjI74"
    if(token){
        config.headers.Authorization = token
    }
    return config
}, (err)=>{
    Promise.reject(err)
})


export default axiosInstance;