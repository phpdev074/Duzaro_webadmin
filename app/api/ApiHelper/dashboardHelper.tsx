import axios from "axios";
import { BASE_URL, DASHBOARD, GET } from "../api";

export const GetDashboardData = () => {
    const token = localStorage.getItem('admin_token');

    return axios({
        baseURL: BASE_URL,
        method: GET,
        url: DASHBOARD,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};