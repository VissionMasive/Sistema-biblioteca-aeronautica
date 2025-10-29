const API_URL = "http://localhost:3001/api/books";

export const getBooks = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
};

export const getBookId = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
};

export const createBook = async (book) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

  // intenta leer el body por si la API devuelve mensaje de error
  let body = null;
  try { body = await res.json(); } catch (_) {}

  if (!res.ok) {
    const msg = body?.message || body?.error || `Error ${res.status}: ${res.statusText}`;
    throw new Error(msg);
  }

  return body; // datos creados (o { ok:true })
};

export const requestBook = async (libroId, usuarioId) => {
  const res = await fetch(`${API_URL}/solicitar/${libroId}/${usuarioId}`, {
    method: "POST",
    headers: {"Content-Type": "application/json"}
  })

  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
}

// export async function createBook(payload) {
//   const res = await fetch(`${API_URL}/books`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });
//   const body = await res.json().catch(() => ({}));
//   if (!res.ok) throw new Error(body?.message || body?.error || "Error al crear libro");
//   return body;
// }

export async function updateBook(id, payload) {
  const res = await fetch(`${API}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body?.message || body?.error || "Error al actualizar libro");
  return body;
}
