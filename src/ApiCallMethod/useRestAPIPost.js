"use client";
import { useState } from "react";
import axios from "axios";

export function useRestAPIPost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = async (url, payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(url, payload, {
        headers: {
            "Content-Type": "application/json",
        },
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      console.error("API Post Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error, data };
}
