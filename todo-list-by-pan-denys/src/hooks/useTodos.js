import { useState, useEffect } from 'react'

const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
            setLoading(true);

            const response = await fetch(`https://dummyjson.com/todos`);

            const data = await response.json();

            setTodos(data.todos);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
        
    }, []);

    const addTodo = async (todo) => {
        try {
            setLoading(true);

            const response = await fetch(`https://dummyjson.com/todos/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(todo),
            });

            const newTodo = await response.json();
            setTodos((prevTodos) => [...prevTodos, {...newTodo, id: Date.now()}]);
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false);
        }
    };

    const updateTodo = async (id, updatedFields) => {
        try {
            setLoading(true);

            await fetch(`https://dummyjson.com/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFields),
            })

            setTodos((prevTodos) =>
                prevTodos.map((todo) => (todo.id === id ? {...todo, ...updatedFields} : todo))
            );
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false);
        }
    };

    const deleteTodo = async (id) => {
        try {
            setLoading(true);

            await fetch(`https://dummyjson.com/todos/${id}`, {
                method: 'DELETE',
            })

            setTodos((prevTodos) =>
                prevTodos.filter((todo) => (todo.id !== id))
            );
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false);
        }
    };

    return { todos, loading, error, addTodo, updateTodo, deleteTodo }
};

export default useTodos;