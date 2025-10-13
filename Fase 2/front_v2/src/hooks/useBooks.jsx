import { useEffect, useState, useCallback } from "react";
import * as api from "../api/booksApi"

export function useBooks(initialFetch = true) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchBooks = useCallback( async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getBooks()
      setBooks(data)
    }catch (err) {
      setError(err.message || "Error al cargar los libros")
    } finally {
      setLoading(false)
    }
  }, [])

  const addBook = useCallback( async (payload) => {
    setLoading(true)
    setError(null)
    try {
      const newBook = await api.createBook(payload)
      setBooks((prev) => [...prev, newBook])
      return newBook
    } catch (err) {
      setError(err.message || "Error al crear el libro")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (initialFetch) fetchBooks()
  }, [fetchBooks, initialFetch])

  return { books, loading, error, fetchBooks, addBook}
}