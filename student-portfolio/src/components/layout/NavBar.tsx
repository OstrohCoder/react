import { NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function NavBar() {
  const labs = [
    { path: "/lab1", label: "Lab 1" },
    { path: "/lab2", label: "Lab 2" },
    { path: "/lab3", label: "Lab 3" },
    { path: "/labs4-6", label: "Labs 4-6" },
    { path: "/lab17", label: "Lab 17" }
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <NavLink to="/">About</NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Labs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-2 w-40">
              {labs.map((lab) => (
                <li key={lab.path}>
                  <NavigationMenuLink asChild>
                    <NavLink
                      to={lab.path}
                      className="block rounded-md px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      {lab.label}
                    </NavLink>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <NavLink to="/todo-list">Todo List</NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}