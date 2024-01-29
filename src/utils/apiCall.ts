import axios from "axios";

export const apiCall = async (
  endpoint: string,
  method: string,
  body?:{}
) => {
  try {
    const response = await axios({
      method,
      url: endpoint,
      data: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error)
  }
};
