
// "use client";

// import { Moon, Sun } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export function ThemeToggle() {
//   const toggle = () => {
//     const root = document.documentElement;
//     const isDark = root.classList.contains("dark");
//     const nextTheme = isDark ? "light" : "dark";

//     root.classList.toggle("dark", nextTheme === "dark");

//     try {
//       localStorage.setItem("theme", nextTheme);
//     } catch {
//       // localStorage may be unavailable
//     }
//   };

//   return (
//     <Button
//       type="button"
//       variant="outline"
//       size="icon"
//       onClick={toggle}
//       aria-label="Switch between light and dark mode"
//     >
//       <Sun className="hidden size-4 dark:block" />
//       <Moon className="size-4 dark:hidden" />
//     </Button>
//   );
// }

"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    const nextTheme = isDark ? "light" : "dark";

    root.classList.toggle("dark", nextTheme === "dark");

    try {
      localStorage.setItem("theme", nextTheme);
    } catch (error) {
      console.error("Cannot save theme:", error);
    }

    console.log("Theme changed:", nextTheme);
    console.log("HTML classes:", root.className);
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label="Switch between light and dark mode"
    >
      <Sun className="hidden size-4 dark:block" />
      <Moon className="size-4 dark:hidden" />
    </Button>
  );
}
