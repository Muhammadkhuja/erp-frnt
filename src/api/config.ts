import axiosInstance from ".";
import { Notification } from "../helpers";

export function apiConfig() {
  async function getRequest(url: string, params: object = {}) {
    try {
      const res = await axiosInstance.get(url, { params });
      return res;
    } catch (err) {
      console.log(err);
      Notification("error", "buuu beckend hatosi siqilma coda hato yoq 😊");
    }
  }
  async function postRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.post(url, body);
      Notification("success", res?.data?.message || "Muvaffaqiyatli");
      return res;
    } catch (err: any) {
      Notification("error", err?.message);
    }
  }
  async function putRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.put(url, body);
      Notification("success", res?.data?.message || "Muvaffaqiyatli");
      return res;
    } catch (err: any) {
      Notification("error", err?.message);
    }
  }
  async function patchRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.patch(url, body);
      Notification("success", res?.data?.message || "Muvaffaqiyatli");
      return res;
    } catch (err: any) {
      Notification("error", err?.message);
    }
  }
  async function deleteRequest(url: string, params: object = {}) {
    try {
      const res = await axiosInstance.delete(url, { params });
      Notification("success", res?.data?.message || "Muvaffaqiyatli");
      return res;
    } catch (err: any) {
      Notification("error", err?.message);
    }
  }
  return {
    getRequest,
    postRequest,
    putRequest,
    patchRequest,
    deleteRequest,
  };
}
