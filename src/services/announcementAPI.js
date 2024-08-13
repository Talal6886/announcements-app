import axios from "axios";

// const APIBaseUrl = process.env.API_BASE_URLa

const APIBaseUrl = "http://10.86.55.166:3000";

export const getAnnouncements = async () => {
  try {
    const result = await axios.get(`${APIBaseUrl}/announcements`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
