import Sidebar from './Sidebar';
import './Content.css'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import React, { useState, useEffect, useCallback } from 'react';
import { setTimerRunStatus } from '../../redux/contentSlice'
import { toast } from "react-toastify";
import useContentService from '../../services/Content';
import useTaskDetailHistoryService from "../../services/TaskDetailHistory"
import { v4 as uuidv4 } from 'uuid';
import { formatDate } from "../../utils/dateHelper";

const Content = () => {
    const activeTaskId = useSelector((state) => state.sidebar.activeTaskId); 
    const [taskDetailHistories, setTaskDetailHistories] = useState([])
    const [time, setTime] = useState(0);
    const [isTimerRun, setIsTimerRun] = useState(false);
    const [timerId, setTimerId] = useState(0)
    const [formInput, setFormInput] = useState({
            title: "",
        });
    const [isReadOnly, setIsReadOnly] = useState(false)
    const dispatch = useDispatch();
    const { DoPostTimer, DoUpdateTimer } = useContentService();
    const { GetTaskDetailHistory } = useTaskDetailHistoryService()

    useEffect(() => {
        getTaskDetailHistoryData().then(data => {
            const updatedData = data.map(item => ({
                ...item,
                uuid: uuidv4()
            }));
            setTaskDetailHistories(updatedData);
        });
    }, [])

    useEffect(() => {
        dispatch(setTimerRunStatus(isTimerRun))

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
    
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormInput((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }, []);

    const getTaskDetailHistoryData = async () => {
        try {
            const taskResults = await GetTaskDetailHistory()
            console.log(taskResults.data)
            return taskResults.data
        } catch(error) {
            console.error('Error service task', error)
        }
    }

    const formatTime = (seconds) => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0")
        const mins = String(Math.floor((seconds % 3600 / 60))).padStart(2, "0")
        const secs = String(seconds % 60).padStart(2, "0")
        return `${hrs}:${mins}:${secs}`;
    }
    
    const toggleTimer = async () => {
        if(!activeTaskId) {
            alert('Select Task First!')
            return
        }

        if(!isTimerRun) {
            await startTimer();
        }

        if(isTimerRun) {
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

            const response = await handlePostTimer('timer/start', activeTaskId, formData)

            const tempTimerId = response.data.id
            setTimerId(tempTimerId)
            setIsReadOnly(true)
        } catch(error) {
            console.error(`Error Start Time ${error}`)
        }
    }

    const stopTimer = async () => {
        try {
            setTime(0)

            const formData = new FormData()   
            formData.append('time', formatTime(time))
            formData.append('status', 'stop')
            formData.append('title', formInput.title)
            
            await handleUpdateTimer('timer/update', timerId, formData)
            
            setIsReadOnly(false)
            setFormInput((prevFormInput) => ({
                ...prevFormInput,
                title: "", 
            }));
        } catch(error) {
            console.error(`Error Stop Timer ${error}`)
        }
    }

    const handlePostTimer = async (endpoint, timerIdOrTaskId, data) => {
        try {
            const result = await DoPostTimer(endpoint, timerIdOrTaskId, data)
            return result
            
        } catch(error) {
            showErrorToast(error.response.data.data)
            console.error('error postTimer', error.response.data.data)
        }
    }

    const handleUpdateTimer = async (endpoint, timerIdOrTaskId, data) => {
        try {
            DoUpdateTimer(endpoint, timerIdOrTaskId, data)
            
        } catch(error) {
            showErrorToast(error.response.data.data)
            console.error('error postTimer', error.response.data.data)
        }
    }

    const showErrorToast = (message) => {
        toast.error(message);
    };

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
                                {taskDetailHistories.map((item) => (
                                    <React.Fragment key={item.uuid}>
                                        <li className="list-group-item timer-history-divider d-flex justify-content-between"
                                            key={`${item.uuid}-divider`}
                                        >
                                            <div className="left-side">
                                                {formatDate(item.start_date)} - {formatDate(item.end_date)}
                                            </div>
                                            <div className="right-side">
                                                {item.total_time}
                                            </div>
                                        </li>
                                        <li className="list-group-item timer-history"
                                            key={`${item.uuid}-history`}
                                        >
                                            {item.data_detail.map((data_detail) => (
                                                <React.Fragment key={item.uuid}>
                                                    <div className="d-flex justify-content-between mb-1">
                                                        <div className="left-side">
                                                            {formatDate(data_detail.date)}
                                                        </div>
                                                        <div className="right-side">
                                                            00:00:00
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    {data_detail.data_grouped.map((data_grouped, index) => (
                                                        <React.Fragment key={item.uuid}>
                                                            <div className="d-flex justify-content-between mt-1 timer-history-content">
                                                                <div className="left-side">
                                                                    {index + 1}. {data_grouped.task_name}
                                                                </div>
                                                                <div className="right-side">
                                                                    {data_grouped.time}
                                                                </div>
                                                            </div>
                                                        </React.Fragment>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </li>
                                    </React.Fragment>
                                ))}

                                {/* <li className="list-group-item timer-history-divider d-flex justify-content-between">
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
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Content;