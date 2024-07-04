import axios from "axios";
import { BASE_URL } from "./constants";

export const fetchEvents = async () => {
    try {
      const response = await axios.get(BASE_URL + "/protected/events",
      {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  };