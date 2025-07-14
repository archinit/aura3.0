'use client'

import { useEffect, useState } from "react"
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BrainCircuit, Heart, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DashboardPage() {

    const [currentTime, setCurrentTime] = useState(new Date());
    

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer) //cleanup
    }, [])

    return <div className="min-h-screen bg-background p-8">
        <div className="pt-20 pb-8 space-y-6 ">
            <div className="flex flex-col gap-2">
                <motion.div 
                    initial={{opacity:0, x: -20}}
                    animate={{opacity:1, x:0}}
                    transition={{duration:0.6}}
                    className="flex flex-col gap-2"
                >
                    <h1 className="text-4xl font-bold">
                        Welcome Back
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        {currentTime.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric"
                        })}
                    </p>
                </motion.div>
            </div>

            {/* main grid layout  */}
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <Card className="border-primary/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent" />
                        
                        <CardContent className="p-6 relative">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-primary"/>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            Quick Actions
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                          Start your wellness journey  
                                        </p>
                                    </div>
                                </div>
                                
                                {/* therapy button */}
                                <div className="grid gap-3">
                                    <Button
                                        variant="default"
                                        className={cn(
                                            "w-full justify-between items-center p-6 h-auto group/button",
                                            "bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90",
                                            "transition-all duration-200 group-hover:translate-y-[-2px]"
                                        )}
                                        onClick={() => {}}
                                    >
                                        <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                <MessageSquare className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="text-left">
                                                <div className="font-semibold text-white">
                                                    Start Therapy
                                                </div>
                                                <div className="text-xs text-white/80">
                                                    Begin a new session
                                                </div>
                                                </div>
                                        </div>
                                        <div className="opacity-0 group-hover/button:opacity-100 transition-opacity">
                                                <ArrowRight className="w-5 h-5 text-white" />
                                        </div>
                                    </Button>

                                    {/* below therapy button*/}
                                    <div className="grid grid-cols-2 gap-3">

                                        {/* how u feeling button */}
                                        <Button 
                                            variant="outline"
                                            className={cn(
                                            "flex flex-col h-[120px] px-4 py-3 group/mood hover:border-primary/50",
                                            "justify-center items-center text-center",
                                            "transition-all duration-200 group-hover:translate-y-[-2px]"
                                            )}
                                            onClick={() => {}}
                                        >
                                            <div>
                                                <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center ml-9 mb-2">
                                                    <Heart className="w-5 h-5 text-rose-500" />
                                                </div>
                                                <div>
                                                <div className="font-medium text-sm">Track Mood</div>
                                                    <div className="text-xs text-muted-foreground mt-0.5">
                                                        How are you feeling?
                                                    </div>
                                                </div>
                                            </div>
                                        </Button>

                                        {/* wellness check button  */}
                                        <Button
                                            variant="outline"
                                            className={cn(
                                            "flex flex-col h-[120px] px-4 py-3 group/ai hover:border-primary/50",
                                            "justify-center items-center text-center",
                                            "transition-all duration-200 group-hover:translate-y-[-2px]"
                                            )}
                                            onClick={() => {}}
                                        >
                                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
                                                    <BrainCircuit className="w-5 h-5 text-blue-500" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm">Check-in</div>
                                                    <div className="text-xs text-muted-foreground mt-0.5">
                                                        Quick wellness check
                                                    </div>
                                                </div>
                                        </Button>
                                    </div>      {/* start here */}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
}