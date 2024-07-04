import axios from "axios";
import { BASE_URL } from "./constants";

export async function fetchUsers() {
  try {
    const response = await axios.get(BASE_URL + "/protected/users", {
      // withCredentials: true,
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
