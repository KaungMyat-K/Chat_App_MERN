import { axiosInstance } from "./index";

export const getLoggedUser = async()=>{
    try {
        const res = await axiosInstance.get('/api/user/get-logger-user')
        return res.data;
    } catch (error) {
        return error;
    }
}