import { useEffect, useState, useCallback } from "react";
import * as api from "../api/editorialsApi";

export function useEditorials(initialFetch = true) {
  const [editorials, setEditorials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEditorials = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getEditorials();
      setEditorials(data);
    } catch (err) {
      setError(err.messages || "Error al cargar los autores");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialFetch) fetchEditorials();
  }, [fetchEditorials, initialFetch]);

  return { editorials, loading, error, fetchEditorials}
}

