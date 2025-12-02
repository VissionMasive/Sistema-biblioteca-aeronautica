const API_URL = "http://localhost:3001/api/categories";

export const getCategories = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
};
