import { axiosInstance } from "./index";

export const getAllChat = async () => {
  try {
    const res = await axiosInstance.get("/api/chat/get-all-chats");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const createNewChat = async (members) => {
  try {
    const res = await axiosInstance.post("/api/chat/create-new-chat", {
      members,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
