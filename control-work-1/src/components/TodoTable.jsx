import TodoTableRowItem from "./TodoTableRowItem"

const TodoTable = ({ todos, loading, onUpdate, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {todos.map(item => {
                    return (
                        <TodoTableRowItem
                            key={item.id}
                            todoItem={item}
                            loading={loading}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    );
                })}
            </tbody>
        </table>
    )
}

export default TodoTable