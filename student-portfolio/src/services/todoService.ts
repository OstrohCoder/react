import type { Todo } from "@/hooks/useTodos";

export type TodosResponse = {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
};

const BASE_URL = "https://dummyjson.com";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  return res.json() as Promise<T>;
}

export async function fetchTodos(signal?: AbortSignal): Promise<TodosResponse> {
  const res = await fetch(`${BASE_URL}/todos?limit=0`, { signal });
  return handleResponse<TodosResponse>(res);
}

export type CreateTodoPayload = {
  todo: string;
  completed: boolean;
  userId: number;
};

export async function createTodo(
  payload: CreateTodoPayload
): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/todos/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<Todo>(res);
}

export async function updateTodoText(
  id: number,
  text: string
): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todo: text }),
  });
  return handleResponse<Todo>(res);
}

export async function updateTodoCompleted(
  id: number,
  completed: boolean
): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  return handleResponse<Todo>(res);
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });

  await handleResponse<unknown>(res);
}
