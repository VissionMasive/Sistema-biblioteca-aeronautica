import { useEffect, useState, useCallback } from "react";
import * as api from "../api/categoryApi";

export function useCategory(initialFetch = true) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message || "Error al cargar las categorias");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialFetch) fetchCategories();
  }, [fetchCategories, initialFetch]);

  return { categories, loading, error, fetchCategories };
}
