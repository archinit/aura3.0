'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock, Mail } from "lucide-react";
import { loginUser } from "@/lib/api/auth";
import { useSession } from "@/lib/contexts/session-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {checkSession} = useSession();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("")

        try {
            const res = await loginUser(email, password);

            localStorage.setItem("token", res.token);

            await checkSession();

            await new Promise((resolve) => {
                setTimeout(resolve, 100);
            });

            router.push("/dashboard");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err:any) {
            setError(err instanceof Error ? err.message : "invalid email or password. Please try again")
        } finally {
            setLoading(false)
        }
    }

    return <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/30">
            <Card className="w-full m-4 md:w-[25%] max-w-2xl p-6 md:p-10 rounded-3xl shadow-xl border border-primary/10 bg-card/90 backdrop-blur-md">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-1 tracking-tight">
                    Sign In
                    </h1>
                    <p className="text-base text-muted-foreground font-medium">
                    Welcome back! Please sign in to continue your journey.
                    </p>
                </div>

                {/* form component */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        <div>
                            <label htmlFor="email" className="block text-base font-semibold">
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
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                        {/* button */}
                        <Button type="submit" size="lg" className="w-full py-2 text-base rounded-lg font-bold bg-gradient-to-r from-primary to-primary/80 shadow-md hover:from-primary/80 hover:to-primary" >
                            {loading ? "Signing In..." : "Sign In"}
                        </Button>
                </form>

                {/* footer */}
                <div className="flex items-center justify-center gap-3 text-sm">
                    <span className="text-muted-foreground">
                        Don&apos;t have an account?
                    </span>
                    <Link
                        href="/signup"
                        className="text-primary font-semibold hover:underline" 
                    >
                        Sign up
                    </Link>
                    <span className="text-muted-foreground">
                        <Link
                            href="/forgot-password"
                            className="text-primary font-semibold hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </span>
                </div>
            </Card>
        
    </div>
}