import api from "../config/axios";

export const shortUrl = async (url: string) => {
  try {
    const res = await api.post("/shorten", { url });
    return res;
  } catch (error) {
    throw error || "failed to shorten url";
  }
};

export const testShortenUrl = async (shortUrl: string) => {
  try {
    const res = await api.get(`/r/${shortUrl}`);
    return res;
  } catch (error) {
    throw error || "falied to test url";
  }
};
