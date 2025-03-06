import { axiosInstance } from "./index";

export const createNewMessage = async (message) => {
  try {
    const res = await axiosInstance.post("/api/message/new-message", message);
    return res.data;
  } catch (error) {
    return error;
  }
};
