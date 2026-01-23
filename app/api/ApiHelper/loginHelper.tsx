import axios from "axios";
import { BASE_URL, LOGIN, POST } from "../api";

export const LoginAdmin = (payload: any) =>
    axios({
        baseURL: BASE_URL,
        method: POST,
        url: LOGIN,
        data: payload,
    });