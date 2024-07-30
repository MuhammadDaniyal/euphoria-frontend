import axios from "axios";

type cRate =
  {
    data: {
      USD: number;
      BTC: number;
    }
  }

export const getJson = async (url: string) => {
  const response = await axios.get(url);
  if (response) {
    return response.data;
  } else {
    console.log("error occur");
  }
};

export const getUSD = async () => {
  const response: cRate = await axios.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR");
  if (response) {
    return response.data;
  } else {
    throw new Error("getting usd err");
  }
};

export const postJson = async (url: string, body: any) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;

  } catch (error) {
    throw error

  }
};

export const patchJsonUrl = async (url: string, body: any) => {
  const response = await axios.patch(url, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const patchJson = async (add: string, body: any) => {
  const url = `https://euphoria-backend-production.up.railway.app/api/profile/${add}/status`
  const response = await axios.patch(url, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
