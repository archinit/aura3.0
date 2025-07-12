'use client'

import { Ripple } from "@/components/magicui/ripple";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Waves } from "lucide-react";

export default function Home() {

  const emotions = [
    {value:0, label:  "😔 Down", color:"from-blue-500/50"},
    {value:25, label:  "😊 Content", color:"from-green-500/50"},
    {value:50, label:  "😌 Peaceful", color:"from-purple-500/50"},
    {value:75, label:  "🤗 Happy", color:"from-yellow-500/50"},
    {value:100, label:  "🤩 Excited", color:"from-pink-500/50"},
  ];

  const [emotion, setEmotion] = useState(50);
  const [mounted, setMounted] = useState(false);

  const currentEmotion = emotions.find((em) => Math.abs(emotion - em.value) < 15) || emotions[2]

  useEffect(() => {
    setMounted(true);
  }, [])


  return <div className="flex flex-col min-h-screen overflow-hidden ">
    <section className="relative min-h-[90vh] mt-20 flex flex-col items-center justify-center py-12 px-4">
      <div>
        <div className={`absolute w-[600px] h-[600px] rounded-full blur-3xl top-0 -left-20 transition-all duration-700 ease-in-out bg-gradient-to-r ${currentEmotion.color} to-transparent opacity-60`} />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl bottom-0 right-0 animate-pulse delay-700"/>
        <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl"/>
      </div>

      {/* background ripple */}
      <Ripple className="opacity-80"></Ripple>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative space-y-8 text-center"
      >
        {/* badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm border border-primary/20 bg-primary/5 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
            <Waves className="w-4 h-4 animate-wave text-primary" />
            <span className="relative text-foreground/90 dark:text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary/30 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              Your AI Agent Mental Health Companion
            </span>
          </div>

        {/* heading */}
           <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-plus-jakarta tracking-tight">
            <span className="inline-block bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)] hover:to-primary transition-all duration-300">
              Find Peace
            </span>
            <br />
            <span className="inline-block mt-2 bg-gradient-to-b from-foreground to-foreground/90 bg-clip-text text-transparent">
              of Mind
            </span>
          </h1>

            {/* description */}
          <p className="max-w-[600px] mx-auto text-base md:text-lg text-muted-foreground leading-relaxed tracking-wide">
            Experience a new way of emotional support. Our AI companion is here
            to listen, understand, and guide you through life's journey.
          </p>


      </motion.div>
    </section>
  </div>
}
