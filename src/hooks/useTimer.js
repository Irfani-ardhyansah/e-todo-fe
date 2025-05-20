import { useState, useEffect } from "react";

export default function useTimer(isRunning) {
    const [time, setTime] = useState(0)

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [isRunning])

    const reset = () => setTime(0);

    const formatTime = (seconds) => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return `${hrs}:${mins}:${secs}`;
    };

    return { time, setTime, formatTime, reset };
}