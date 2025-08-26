import { useState } from "react";
import axios from "axios";

export function useRestAPIGet() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getData = async (url, payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url, payload, {
        headers: {
            "Content-Type": "application/json",
        },
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      console.error("API Get Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { getData, loading, error, data };
}
