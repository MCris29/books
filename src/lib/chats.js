import api from "./api";


export const sendMessage = async (id, data) => {
    const response = await api.post(`/chats/${id}/messages`, data);

    console.log("response", response);

    return response;
};