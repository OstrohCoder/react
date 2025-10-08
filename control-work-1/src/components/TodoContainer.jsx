import useTodos from "../hooks/useTodos"
import AddTodoForm from "./AddTodoForm"
import TodoTable from "./TodoTable"

const TodoContainer = () => {
    const { todos, loading, error, addTodo, updateTodo, deleteTodo } = useTodos();

    if(error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <AddTodoForm onSubmit={addTodo}/>
            <TodoTable todos={todos} loading={loading} onUpdate={updateTodo} onDelete={deleteTodo} />
        </div>
    )
}

export default TodoContainer