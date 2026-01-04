import api from "../../Utils/BaseUrl";

export const getSimulation = async (simulationData) => {
  try {
    const response = await api.post("/utils/simulation", simulationData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting simulation", error);
  }
};

export const getTotalCost = async (totalCostData) => {
  try {
    const response = await api.post("/utils/totalCost", totalCostData);
    return response.data;
  } catch (error) {
    console.error("Error getting total cost", error);
  }
};
