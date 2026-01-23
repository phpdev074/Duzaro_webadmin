import axios from "axios";
import { BASE_URL, POST, USERS } from "../api";

export const GetUserList = (payload: any) => {
    const token = localStorage.getItem('admin_token');

    return axios({
        baseURL: BASE_URL,
        method: POST,
        url: USERS,
        data: payload,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};