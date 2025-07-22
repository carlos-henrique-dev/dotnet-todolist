import { useState } from 'react'

type Props = {
  onCreate: (title: string) => void
}

export const TodoForm = ({ onCreate }: Props) => {
  const [newTodo, setNewTodo] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      onCreate(newTodo)
      setNewTodo('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2 border w-full p-2 items-center justify-center rounded-md border-gray-300">
      <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Ex: Buy groceries..." className="px-2 py-1 border-none rounded w-full outline-none" />

      <button type="submit" className="px-10 py-1 bg-green-600 text-white rounded">
        Add
      </button>
    </form>
  )
}
