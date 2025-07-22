type Props = {
  id: string
  title: string
  isCompleted: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const TodoItem = ({ id, title, isCompleted, onToggle, onDelete }: Props) => (
  <li className="group flex items-center justify-between px-2 py-4 border-b rounded-md border-gray-200 last-of-type:border-b-0 cursor-pointer hover:shadow-xs hover:bg-gray-200/50" onClick={() => onToggle(id)}>
    <span className="data-[is-completed=true]:line-through data-[is-completed=true]:text-gray-400 font-medium" data-is-completed={isCompleted}>
      {title}
    </span>

    <button
      className="text-gray-500 hover:text-white hover:bg-red-400 p-2 rounded-md transition-colors group-hover:block hidden cursor-pointer"
      onClick={(e) => {
        e.stopPropagation()
        onDelete(id)
      }}
    >
      Delete
    </button>
  </li>
)
