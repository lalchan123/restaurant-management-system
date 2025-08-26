import axios from "axios";

export default async function restAPIPost(url, payload) {
  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("10 response.data", response.data)
    // return { success: true, data: response.data };
    return  response.data
  } catch (err) {
    console.error("API Post Error:", err);
    // return { success: false, error: err };
    return  err
  } 
};