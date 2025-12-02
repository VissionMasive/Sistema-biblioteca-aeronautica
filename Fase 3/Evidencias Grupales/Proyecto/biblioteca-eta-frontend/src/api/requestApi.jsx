const API_URL = "http://localhost:3001/api/requests";

export const getRequests = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
};

export const updateRequest = async (id, payload) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
};

// Obtiene historial de solicitudes por usuario
export async function getUserRequests(userId) {
  const res = await fetch(`${API_URL}/usuario/${userId}`);
  if (!res.ok) throw new Error("Error al obtener el historial del usuario");
  return await res.json();
}

