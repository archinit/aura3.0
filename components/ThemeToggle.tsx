'use client'

import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {

    const { theme, setTheme } = useTheme();

    return (
        <Button 
            variant="ghost"
            size="icon"
            onClick={()=> setTheme(theme === "light" ? "dark" : "light")}
        >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0 "/>
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-90"/>
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}