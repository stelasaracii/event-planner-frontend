import axios from "axios";
import { BASE_URL } from "./constants";

export const fetchRequests = async () => {
  try {
    const response = await axios.get(BASE_URL + "/protected/requests", {
      // withCredentials: true,
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  }
};
