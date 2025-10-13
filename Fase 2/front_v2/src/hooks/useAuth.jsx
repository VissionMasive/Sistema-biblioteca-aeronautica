import { useEffect, useState, useCallback, use } from "react";
import * as api from "../api/authApi";

export function useAuth(initialFetch = true) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const userLogin = await api.login(payload);
      setUser(userLogin);
      return userLogin;
    } catch (err) {
      setError(err.message || "Error al iniciar sesion");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  const registerUser = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await api.register(payload);
      setUser(newUser);
      return newUser;
    } catch (err) {
      setError(err.message || "Error al registrar usuario");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  return { user, loading, error, loginUser, registerUser};
}
