'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/lib/api/auth";
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            await registerUser(name, email, password);
            router.push("/login")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.message || "Signup failed. Please try again.")
        } finally {
            setLoading(false);
        }
    }

    return <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/30">
            <Card className="w-full m-4 md:w-[25%] max-w-2xl p-6 md:p-10 rounded-3xl shadow-xl border border-primary/10 bg-card/90 backdrop-blur-sm">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-1 tracking-tight">
                    Sign Up
                    </h1>
                    <p className="text-base text-muted-foreground font-medium">
                    Create your account to start your journey with Aura.
                    </p>
                </div>

                {/* form component */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        <div>
                            <label htmlFor="text" className="block text-base font-semibold ">
                                Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                                <Input 
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    className="pl-12 py-2 text-base rounded-lg bg-card bg-opacity-80 border border-primary focus:outline-none focus:ring-1 focus:ring-primary  placeholder:text-muted-foreground"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-base font-semibold ">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                                <Input 
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="pl-12 py-2 text-base rounded-lg bg-card bg-opacity-80 border border-primary focus:outline-none focus:ring-1 focus:ring-primary  placeholder:text-muted-foreground"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-base font-semibold">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                                <Input 
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="pl-12 py-2 text-base rounded-lg bg-card bg-opacity-80 border border-primary focus:outline-none focus:ring-1 focus:ring-primary  placeholder:text-muted-foreground"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-base font-semibold">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                                <Input 
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    className="pl-12 py-2 text-base rounded-lg bg-card bg-opacity-80 border border-primary focus:outline-none focus:ring-1 focus:ring-primary  placeholder:text-muted-foreground"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                        {/* button */}
                        <Button type="submit" size="lg" className="w-full py-2 text-base rounded-lg font-bold bg-gradient-to-r from-primary to-primary/80 shadow-md hover:from-primary/80 hover:to-primary" >
                            {loading ? "Signing Up..." : "Sign Up"}
                            
                        </Button>
                </form>

                {/* footer */}
                <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="text-muted-foreground">
                        Already have an account?
                    </span>
                    <Link
                        href="/login"
                        className="text-primary font-semibold hover:underline" 
                    >
                        Sign in
                    </Link>
                
                </div>
            </Card>

        
    </div>
}