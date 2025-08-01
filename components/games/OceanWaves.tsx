/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Pause, Play, Waves, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { Slider } from "../ui/slider";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";

const SESSION_DURATION = 5 * 60;  {/*5 mins in secs*/}

export const OceanWaves = () => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(40);
    const [progress, setProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState(SESSION_DURATION);
    const [audio] = useState(new Audio("/sounds/waves.mp3"));

    useEffect(() => {
        audio.loop = true;
        audio.volume = volume / 100;
        return () => {
            audio.pause();
            audio.currentTime = 0;
         };
    }, []);

    useEffect(() => {
        audio.volume = volume / 100;
    }, [volume]);


    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isPlaying && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    const newTime = prev - 1;
                    setProgress(((SESSION_DURATION - newTime) / SESSION_DURATION) * 100);
                    return newTime;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);


    const togglePlay = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };


    return <div className="flex flex-col items-center justify-center h-[400px] space-y-8">
        <div className="relative w-25 h-25">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent rounded-full blur-xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Waves className="w-24 h-24  text-blue-600" />
                </div>
            </div>
        </div>

        <div className="w-50 space-y-6">
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Volume</span>
                    <span>{volume}%</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {volume === 0 ? (
                    <VolumeX className="w-4 h-4"/>
                ): (
                    <Volume2 className="w-4 h-4"/>
                )}

                <Slider 
                    value={[volume]}
                    onValueChange={(value) => setVolume(value[0])}
                    max={100}
                    step={1}
                />
            </div>
        </div>

        <Progress value={progress} className="h-2 w-[48%] md:w-[36%] "/>

        <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground px-10">
                {formatTime(timeLeft)}
            </span>

            <Button
                variant="outline"
                size="icon"
                onClick={togglePlay}
                className="rounded-full "
            >
                {isPlaying ? (
                    <Pause className="h-4 w-4" />
                ) : (
                    <Play className="h-4 w-4" />
                )}
            </Button>

            <span className="text-sm text-muted-foreground px-10">
                {formatTime(SESSION_DURATION)}
            </span>
        </div>
    </div>

}