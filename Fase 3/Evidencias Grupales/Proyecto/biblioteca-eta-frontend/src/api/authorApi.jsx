const API_URL = "http://localhost:3001/api/authors";

export const getAuthors = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
};
