import type { Todo } from '../../types/todo'
import { TodoItem } from './TodoItem'

type Props = {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const EmptyList = () => (
  <p className="text-gray-500 w-full items-center flex justify-center py-10 text-center">
    No todos yet
    <br /> Start adding items to your list
  </p>
)

export const TodoList = ({ todos, onToggle, onDelete }: Props) => {
  if (todos.length === 0) return <EmptyList />

  return (
    <ul className="mt-4 space-y-2 w-full p-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}
