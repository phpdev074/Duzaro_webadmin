import axios from "axios";
import { ADMIN_PROFILE, BASE_URL, CHANGE_PASSWORD, GET, PATCH, POST } from "../api";

// Get Admin Profile
export const GetAdminProfile = () => {
    const token = localStorage.getItem('admin_token');

    return axios({
        baseURL: BASE_URL,
        method: GET,
        url: ADMIN_PROFILE,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Update Admin Profile (Name, Email, Phone, Image)
export const UpdateAdminProfile = (payload: { name?: string; email?: string; phone?: string; image?: string }) => {
    const token = localStorage.getItem('admin_token');

    return axios({
        baseURL: BASE_URL,
        method: PATCH,
        url: ADMIN_PROFILE,
        data: payload,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Change Admin Password
export const ChangeAdminPassword = (payload: { oldPassword: string; newPassword: string }) => {
    const token = localStorage.getItem('admin_token');

    return axios({
        baseURL: BASE_URL,
        method: POST,
        url: CHANGE_PASSWORD,
        data: payload,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
