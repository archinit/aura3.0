'use client'

import Link from "next/link"
import { AudioWaveform, LogOut, Menu, MessageCircle, X } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { SignInButton } from "./SignInButton"
import { useState } from "react"
import { Button } from "./ui/button"
import { useSession } from "@/lib/contexts/session-context"

export const Header = () => {

    const { isAuthenticated, logout } = useSession();

    const navItems = [
        { href: "/features", label:"Features" },
        { href: "/about", label:"About" },
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return <div className=" w-[90%] md:w-[50%] fixed top-3 left-6 md:left-3/12 rounded-4xl z-50 backdrop-blur-lg">
        <div className="absolute inset-0 border border-primary/30 rounded-4xl bg-background/5 "></div>
        <header className="relative max-w-full px-5 md:px-10 ">
            <div className="flex h-16 items-center justify-between" >      {/*logo*/}
                <Link
                href="/"
                className="flex items-center space-x-2 transition-opacity hover:opacity-60"
                >
                    <AudioWaveform className="h-8 w-8 text-primary"/>
                    <div className="flex flex-col">
                        <span className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">Aura3.0</span>
                    </div>
                </Link>

                {/* navitems */}
                <div className="flex items-center gap-4">
                    <nav className="hidden md:flex items-center space-x-1">
                        {navItems.map((item)=>{
                            return (
                                <Link
                                key={item.href}
                                href={item.href}
                                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group" 
                                >
                                    {item.label}
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left">
                                    </span>
                                </Link>
                            )
                        })}
                    </nav>
                    <div className="flex items-center gap-3">
                        <ThemeToggle/>

                        {isAuthenticated ? (
                            <>
                            <Button asChild className="hidden md:flex gap-2 bg-primary/90 hover:bg-primary" >
                                <Link href="/therapy/new">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                    Start Chat
                                </Link>
                            </Button>

                            <Button
                                variant="outline"
                                onClick={logout}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <LogOut className="w-4 h-4 mr-2"/>
                                    Sign out
                                
                            </Button>
                            </>
                        ) : (
                            <SignInButton/>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen) }
                        >
                            {isMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5"/>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </header>
        {/* mobilemenu */}
        {isMenuOpen && (
            <div className="md:hidden border-t border-primary/10 relative">
                <nav className="flex flex-col space-y-1 py-4">
                    {navItems.map((item) => (
                        <Link
                                key={item.href}
                                href={item.href}
                                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-md transition-colors" 
                                >
                                    {item.label}
                                </Link>
                    ))}
                </nav>
            </div>
        )}
    </div>
}