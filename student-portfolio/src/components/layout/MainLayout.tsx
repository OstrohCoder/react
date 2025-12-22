import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "./NavBar";
import { ModeToggle } from "@/components/mode-toggle";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-4 py-2 flex items-center justify-between">
        <Link to="/" className="font-semibold">
          My Portfolio
        </Link>

        <div className="flex items-center gap-4">
          <NavBar />
          <ModeToggle />
        </div>
      </header>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
