import { useEffect, useState } from 'react'
import type { Todo } from '../types/todo'

const API_URL = import.meta.env.VITE_API_URL

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/todos`)
      const data: Todo[] = await res.json()
      setTodos(sortTodos(data))
    } catch (err) {
      console.error('Failed to fetch todos:', err)
    } finally {
      setLoading(false)
    }
  }

  const onCreate = async (title: string) => {
    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })

      if (!res.ok) throw new Error('Failed to create todo')

      const newTodo: Todo = await res.json()
      setTodos((prev) => sortTodos([...prev, newTodo]))
    } catch (err) {
      console.error(err)
    }
  }

  const onToggle = async (id: string) => {
    try {
      const target = todos.find((todo) => todo.id === id)
      if (!target) return

      const updated = { ...target, isCompleted: !target.isCompleted }

      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: updated.title,
          isCompleted: updated.isCompleted,
        }),
      })

      if (!res.ok) throw new Error('Failed to toggle todo')

      setTodos((prev) => sortTodos(prev.map((todo) => (todo.id === id ? updated : todo))))
    } catch (err) {
      console.error(err)
    }
  }

  const onDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete todo')

      setTodos((prev) => sortTodos(prev.filter((todo) => todo.id !== id)))
    } catch (err) {
      console.error(err)
    }
  }

  const sortTodos = (list: Todo[]) => list.slice().sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted))

  return {
    todos,
    loading,
    onCreate,
    onToggle,
    onDelete,
  }
}
