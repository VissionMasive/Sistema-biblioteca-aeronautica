import { useEffect, useState, useCallback, use } from "react";
import * as api from "../api/authApi"

export function useAuth(initialFetch = true) {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loginUser = useCallback( async (payload) => {
    setLoading(true)
    setError(null)
    try {
      const userLogin = await api.login(payload)
      setUser(userLogin)
      return userLogin
    } catch (err) {
      setError(err.message || "Error al iniciar sesion")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchUsers = useCallback( async (token) => {
    setLoading(true)
    setError(null)
    try {
      const usersData = await api.getUsers(token)
      setUsers(usersData)
      return usersData
    } catch (err) {
      setError(err.message || "Error al obtener usuarios")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchUserById = useCallback( async (token, id) => {
    setLoading(true)
    setError(null)
    try {
      const userData = await api.getUserById(token, id)
      setUser(userData)
      return userData
    } catch (err) {
      setError(err.message || "Error al obtener usuario")
      throw err 
    } finally {
      setLoading(false)
    }
  }, [])

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


  return { user, users, loading, error, loginUser, fetchUsers,  fetchUserById, registerUser }
}