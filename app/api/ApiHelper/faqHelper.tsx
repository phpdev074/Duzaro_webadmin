import axios from "axios";
import { BASE_URL, DELETE, GET, PATCH, POST, FAQ } from "../api";

export const GetFaqs = ({
  page = 1,
  limit = 100,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
} = {}) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  return axios({
    baseURL: BASE_URL,
    method: GET,
    url: `${FAQ}?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ""}`,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

export const CreateFaq = (payload: {
  question: string;
  answer: string;
  category: string;
  isPublished: boolean;
}) => {
  const token = localStorage.getItem("admin_token");

  return axios({
    baseURL: BASE_URL,
    method: POST,
    url: FAQ,
    data: payload,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

export const UpdateFaq = (id: string | number, payload: any) => {
  const token = localStorage.getItem("admin_token");

  return axios({
    baseURL: BASE_URL,
    method: PATCH,
    url: `${FAQ}/${id}`,
    data: payload,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

export const DeleteFaq = (id: string | number) => {
  const token = localStorage.getItem("admin_token");

  return axios({
    baseURL: BASE_URL,
    method: DELETE,
    url: `${FAQ}/${id}`,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};
