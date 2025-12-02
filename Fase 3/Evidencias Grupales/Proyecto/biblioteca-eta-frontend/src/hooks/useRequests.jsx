import { useEffect, useState, useCallback } from "react";
import * as api from "../api/requestApi";

export default function useRequests(initialFetch = true) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const data = await api.getRequests();
      setRequests(data);
      return data;
    } catch (err) {
      setError(err.message || "Error al obtener las solicitudes");
    } finally {
      setLoading(false);
    }
  }, []);

  // 👇 NUEVO: historial por usuario
  const fetchUserRequests = useCallback(async (userId) => {
    setLoading(true); setError(null);
    try {
      const data = await api.getUserRequests(userId);
      setRequests(data);
      return data;
    } catch (err) {
      setError(err.message || "Error al obtener el historial del usuario");
    } finally {
      setLoading(false);
    }
  }, []);

  const requestUpdate = useCallback(async (id, payload) => {
    setLoading(true); setError(null);
    try {
      const data = await api.updateRequest(id, payload);
      return data;
    } catch (err) {
      setError(err.message || "Error al actualizar la solicitud");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialFetch) fetchRequests();
  }, [fetchRequests, initialFetch]);

  return { requests, loading, error, fetchRequests, fetchUserRequests, requestUpdate };
}
