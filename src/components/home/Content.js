import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";
import { setTimerIdRedux, setTimerTitleRedux } from '../../redux/contentSlice'

import Sidebar from './Sidebar';
import './Content.css';

// Modal 
import './Modal.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { setActiveModalTask } from '../../redux/headerSlice';
// End Modal 

import { setActiveTaskId } from '../../redux/sidebarSlice'

import useContentService from '../../services/Content';
import useTaskDetailHistoryService from "../../services/TaskDetailHistory"
import useTimer from '../../hooks/useTimer';
import TaskHistoryList from './TaskHistoryList';

const ACTIVE_TASK_KEY = "active_task"; 
const TIMER_DATA_KEY = 'stopwatch_data_state';

const Content = () => {
    const dispatch = useDispatch();
    const activeTaskId = useSelector((state) => state.sidebar.activeTaskId); 

    const { DoPostTimer, DoUpdateTimer } = useContentService();
    const { GetTaskDetailHistory } = useTaskDetailHistoryService();

    const [taskDetailHistories, setTaskDetailHistories] = useState([]);
    const [formInput, setFormInput] = useState({
            title: "",
        });

    const [formInputTask, setFormInputTask] = useState({
        title: "",
        description: ""
    });
    const [isClosing, setIsClosing] = useState(false);
    const activeModalTask = useSelector((state) => state.header.activeModalTask); 

    const [isReadOnly, setIsReadOnly] = useState(false);

    const { time, setTime, formatTime, reset, setLastStart, isTimerRun, setIsTimerRun, timerId, setTimerId } = useTimer();

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

    const handleChangeTask = useCallback((e) => {
        const { name, value } = e.target;
        setFormInputTask((prev) => ({...prev, [name]: value, }));
    }, []);
    
    const handleDescriptionChange = useCallback((val) => {
        setFormInputTask((prev) => ({ ...prev, description: val }));
    }, []);

    const handleCloseModalTask = (status) => {
        setIsClosing(true);
        setTimeout(() => {
            dispatch(setActiveModalTask(false));
            setIsClosing(false);
        }, 300);
    }

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

    return (
        <>
            <div className="row mt-4">
                <Sidebar />
                <div className="col-6">
                    CONTENT
                </div>
                {activeModalTask &&                 
                    <div className={`modal-overlay ${isClosing ? "hide" : ""}`}>
                        <div className="modal-box">
                            <div className="modal-header">
                                <h2>Form Task</h2>
                                <button onClick={() => handleCloseModalTask(false)}>X</button>
                            </div>
                            <form className="floating-form">
                                <div className={`form-field ${formInputTask.title ? 'filled' : ''}`}>
                                    <input
                                    name="title"
                                    value={formInputTask.title}
                                    onChange={handleChangeTask}
                                    required
                                    />
                                    <label>Name</label>
                                </div>

                                <div className={`form-field ${formInputTask.description ? 'filled' : ''}`}>
                                    <ReactQuill
                                        theme="snow"
                                        value={formInputTask.description}
                                        onChange={handleDescriptionChange}
                                        placeholder="Tulis sesuatu..."
                                    />
                                </div>

                                <div className="actions">
                                    {/* <button type="button" onClick={() => setShow(false)}>Cancel</button> */}
                                    <button className="btn-submit" type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    }
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