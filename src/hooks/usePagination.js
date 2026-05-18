import { useState, useCallback } from 'react'

export default function usePagination(fetchFn, initialPage = 0, initialSize = 10) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [size, setSize] = useState(initialSize)

  const load = useCallback(async (pageNum = 0, pageSize = size) => {
    setLoading(true)
    try {
      const result = await fetchFn(pageNum, pageSize)
      setData(result.content || [])
      setTotalPages(result.totalPages || 0)
      setTotalElements(result.totalElements || 0)
      setPage(result.number ?? pageNum)
      setSize(pageSize)
    } finally {
      setLoading(false)
    }
  }, [fetchFn, size])

  const changePage = useCallback((newPage) => {
    load(newPage)
  }, [load])

  const changeSize = useCallback((newSize) => {
    load(0, newSize)
  }, [load])

  return {
    data,
    page,
    totalPages,
    totalElements,
    size,
    loading,
    load,
    setPage: changePage,
    setSize: changeSize,
  }
}