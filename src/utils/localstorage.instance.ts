export const getDataFromLocalStorage = (key: any) => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        return null;
      }
    }
  }
  return null;
};

export const setDataInLocalStorage = (key: any, data: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};
export const removeDataFromLocalStorage = (key: any) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
