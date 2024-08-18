import axios from "axios";

// const APIBaseUrl = process.env.API_BASE_URLa
//const APIBaseUrl = "http://10.86.55.166:3000";
//const APIBaseUrl = "http://10.86.55.143:3000";
const APIBaseUrl = "http://192.168.242.174:3000";

export const getAnnouncements = async () => {
  try {
    const result = await axios.get(`${APIBaseUrl}/announcements`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const addAnnouncements = async (newAnnouncement) => {
  try {
    const response = await axios.post(
      `${APIBaseUrl}/announcements`,
      newAnnouncement
    );
  } catch (error) {
    console.error(error);
  }
};

export const deleteAnnouncements = async (id) => {
  try {
    const response = await axios.delete(`${APIBaseUrl}/announcements/${id}`);
    console.log("Item deleted:", response.data);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};
