import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import useTaskService from "../../services/useTaskService";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearRefreshTask, setActiveTaskId } from '../../redux/sidebarSlice';

const ACTIVE_TASK_KEY = "active_task"; 

const Sidebar = () => {
    const { GetTask } = useTaskService();
    const [tasks, setTasks] = useState([]);
    const [isActiveId, setActiveId] = useState(null);
    const dispatch = useDispatch();
    const timerRunStatus = useSelector((state) => state.content.timerRunStatus); 
    const activeTaskId = useSelector((state) => state.sidebar.activeTaskId); 
    const shouldRefresh = useSelector((state) => state.sidebar.shouldRefreshTask)

    const getTaskData = async () => {
        try {
            const taskResults = await GetTask('tasks');
            setTasks(taskResults.data);
        } catch(error) {
            console.error('Error service task', error);
        }
    }

    useEffect(() => {
        getTaskData();
    }, [])

    useEffect(() => {
        if(shouldRefresh) {
            console.log('trigger ', shouldRefresh);
            getTaskData();
            dispatch(clearRefreshTask());
        }
    }, [shouldRefresh])

    useEffect(() => {
        if (tasks.length > 0) {
            const activeTaskIdStorage = localStorage.getItem(ACTIVE_TASK_KEY);
            const parsedId = parseInt(activeTaskIdStorage, 10);
        
            if (!isNaN(parsedId)) {
                setActiveId(parsedId);
                dispatch(setActiveTaskId(parsedId));
            }
        }
    }, [tasks]);

    useEffect(() => {
        const activeTaskIdStorage = localStorage.getItem(ACTIVE_TASK_KEY);
        if (activeTaskIdStorage === null || activeTaskIdStorage === "null") {
            setActiveId(null);
        }
    }, [activeTaskId])

    const toggleClass = (id) => {
        if(timerRunStatus) {
            alert("Timer Is Running, Cannot UnSelect Task, Finish Timer First!!!");
            return
        }
        
        let activeId = isActiveId == id ? null : id
        localStorage.setItem(ACTIVE_TASK_KEY, activeId);
        setActiveId(activeId);
        dispatch(setActiveTaskId(activeId));
    }

    return (
        <>
            <div className="col-2">
                <div className="card" style={{width: '15.9rem'}}>
                    <div className="card-header">
                        <button className="btn-filter-sidebar" > Task </button>
                    </div>
                    <ul className="list-group list-group-flush">
                        {tasks.map((item, index) => (
                            <li 
                                className={`list-group-item sidebar-item ${isActiveId === item.id ? 'active' : ''}`}
                                key={item.id}
                                onClick={() => toggleClass(item.id)}
                                >
                                <div className="content-top mb-2">
                                    {item.name}
                                </div>
                                <div className="content-bottom d-flex justify-content-between mb-2">
                                    <div className="left-side">
                                        {item.code}
                                    </div>
                                    <div className="right-side">
                                        IM
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="card-footer">
                        {tasks.length} of {tasks.length}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;