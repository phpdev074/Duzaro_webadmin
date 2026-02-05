import axios from "axios";
import { BASE_URL, CATEGORY, DELETE, GET, POST, PUT, SERVICES, SUB_SERVICES, UPDATE_DELETE_SUB_SERVICES } from "../api";

export const GetServices = ({
    page = 1,
    limit = 100,
    search = '',
    categoryType = 'services',
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

export const Get_SubServices = ({
    page = 1,
    limit = 100,
    search = '',
    categoryType = 'category',
    services = '',
}: {
    page?: number;
    limit?: number;
    search?: string;
    categoryType?: string;
    services?: string;
} = {}) => {
    const token =
        localStorage.getItem('admin_token')

    return axios({
        baseURL: BASE_URL,
        method: GET,
        url: `${SUB_SERVICES}?page=${page}&limit=${limit}&search=${encodeURIComponent(
            search
        )}&categoryType=${categoryType}&subCatType=${services}`,
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
};

export const CreateSubService = (payload: any) =>
    axios({
        baseURL: BASE_URL,
        method: POST,
        url: "/sub-category",
        data: payload,
    });

export const DeleteSubService = (id: string) => {
    const token = localStorage.getItem("admin_token");

    return axios({
        baseURL: BASE_URL,
        method: DELETE,
        url: `${UPDATE_DELETE_SUB_SERVICES}/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const UpdateSubService = (id: string, payload: any) => {
    const token = localStorage.getItem("admin_token");

    return axios({
        baseURL: BASE_URL,
        method: PUT,
        url: `${UPDATE_DELETE_SUB_SERVICES}/${id}`,
        data: payload,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};