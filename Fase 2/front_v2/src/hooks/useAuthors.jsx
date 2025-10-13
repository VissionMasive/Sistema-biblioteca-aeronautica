import { useEffect, useState, useCallback } from "react";
import * as api from "../api/authorApi";

export function useAuthors(initialFetch = true) {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAuthors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getAuthors();
      setAuthors(data);
    } catch (err) {
      setError(err.messages || "Error al cargar los autores");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialFetch) fetchAuthors();
  }, [fetchAuthors, initialFetch]);

  return { authors, loading, error, fetchAuthors}
}

