import api from "../../Utils/BaseUrl";

export const getAllRequests = async () => {
  try {
    const response = await api.get("/requestTracking/getAll");
    return response.data;
  } catch (error) {
    console.error("Error getting all requests", error);
  }
};
