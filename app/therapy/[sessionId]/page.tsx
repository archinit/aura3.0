/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Bot, Loader2, MessageSquare, PlusCircle, Send, Sparkles, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { createChatSession, sendChatMessage, getChatHistory, getAllChatSessions, ChatSession, } from "@/lib/api/chat";
import { formatDistanceToNow } from "date-fns";
import {  useParams } from 'next/navigation';
import { ScrollArea } from "@/components/ui/scroll-area";


export default function TherapyPage() {
    const params = useParams();
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isChatPaused] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>( params.sessionId as string);
    const [sessions, setSessions] = useState<ChatSession[]>([]);

    const handleNewSession = async () => {
        try {
            setIsLoading(true);
            const newSessionId = await createChatSession();

            const newSession: ChatSession = {
                sessionId: newSessionId,
                messages: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            setSessions((prev) => [newSession, ...prev]);
            setSessionId(newSessionId);
            setMessages([]);

            //update url without refreshing
            window.history.pushState({}, "", `/therapy/${newSessionId}`);
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to create new session:", error);
            setIsLoading(false); 
        }
    };

    //initialize chat session and  load history

    useEffect(() =>  {
        const initChat = async () => {
            try {
                setIsLoading(true);
                if( !sessionId || sessionId === "new") {
                    const newSessionId = await createChatSession();

                    setSessionId(newSessionId);
                    window.history.pushState({}, "", `/therapy/${newSessionId}`);
                } else {
                    try {
                        const history = await getChatHistory(sessionId);

                        if (Array.isArray(history)) {
                            const formattedHistory = history.map((msg) => ({
                                ...msg, timestamp: new Date(msg.timestamp),
                            }));
                            setMessages(formattedHistory);
                        } else {
                            console.error("History is not an array:", history);
                            setMessages([]);
                        }
                    } catch (historyError) {
                        console.error("Error loading chat history:", historyError);
                        setMessages([]);
                    }
                }
            } catch (error) {
                console.error("Failed to initialize chat:", error);
                 setMessages([
                    {
                        role: "assistant",
                        content:
                        "I apologize, but I'm having trouble loading the chat session. Please try refreshing the page.",
                        timestamp: new Date(),
                    },
                ]);
            } finally {
                setIsLoading(false);
            }
        };
        initChat();
    }, [sessionId]);
    
    
    // Load all chat sessions
    useEffect(() => {
        const loadSessions = async () => {
            try {
                const allSessions = await getAllChatSessions();
                setSessions(allSessions);
            } catch (error) {
                console.error("Failed to load sessions:", error);
            }
        };
        
        loadSessions();
    }, [messages]);
    
  
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({behavior:"smooth"})
            },100);
        }
    };
  
    useEffect(() => {
        if (!isTyping) {
            scrollToBottom();
        }
    }, [messages, isTyping]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const currentMessage = message.trim();

        if (!currentMessage || isTyping || isChatPaused || !sessionId) {
            console.log("Submission blocked:", {
                noMessage: !currentMessage,
                isTyping,
                isChatPaused,
                noSessionId: !sessionId,
            });
            return;
        }

        setMessage("");
        setIsTyping(true);

        try {
            const userMessage = {
                role: "user",
                content: currentMessage,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, userMessage]);

            const response = await sendChatMessage(sessionId, currentMessage);

            //Parse the response if its a string
            const aiResponse = typeof response === "string" ? JSON.parse(response) : response;
            console.log("Parsed AI response:", aiResponse);
            
    
            const assistantMessage = {
                role: "assistant",
                content: aiResponse.response || aiResponse.message || "I'm here to support you. Could you tell me more about what's on your mind?",
                timestamp: new Date(),
                 metadata: {
                    analysis: aiResponse.analysis || {
                        emotionalState: "neutral",
                        riskLevel: 0,
                        themes: [],
                        recommendedApproach: "supportive",
                        progressIndicators: [],
                    },
                    technique: aiResponse.metadata?.technique || "supportive",
                    goal: aiResponse.metadata?.currentGoal || "Provide support",
                    progress: aiResponse.metadata?.progress || {
                        emotionalState: "neutral",
                        riskLevel: 0,
                    },
                },
            };

            setMessages((prev) => [...prev, userMessage, assistantMessage]);
            setIsTyping(false);
            scrollToBottom();

        } catch (error) {
            console.error("Error in chat:", error);
            setMessages((prev) => [
                ...prev, {
                    role: "assistant",
                    content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
                    timestamp: new Date(),
                },
            ]);
            setIsTyping(false);
        };
    };
    // breakpoint


    useEffect(() => {
        setMounted(true)
    },[]);

    if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  };

  const handleSessionSelect = async (selectedSessionId: string) => {
    if (selectedSessionId === sessionId) return;

    try {
      setIsLoading(true);
      const history = await getChatHistory(selectedSessionId);
      if (Array.isArray(history)) {
        const formattedHistory = history.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(formattedHistory);
        setSessionId(selectedSessionId);
        window.history.pushState({}, "", `/therapy/${selectedSessionId}`);
      }
    } catch (error) {
      console.error("Failed to load session:", error);
    } finally {
      setIsLoading(false);
    }
  };


    return <div className='relative max-w-7xl mx-auto px-4'>
        <div className='flex h-[calc(100vh-4rem)] mt-21 gap-6 '>
            <div className="w-80 hidden md:flex flex-col border-r bg-muted/30 ">
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between mb-4">
                        <h2  className="text-lg font-semibold">
                            Chat Sessions
                        </h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleNewSession}
                            className="hover:bg-primary/10"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                            <PlusCircle className="w-5 h-5" />
                            )}
                        </Button>
                    </div>
                    <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                        onClick={handleNewSession}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <MessageSquare className="w-4 h-4" />
                        )}
                        New Session
                    </Button>
                </div>
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                            {sessions.map((session) => (
                                <div
                                    key={session.sessionId}
                                    className={cn(
                                        "p-3 rounded-lg text-sm cursor-pointer hover:bg-primary/5 transition-colors",
                                        session.sessionId === sessionId
                                        ? "bg-primary/10 text-primary"
                                        : "bg-secondary/10"
                                    )}
                                    onClick={() => handleSessionSelect(session.sessionId)}
                                >
                                <div className="flex items-center gap-2 mb-1">
                                    <MessageSquare className="w-4 h-4" />
                                    <span className="font-medium">
                                    {session.messages[0]?.content.slice(0, 30) || "New Chat"}
                                    </span>
                                </div>
                                <p className="line-clamp-2 text-muted-foreground">
                                    {session.messages[session.messages.length - 1]?.content ||
                                    "No messages yet"}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-muted-foreground">
                                    {session.messages.length} messages
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                    {(() => {
                                        try {
                                        const date = new Date(session.updatedAt);
                                        if (isNaN(date.getTime())) {
                                            return "Just now";
                                        }
                                        return formatDistanceToNow(date, {
                                            addSuffix: true,
                                        });
                                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                        } catch (error) {
                                        return "Just now";
                                        }
                                    })()}
                                    </span>
                                </div>
                                </div>
                            ))}
                    </div>
                </ScrollArea>
            </div>

            {/* mainchatarea */}
            <div className='flex-1 flex flex-col overflow-hidden dark:bg-background rounded-lg border'>
                <div className='flex items-center gap-2 border-b p-4 flex-shrink-0'>
                    <div className='w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center'>
                        <Bot className='w-5 h-5'/>
                    </div>

                    <div className=''>
                        <h2 className='font-semibold'>AI Therapist</h2>
                        <p className='text-sm text-muted-foreground'>
                        {messages.length} messages
                    </p>
                    </div>
                </div>

                {messages.length === 0  ? (
                    <div className='flex-1 flex items-center justify-center p-4'>
                        <div className='max-w-2xl w-full space-y-8'>
                            <div className='text-center space-y-4'>
                                <div className='relative inline-flex flex-col items-center'>
                                    <div
                                        className='absolute inset-0 bg-primary/20 blur-2xl rounded-full'
                                    />

                                    <div className='relative flex items-center gap-2 text-2xl font-semibold'>
                                        <div className='relative'>
                                            <Sparkles className='w-6 h-6 text-primary'/>

                                            <div
                                            className='absolute inset-0 bg-primary/20 blur-2xl rounded-full'
                                            
                                         >
                                                <Sparkles className='w-6 h-6 '/>
                                            </div>
                                        </div>
                                        <span className='bg-gradient-to-r from-primary/90 to bg-primary bg-clip-text text-transparent'>
                                            AI Therapist
                                        </span>
                                    </div>
                                    <p className='text-muted-foreground mt-2'>
                                        How can I assist you today? 
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                 <div>
                    <div>
                        <AnimatePresence initial={false}>
                            {messages.map((msg) => (
                                <motion.div 
                                    key={msg.timestamp.toISOString()}
                                    initial={{opacity:0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration:0.3}}
                                    className={cn(
                                        "px-6 py-8", msg.role === "assistant" ? "bg-muted/30" : "bg-background"
                                    )}
                                >
                                    <div className='flex gap-4'>
                                        <div className='w-8 h-8 shrink mt-1'>
                                            {msg.role === "assistant" ? (
                                                <div className='w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center ring-1 ring-primary/20'>
                                                    <Bot className='w-5 h-5'/>
                                                </div>
                                            ) : (
                                                <div className='w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center'>
                                                    <User className='h-5 w-5 ' />
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex-1 space-y-2 overflow-hidden min-h-[2rem]'>
                                            <div className='flex items-center justify-between'>
                                                <p className='font font-medium text-sm'>
                                                    {msg.role === "assistant" ? "AI Therapy" : "You"}
                                                </p>
                                            </div>
                                            <div className='prose prose-sm dark:prose-invert leading-relaxed'>
                                                <ReactMarkdown>
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                         {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="px-6 py-8 flex gap-4 bg-muted/30" 
                            >
                                <div className="w-8 h-8 shrink-0">
                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center ring-1 ring-primary/20">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                </div>
                                </div>
                                <div className="flex-1 space-y-2">
                                <p className="font-medium text-sm">AI Therapist</p>
                                <p className="text-sm text-muted-foreground">Typing...</p>
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                 </div>   
                )}

                {/* input to submit */}
                
                <div className='border-t bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50 p-4 sticky bottom-0 z-10'>
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-3xl md:max-w-4xl mx-auto flex gap-4 items-end relative"
                        >
                        <div className="flex-1 relative group">
                            <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={
                                isChatPaused
                                ? "Complete the activity to continue..."
                                : "Ask me anything..."
                            }
                            className={cn(
                                "w-full resize-none rounded-2xl border bg-background",
                                "p-5  pr-12 min-h-[48px] max-h-[200px]",
                                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                                "transition-all duration-200",
                                "placeholder:text-muted-foreground/70",
                                (isTyping || isChatPaused) &&
                                "opacity-50 cursor-not-allowed "
                            )}
                            rows={1}
                            disabled={isTyping || isChatPaused}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                                }
                            }}
                            />
                            <Button
                            type="submit"
                            size="icon"
                            className={cn(
                                "absolute right-1.5 bottom-3.5 h-[36px] w-[36px] mb-2 mr-4",
                                "rounded-xl transition-all duration-200",
                                "bg-primary hover:bg-primary/90",
                                "shadow-sm shadow-primary/20",
                                (isTyping || isChatPaused || !message.trim()) &&
                                "opacity-50 cursor-not-allowed",
                                "group-hover:scale-105 group-focus-within:scale-105"
                            )}
                            disabled={isTyping || isChatPaused || !message.trim()}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSubmit(e);
                            }}
                            >
                            <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}