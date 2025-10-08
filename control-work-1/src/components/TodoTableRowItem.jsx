import { useRef } from "react"

const TodoTableRowItem = ({ todoItem, loading, onUpdate, onDelete }) => {
    const clickedRowId = useRef();
    const handleDeleteClick = (id) => {
        clickedRowId.current = id;
        onDelete(id);
    }

  return (
    <tr key={todoItem.id}>
        <td>{todoItem.id}</td>
        <td>{todoItem.todo}</td>
        <td>{todoItem.completed ? 'Completed' : 'Pending'}</td>
        <td>
            <button onClick={() => onUpdate(todoItem.id, { completed: !todoItem.completed })}>
                {todoItem.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => handleDeleteClick(todoItem.id)}>
                {loading && clickedRowId.current === todoItem.id ? "Deleting..." : "Delete"}
            </button>
        </td>
    </tr>
  )
}

export default TodoTableRowItem