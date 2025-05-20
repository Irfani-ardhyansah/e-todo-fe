import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";

import Sidebar from './Sidebar';
import './Content.css';

import { setTimerRunStatus } from '../../redux/contentSlice'
import { setActiveTaskId } from '../../redux/sidebarSlice'

import useContentService from '../../services/Content';
import useTaskDetailHistoryService from "../../services/TaskDetailHistory"
import useTimer from '../../hooks/useTimer';
import TaskHistoryList from './TaskHistoryList';

const Content = () => {
    const dispatch = useDispatch();
    const activeTaskId = useSelector((state) => state.sidebar.activeTaskId); 

    const { DoPostTimer, DoUpdateTimer } = useContentService();
    const { GetTaskDetailHistory } = useTaskDetailHistoryService();

    const [taskDetailHistories, setTaskDetailHistories] = useState([]);
    const [isTimerRun, setIsTimerRun] = useState(false);
    const [timerId, setTimerId] = useState(0);
    const [formInput, setFormInput] = useState({
            title: "",
        });
    const [isReadOnly, setIsReadOnly] = useState(false);

    const { time, setTime, formatTime, reset } = useTimer(isTimerRun);

    useEffect(() => {
        fetchTaskDetailHistory();
    }, [])

    useEffect(() => {
        dispatch(setTimerRunStatus(isTimerRun))
    }, [isTimerRun]);
    
    const fetchTaskDetailHistory = async () => {
        try {
            const result = await GetTaskDetailHistory();
            const updated = result.data.map((item) => ({ ...item, uuid: uuidv4() }));
            setTaskDetailHistories(updated);
        } catch(error) {
            console.error('Failed to fetch task history:', error);
        }
    };

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormInput((prev) => ({...prev, [name]: value, }));
    }, []);
    
    const toggleTimer = async () => {
        if(!activeTaskId) {
            alert('Select Task First!')
            return
        }

        if(!isTimerRun) {
            await startTimer();
        } else {
            await stopTimer();
        }

        setIsTimerRun((prev) => !prev)
    }

    const startTimer = async () => {
        try {
            const formData = new FormData()   
            formData.append('time', '00:00:00')
            formData.append('status', 'start')
            formData.append('title', formInput.title)

            const response = await DoPostTimer('timer/start', activeTaskId, formData)
            setTimerId(response.data.id)
            setIsReadOnly(true)
        } catch(error) {
            console.error(`Error Start Time ${error}`)
        }
    }

    const stopTimer = async () => {
        try {
            const formData = new FormData()   
            formData.append('time', formatTime(time))
            formData.append('status', 'stop')
            formData.append('title', formInput.title)
            
            await DoUpdateTimer('timer/update', timerId, formData)
            reset();
            setIsReadOnly(false)
            setFormInput((prevFormInput) => ({
                ...prevFormInput,
                title: "", 
            }));
            fetchTaskDetailHistory();
            dispatch(setActiveTaskId(null));
        } catch(error) {
            console.error(`Error Stop Timer ${error}`)
        }
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
                                        <input 
                                                className="timer-title" 
                                                name="title" 
                                                value={formInput.title}
                                                onChange={handleChange}
                                                placeholder="What are you working on ?"
                                                readOnly={isReadOnly} />
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
                                <TaskHistoryList histories={taskDetailHistories} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Content;