import Sidebar from './Sidebar';
import './Content.css'
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

const Content = () => {
    const activeTaskId = useSelector((state) => state.sidebar.activeTaskId); 
    const [time, setTime] = useState(0);
    const [isTimerRun, setIsTimerRun] = useState(false);

    useEffect(() => {
        let interval = null;
    
        if (isTimerRun) {
          interval = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
          }, 1000); 
        } else {
          clearInterval(interval);
        }
    
        return () => clearInterval(interval);
      }, [isTimerRun]);

    const formatTime = (seconds) => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0")
        const mins = String(Math.floor((seconds % 3600 / 60))).padStart(2, "0")
        const secs = String(seconds % 60).padStart(2, "0")
        return `${hrs}:${mins}:${secs}`;
    }
    
    const toggleTimer = () => {
        if(isTimerRun) {
            setTime(0)
        }

        setIsTimerRun((prev) => !prev)
    }

    return (
        <>
            <div className="row mt-4">
                <Sidebar />
                <div className="col-6">
                    CONTENT
                </div>
                <div className="col-4">
                    <div className="filter-section">
                        <button className="btn btn-sm btn-filter me-1">To Do</button>
                    </div>
                    <div className="content-section mt-2">
                        <div className="card">
                            <div className="card-header timer-header">
                                <button className="btn-filter-sidebar" > Details </button>
                            </div>
                            <ul className="list-group list-group-flush timer-group">
                                <li className={`list-group-item d-flex justify-content-between align-items-center timer-content`} >
                                    <div className="left-side">
                                        <input className="timer-title" placeholder="What are you working on ?" />
                                    </div>
                                    <div className="right-side d-flex align-items-center">
                                        <div className="timer me-3">
                                            {formatTime(time)}
                                        </div>

                                        <button className="btn-action" onClick={toggleTimer}>
                                            {isTimerRun ? "Stop" : "Start"}
                                        </button>

                                    </div>
                                </li>
                                <li className="list-group-item timer-history-divider d-flex justify-content-between">
                                    <div className="left-side">
                                        This Weekend
                                    </div>
                                    <div className="right-side">
                                        00:00:00
                                    </div>
                                </li>
                                <li className="list-group-item timer-history">
                                    <div className="d-flex justify-content-between mb-1">
                                        <div className="left-side">
                                            FRI, 16 Aug
                                        </div>
                                        <div className="right-side">
                                            00:00:00
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between mt-1 timer-history-content">
                                        <div className="left-side">
                                            1. Task Create
                                        </div>
                                        <div className="right-side">
                                            00:00:00
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between mt-1 timer-history-content">
                                        <div className="left-side">
                                            2. Task Update
                                        </div>
                                        <div className="right-side">
                                            00:00:00
                                        </div>
                                    </div>
                                </li>

                                <li className="list-group-item timer-history-divider d-flex justify-content-between">
                                    <div className="left-side">
                                        Aug, 05 - Aug, 11
                                    </div>
                                    <div className="right-side">
                                        00:00:00
                                    </div>
                                </li>
                                <li className="list-group-item timer-history">
                                    <div className="d-flex justify-content-between mb-1">
                                        <div className="left-side">
                                            FRI, 09 Aug
                                        </div>
                                        <div className="right-side">
                                            00:00:00
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between mt-1 timer-history-content">
                                        <div className="left-side">
                                            1. Task Create
                                        </div>
                                        <div className="right-side">
                                            00:00:00
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between mt-1 timer-history-content">
                                        <div className="left-side">
                                            2. Task Update
                                        </div>
                                        <div className="right-side">
                                            00:00:00
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Content;