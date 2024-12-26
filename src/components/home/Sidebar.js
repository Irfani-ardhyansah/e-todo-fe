import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import useTaskService from "../../services/Task"
import { useDispatch } from 'react-redux'
import { setActiveTaskId } from '../../redux/sidebarSlice'

const Sidebar = () => {
    const { GetTask } = useTaskService()
    const [tasks, setTasks] = useState([])
    const [isActiveId, setActiveId] = useState(null)
    const dispatch = useDispatch();

    const getTaskData = async () => {
        try {
            const taskResults = await GetTask()
            setTasks(taskResults.data)
        } catch(error) {
            console.error('Error service task', error)
        }
    }

    useEffect(() => {
        getTaskData()
    }, [])

    
    const toggleClass = (id) => {
        let activeId = isActiveId == id ? null : id
        
        setActiveId(activeId)
        dispatch(setActiveTaskId(activeId))
    }

    return (
        <>
            <div className="col-2">
                <div className="card" style={{width: '15.9rem'}}>
                    <div className="card-header">
                        <button className="btn-filter-sidebar" > Created </button>
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