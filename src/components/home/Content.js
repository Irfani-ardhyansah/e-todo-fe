import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";
import { setTimerIdRedux, setTimerTitleRedux } from '../../redux/contentSlice'

import Sidebar from './Sidebar';
import './Content.css';
import ModalTask from './ModalTask';
import TaskDetail from './TaskDetail';

import { setActiveTaskId } from '../../redux/sidebarSlice'

import useTimerService from '../../services/useTimerService';
import useTaskDetailHistoryService from "../../services/useTaskDetailHistoryService"
import useTimer from '../../hooks/useTimer';
import TaskHistoryList from './TaskHistoryList';
import useTaskService from '../../services/useTaskService';

import ReactQuill from 'react-quill';

const ACTIVE_TASK_KEY = "active_task"; 
const TIMER_DATA_KEY = 'stopwatch_data_state';

const Content = () => {
    const dispatch = useDispatch();
    const activeTaskId = useSelector((state) => state.sidebar.activeTaskId); 

    const { DoPostTimer, DoUpdateTimer } = useTimerService();
    const { GetTaskDetail } = useTaskService();
    const { GetTaskDetailHistory, GetTaskDetailHistoryByTaskId } = useTaskDetailHistoryService();
    const { time, setTime, formatTime, reset, setLastStart, isTimerRun, setIsTimerRun, timerId, setTimerId } = useTimer();

    const [taskDetailHistories, setTaskDetailHistories] = useState([]);
    const [formInput, setFormInput] = useState({
            title: "",
        });
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [taskDetail, setTaskDetail] = useState(null);
    const [isFormCommentActive, setFormCommentActive] = useState(false);

    useEffect(() => {
        fetchTaskDetailHistory();

        const localStorageTimerData = JSON.parse(localStorage.getItem(TIMER_DATA_KEY));
        if (localStorageTimerData) {
            setFormInput((prev) => ({
                ...prev,
                title: localStorageTimerData.timerTitleRedux,
            }));
        }
    }, [])

    useEffect(() => {
        if(activeTaskId) {
            fetchTaskDetail();
            fetchTaskDetailHistoryByTaskId();
        } else {
            fetchTaskDetailHistory();
        }
    }, [activeTaskId])
    
    const fetchTaskDetailHistory = async () => {
        try {
            const result = await GetTaskDetailHistory('/timer/weekly-report');
            const updated = result.data.map((item) => ({ ...item, uuid: uuidv4() }));
            setTaskDetailHistories(updated);
        } catch(error) {
            console.error('Failed to fetch task history:', error);
        }
    };

    const fetchTaskDetailHistoryByTaskId = async () => {
        try {
            const result = await GetTaskDetailHistoryByTaskId('/timer/weekly-report', activeTaskId);
            
            if (!result || !Array.isArray(result.data)) {
                setTaskDetailHistories([]); 
                return;
            }

            const updated = result.data.map((item) => ({ ...item, uuid: uuidv4() }));
            setTaskDetailHistories(updated);
        } catch(error) {
            console.error('Failed to fetch task history:', error);
        }
    };

    const fetchTaskDetail = async () => {
        try {
            const result = await GetTaskDetail('/task', activeTaskId);
            setTaskDetail(result.data);
        } catch(error) {
            console.error('Failed to fetch task DEtail :', error);
        }
    }

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
            let response = await startTimer();
            
            dispatch(setTimerIdRedux(response.data.id));

            setIsTimerRun(true);
            setTimerId(response.data.id);
            setIsReadOnly(true);
            setLastStart(Math.floor(Date.now() / 1000));
        } else {
            await stopTimer();

            setIsReadOnly(false);
            setFormInput((prevFormInput) => ({
                ...prevFormInput,
                title: "", 
            }));
            reset();
            localStorage.setItem(ACTIVE_TASK_KEY, null);
            fetchTaskDetailHistory();
            dispatch(setActiveTaskId(null));
        }
    }

    const startTimer = async () => {
        try {
            const formData = new FormData();
            formData.append('time', '00:00:00');
            formData.append('status', 'start');
            formData.append('title', formInput.title);

            let timerTitleRedux = formInput.title;
            dispatch(setTimerTitleRedux(timerTitleRedux));

            let response = await DoPostTimer('timer/start', activeTaskId, formData);
            let timerIdRedux = response.data.id;
            
            localStorage.setItem(
                TIMER_DATA_KEY,
                JSON.stringify({ timerIdRedux, timerTitleRedux})
            );

            return response;
        } catch(error) {
            console.error(`Error Start Time ${error}`);
        }
    }

    const stopTimer = async () => {
        try {
            const formData = new FormData();
            formData.append('time', formatTime(time));
            formData.append('status', 'stop');
            formData.append('title', formInput.title);
            
            await DoUpdateTimer('timer/update', timerId, formData);
        } catch(error) {
            console.error(`Error Stop Timer ${error}`)
        }
    }

    const handleBlur = () => {
        // if (comment.trim() === "") {
            setFormCommentActive(false);
        // }
    };

    return (
        <>
            <div className="row mt-4">
                <Sidebar />
                <div className="col-6">
                    {activeTaskId && taskDetail &&  
                        <>
                            <TaskDetail taskDetail={taskDetail} />

                            <div className="task-comment-section">
                                <div className="form-comment-field"> 
                                    {
                                        isFormCommentActive ? (
                                            <ReactQuill
                                                onBlur={handleBlur}
                                                theme="snow"
                                                placeholder="Add a comment..."
                                                className="form-comment-input"
                                            />
                                        ) : (
                                            <input 
                                            onFocus={() => setFormCommentActive(true)}
                                            className="form-comment-default p-1 me-1" 
                                            placeholder="Add a comment..."
                                            readOnly
                                        />
                                        )
                                    }
                                </div>
                            </div>
                        </>
                    }
                </div>

                <ModalTask />

                <div className="col-4">

                {activeTaskId && taskDetail &&  
                    <>
                        <div className="filter-section">
                            <div className="custom-select-wrapper">
                                <select
                                    className={`select-filter ${taskDetail?.status || ''}`}
                                    name="status"
                                    value={taskDetail?.status || ''}
                                >
                                    <option value="" disabled hidden>Pilih</option>
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                    <option value="finished">Finished</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="in_review">In Review</option>
                                </select>
                                <span className="custom-arrow">&#9662;</span>
                            </div>
                        </div>
                    </>
                }
                        <div className="content-section mt-2">
                            <div className="card">
                                {activeTaskId && taskDetail &&  
                                    <>
                                        <div className="card-header timer-header">
                                            <button className="btn-filter-sidebar" > Timers </button>
                                        </div>
                                    </>
                                }
                                <ul className="list-group list-group-flush timer-group">
                                    {activeTaskId && taskDetail &&  
                                        <>
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
                                        </>
                                    }
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