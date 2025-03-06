import { axiosInstance } from "./index";

export const createNewMessage = async (message) => {
  try {
    const res = await axiosInstance.post("/api/message/new-message", message);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getAllMessages = async (chatId) => {
  try {
    const res = await axiosInstance.get(
      `/api/message/get-all-messages/${chatId}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
