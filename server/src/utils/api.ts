import fetch from "node-fetch";

const api = {
  get: async (url: string) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const err: any = await response.json();
      throw new Error(err);
    }
    return await response.json();
  },

  getHead: async (url: string, head: object) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...head,
      },
    });
    if (!response.ok) {
      const err: any = await response.json();
      throw new Error(err);
    }
    console.log("...head=" + JSON.stringify({ ...head }));
    return await response.json();
  },

  post: async (url: string, data: { [key: string]: string }) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err: any = await response.json();
      throw new Error(err);
    }
    return await response.json();
  },
};

export default api;
