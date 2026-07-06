import axios from "axios";
import { BASE_URL, GET, CONTACT_US } from "../api";

export const GetContactMessages = ({
  page = 1,
  limit = 100,
}: {
  page?: number;
  limit?: number;
} = {}) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  return axios({
    baseURL: BASE_URL,
    method: GET,
    url: `${CONTACT_US}?page=${page}&limit=${limit}`,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};
