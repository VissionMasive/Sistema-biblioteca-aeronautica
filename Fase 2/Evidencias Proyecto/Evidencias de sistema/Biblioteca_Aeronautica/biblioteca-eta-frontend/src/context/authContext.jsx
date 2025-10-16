import { createContext, useContext, useState, useEffect, useCallback, use } from "react";
import { useAuth } from "../hooks/useAuth";
import { decodeJwt } from "../utils/jwt";

const STORAGE_USER = "app_user"
const STORAGE_TOKEN = "app_token"

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { loginUser }  = useAuth()

  const [ user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_USER)
      return raw ? JSON.parse(raw) : null
    } catch (err) {
      console.warn("No se puede parsear localstorage user:", err)
      return null
    }
  })


  const [ token, setToken ] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_TOKEN)
    } catch {
      return null
    }
  })


  const [ loading, setLoading] = useState(false)

  const login = useCallback(
    async (credentials) => {
      setLoading(true)
      try {
        const res = await loginUser(credentials)
        const tokenFromRes = res?.token || (res?.raw && res.raw.token)
        const userFromRes = res?.user || (res?.raw && res.raw.user) || res
        if (tokenFromRes) {
          localStorage.setItem(STORAGE_TOKEN, tokenFromRes)
          setToken(tokenFromRes)
        }
        if (userFromRes) {
          localStorage.setItem(STORAGE_USER, JSON.stringify(userFromRes))
          setUser(userFromRes)
        }
        return res
      } finally {
        setLoading(false)
      }
    },
    [loginUser]
  )

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_USER) {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null)
        } catch {
          setUser(null)
        }
      }

      if (e.key === STORAGE_TOKEN) {
        setToken(e.newValue)
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const isAuthenticated = Boolean(token)

  const hasRole = useCallback(
    (role) => {
      if (!token) return false

      if (user && user.role) {
        if (Array.isArray(role)) return role.includes(user.role)
        return user.role === role
      }
      const payload = decodeJwt(token)
      if (!payload) return false

      const tokenRole = payload.role || payload.roles || payload.rol
      if (!tokenRole) return false

      if (Array.isArray(role)) return role.includes(tokenRole)
      return tokenRole === role
    },
    [user, token, isAuthenticated]
  )

  const userId = user?.id ?? (() => {
    if (!token) return null
    const payload = decodeJwt?.(token)
    return payload?.id ?? null
  })()

  return (
    <AuthContext.Provider value={{ user, token, loading, userId, isAuthenticated, login, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}


export function useAuthContext() {
  return useContext(AuthContext)
}