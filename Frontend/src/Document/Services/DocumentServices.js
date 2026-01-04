import api from "../../Utils/BaseUrl";

export const postFile = async (file, typeCredit, creditId) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("typeCredit", typeCredit);

    const response = await api.post(`/document/post/${creditId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting file", error);
  }
};

export const downloadDocument = async (documentId, fileName) => {
  try {
    const response = await api.get(`/document/${documentId}`, {
      responseType: "blob",
    });

    const url = URL.createObjectURL(response.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    return response.data;
  } catch (error) {
    console.error("Error downloading document", error);
  }
};
