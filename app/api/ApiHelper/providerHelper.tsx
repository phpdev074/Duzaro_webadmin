import axios from "axios";
import { BASE_URL, POST, PROVIDER } from "../api";

export const CreateProvider = (payload: any) =>
    axios({
        baseURL: BASE_URL,
        method: POST,
        url: PROVIDER,
        data: payload,
    });