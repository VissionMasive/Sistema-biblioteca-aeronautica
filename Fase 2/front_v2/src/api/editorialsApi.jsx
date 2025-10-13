const API_URL = "http://localhost:3001/api/editorials";

export const getEditorials = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
};
