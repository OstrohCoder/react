import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "@/routes/pages/HomePage";
import { Lab1Page } from "@/routes/pages/labs/Lab1Page";
import { Lab2Page } from "@/routes/pages/labs/Lab2Page";
import { TodoListPage } from "@/routes/pages/TodoListPage";
import { Lab3Page } from "./pages/labs/Lab3Page";
import { Lab17Page } from "./pages/labs/Lab17";
import { Labs46Page } from "./pages/labs/Labs4-6Page";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lab1" element={<Lab1Page />} />
      <Route path="/lab2" element={<Lab2Page />} />
      <Route path="/lab3" element={<Lab3Page />} />
      <Route path="/labs4-6" element={<Labs46Page />} />
      <Route path="/lab17" element={<Lab17Page />} />
      <Route path="/todo-list" element={<TodoListPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
