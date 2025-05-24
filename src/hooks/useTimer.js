import React, { useState, useEffect, useRef } from "react";
import { setTimerRunStatus } from '../redux/contentSlice';
import { useSelector, useDispatch } from 'react-redux';

const TIMER_KEY = 'stopwatch_state';
const TIMER_DATA_KEY = 'stopwatch_data_state';

export default function useTimer() {
    const [time, setTime]               = useState(0);
    const [lastStart, setLastStart]     = useState(null);
    const [isTimerRun, setIsTimerRun]   = useState(false);
    const [timerId, setTimerId]         = useState(0);
    const intervalRef                   = useRef(null);

    // const timerIdRedux                  = useSelector((state) => state.content.timerIdRedux); 
    // const timerTitleRedux               = useSelector((state) => state.content.timerTitleRedux); 
    const dispatch                      = useDispatch();

    useEffect(() => {
        const localStorageTimer = JSON.parse(localStorage.getItem(TIMER_KEY));
        const localStorageTimerData = JSON.parse(localStorage.getItem(TIMER_DATA_KEY));
        
        if(localStorageTimer && localStorageTimerData) {
            setTime(localStorageTimer.time);
            setIsTimerRun(localStorageTimer.isTimerRun);
            setLastStart(localStorageTimer.lastStart);
            setTimerId(localStorageTimerData.timerIdRedux);
        }
    }, []);

    useEffect(() => {
        if(isTimerRun && lastStart > 0 && time > 0) {
            localStorage.setItem(
                TIMER_KEY,
                JSON.stringify({ time, isTimerRun, lastStart})
            );
        }
    }, [time, isTimerRun, lastStart]);

    useEffect(() => {
        if (isTimerRun) {
            const saved = JSON.parse(localStorage.getItem(TIMER_KEY));
            intervalRef.current = setInterval(() => {
                if(saved) {
                    const now = Math.floor(Date.now() / 1000);
                    const elapsed = now - lastStart;
                    setTime(elapsed);
                } else {
                    setTime((prev) => prev + 1);
                }
            }, 1000)
        }

        dispatch(setTimerRunStatus(isTimerRun));
        return () => clearInterval(intervalRef.current)
    }, [isTimerRun])

    const reset = () => {
        setTime(0)
        setIsTimerRun((prev) => !prev)
        localStorage.setItem(TIMER_KEY, null);
        localStorage.setItem(TIMER_DATA_KEY, null);
    };

    const formatTime = (second) => {
        const hrs = String(Math.floor(second / 3600)).padStart(2, "0");
        const mins = String(Math.floor((second % 3600) / 60)).padStart(2, "0");
        const secs = String(second % 60).padStart(2, "0");
        return `${hrs}:${mins}:${secs}`;
    };

    return { time, setTime, formatTime, reset, setLastStart, isTimerRun, setIsTimerRun, timerId, setTimerId };
}