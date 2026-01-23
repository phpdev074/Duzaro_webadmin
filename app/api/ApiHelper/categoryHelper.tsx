import axios from "axios";
import { BASE_URL, CATEGORY, GET, POST } from "../api";

export const GetCategory = ({
    page = 1,
    limit = 100,
    search = '',
    categoryType = 'category',
}: {
    page?: number;
    limit?: number;
    search?: string;
    categoryType?: string;
} = {}) => {
    const token =
        localStorage.getItem('admin_token')

    return axios({
        baseURL: BASE_URL,
        method: GET,
        url: `${CATEGORY}?page=${page}&limit=${limit}&search=${encodeURIComponent(
            search
        )}&categoryType=${categoryType}`,
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
};

export const CreateCategory = (payload: {
    name: string;
    image: string;
    isDefault: boolean;
    categoryType: string;
}) => {
    const token = localStorage.getItem("admin_token");

    return axios({
        baseURL: BASE_URL,
        method: POST,
        url: CATEGORY,
        data: payload,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};