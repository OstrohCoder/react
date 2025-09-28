# React To-Do App

## Component Tree + Data Flow

App.jsx
│
└── TodoList.jsx   (state: todos [ { id, text } ])
    │ props: —
    │
    ├── AddTodoForm.jsx
    │   props:
    │     onAddTodo(newTask: string)
    │   ↑ callback → TodoList adds new todo
    │
    └── TodoItem.jsx   (state: isCompleted: boolean)
        props:
          task { id, text }
          onDelete(id: number)
        │
        ├── Checkbox → locally changes isCompleted
        └── Delete Button ↑ callback → TodoList deletes todo
