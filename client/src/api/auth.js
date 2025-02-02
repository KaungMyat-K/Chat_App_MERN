import { axiosInstance } from "./index"

export const signupUser = async(user)=>{
    try {
        const res = await axiosInstance.post('/api/auth/signup',user)
        return res.data
    } catch (error) {
        return error
    }
}

export const loginUser = async(user)=>{
    try {
        const res = await axiosInstance.post('/api/auth/login',user)
        return res.data
    } catch (error) {
        return error
    }
}