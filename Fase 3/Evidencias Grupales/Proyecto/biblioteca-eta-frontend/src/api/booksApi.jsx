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

// 🔄 Crear libro usando FormData (texto + archivo)
export const createBook = async (book, coverFile) => {
  const formData = new FormData();

  // Campos de texto
  Object.entries(book).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  // Archivo de portada
  if (coverFile) {
    formData.append("cover", coverFile); // 👈 mismo nombre que en multer.single("cover")
  }

  const res = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  let body = null;
  try {
    body = await res.json();
  } catch (_) {}

  if (!res.ok) {
    const msg =
      body?.message || body?.error || `Error ${res.status}: ${res.statusText}`;
    throw new Error(msg);
  }

  return body; // { message, libro }
};

export const requestBook = async (libroId, usuarioId) => {
  const res = await fetch(`${API_URL}/solicitar/${libroId}/${usuarioId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
};

export async function updateBook(id, payload) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok)
    throw new Error(
      body?.message || body?.error || "Error al actualizar libro"
    );
  return body;
}
