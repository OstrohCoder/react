import { useState } from 'react'

const AddTodoForm = ({ onSubmit, loading }) => {
    const [newTodoTitle, setNewTodoTitle] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!newTodoTitle.trim()) return;
        onSubmit({ todo: newTodoTitle, completed: false, userId: 1 });
        setNewTodoTitle("");
    };
    
  return (
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder='New todo' value={newTodoTitle} onChange={(e) => setNewTodoTitle(e.target.value)}/>
        <button type='submit' disabled={loading}>Add todo</button>
    </form>
  )
}

export default AddTodoForm