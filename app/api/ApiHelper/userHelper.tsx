import axios from "axios";
import { BASE_URL, DELETE as DELETE_METHOD, PATCH, POST, USERS } from "../api";

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

export const BlockUser = (userId: string | number) => {
    const token = localStorage.getItem('admin_token');

    return axios({
        baseURL: BASE_URL,
        method: PATCH,
        url: `/admin/users/${userId}/block`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const UnblockUser = (userId: string | number) => {
    const token = localStorage.getItem('admin_token');

    return axios({
        baseURL: BASE_URL,
        method: PATCH,
        url: `/admin/users/${userId}/unblock`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const ToggleBlockUser = (userId: string | number) => {
    const token = localStorage.getItem('admin_token');

    return axios({
        baseURL: BASE_URL,
        method: PATCH,
        url: `/admin/users/${userId}/toggle-block`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const DeleteUser = (userId: string | number) => {
    const token = localStorage.getItem('admin_token');

    return axios({
        baseURL: BASE_URL,
        method: DELETE_METHOD,
        url: `/admin/users/${userId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};