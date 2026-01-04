import api from "../../Utils/BaseUrl";

export const postFinanceEvaluation = async (
  creditId,
  FinanceEvaluationData
) => {
  try {
    const response = await api.post(
      `/financialEvaluation/post/${creditId}`,
      FinanceEvaluationData
    );
    return response.data;
  } catch (error) {
    console.error("Error posting finance evaluation", error);
  }
};

export const updatefinanceEvaluation = async (
  creditId,
  financialEvaluationId,
  financialEvaluationData
) => {
  try {
    const response = await api.put(
      `/financialEvaluation/update/${creditId}/${financialEvaluationId}`,
      financialEvaluationData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating finance evaluation", error);
  }
};

export const getDebtToIncomeRatioCalculation = async (debtToIncomeData) => {
  try {
    const response = await api.post(
      "/utils/debtToIncomeRatio",
      debtToIncomeData
    );
    return response.data;
  } catch (error) {
    console.error("Error getting debt to income ratio", error);
  }
};

export const maxAmount = async () => {
  try {
    const response = await api.post("/utils/totalCost");
    return response.data;
  } catch (error) {
    console.error("Error getting max amount", error);
  }
};
