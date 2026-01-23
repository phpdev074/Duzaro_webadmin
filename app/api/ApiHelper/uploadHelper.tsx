import axios from "axios";
import { BASE_URL, POST, UPLOAD } from "../api";

export const UploadProviderLogo = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios({
        baseURL: BASE_URL,
        method: POST,
        url: UPLOAD, 
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
