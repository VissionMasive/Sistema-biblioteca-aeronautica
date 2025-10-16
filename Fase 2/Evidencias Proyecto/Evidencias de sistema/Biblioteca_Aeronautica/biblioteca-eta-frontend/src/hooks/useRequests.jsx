import { useEffect, useState, useCallback } from "react"
import * as api from "../api/requestApi"

export default function useRequests(initialFetch = true) {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRequests = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getRequests()
      setRequests(data)
      return data
    } catch (err) {
      setError(err.message || "Error al hacer fetch de las solicitudes")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if(initialFetch) fetchRequests()
  }, [fetchRequests, initialFetch])

  return { requests, loading, error, fetchRequests }
}


