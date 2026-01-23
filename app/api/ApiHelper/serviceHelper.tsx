import axios from "axios";
import { BASE_URL, GET, SERVICES } from "../api";

export const GetServices = ({ page = 1, limit = 100 }: { page?: number; limit?: number }= {}) =>
    axios({
        baseURL: BASE_URL,
        method: GET,
        url: `${SERVICES}?page=${page}&limit=${limit}`,
    });
