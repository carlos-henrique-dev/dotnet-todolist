import { PageContainer } from './components/PageContainer'
import { PageTitle } from './components/PageTitle'
import { TodoList } from './components/Todo/TodoList'
import { useTodo } from './hooks/useTodos'
import { Loading } from './components/LoadingPage'
import { TodoForm } from './components/Todo/TodoForm'

function App() {
  const { todos, loading, onCreate, onToggle, onDelete } = useTodo()

  return (
    <PageContainer>
      <PageTitle>Todo List</PageTitle>

      <TodoForm onCreate={onCreate} />

      {loading ? <Loading /> : <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />}
    </PageContainer>
  )
}

export default App
