import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Modal.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { setActiveModalTask } from '../../redux/headerSlice';
import { triggerRefreshTask } from '../../redux/sidebarSlice';
import useTaskService from '../../services/useTaskService';

const ModalTask = () => {
    const dispatch = useDispatch();
    const { DoPostTask} = useTaskService();
    const initialFormState = {
        name: "",
        description: "",
        code: "",
        status: "",
    };
    const [formInputTask, setFormInputTask] = useState(initialFormState);
    const [isClosing, setIsClosing] = useState(false);
    const activeModalTask = useSelector((state) => state.header.activeModalTask); 

    const handleChangeTask = useCallback((e) => {
        const { name, value } = e.target;
        setFormInputTask((prev) => ({...prev, [name]: value, }));
    }, []);
    
    const handleDescriptionChange = useCallback((val) => {
        setFormInputTask((prev) => ({ ...prev, description: val }));
    }, []);

    const handleCloseModalTask = () => {
        setIsClosing(true);
        setTimeout(() => {
            dispatch(setActiveModalTask(false));
            setIsClosing(false);
        }, 300);
    }

    const handleSaveTask = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', formInputTask.name);
            formData.append('status', formInputTask.status);
            formData.append('description', formInputTask.description);
            formData.append('code', formInputTask.code);

            let response = await DoPostTask('task', formData);
            if(response.code == 200) {
                handleCloseModalTask();
                dispatch(triggerRefreshTask());
                setTimeout(() => {
                    setFormInputTask(initialFormState);
                }, 300);
            } else {
                console.log(response.code)
            }
        } catch(error) {
            console.error(`Error Save Task ${error}`);
        }
    }
    
    return (
        <>
            {activeModalTask &&                 
                <div className={`modal-overlay ${isClosing ? "hide" : ""}`}>
                    <div className="modal-box">
                        <div className="modal-header">
                            <h2>Form Task</h2>
                            <button onClick={() => handleCloseModalTask()}>X</button>
                        </div>
                        <form className="floating-form">
                            <div className={`form-field ${formInputTask.name ? 'filled' : ''}`}>
                                <input
                                name="name"
                                value={formInputTask.name}
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

                            <div className="d-flex align-items-center justify-content-between">
                                <div className={`form-field w-50 ${formInputTask.status ? 'filled' : ''}`}>
                                    <select
                                        name="status"
                                        value={formInputTask.status}
                                        onChange={handleChangeTask}
                                        required
                                    >
                                        <option value="" disabled hidden>
                                        Pilih 
                                        </option>
                                        <option value="open">Open</option>
                                        <option value="closed">Closed</option>
                                        <option value="finished">Finished</option>
                                        <option value="in_progress">In Progress</option>
                                    </select>
                                    <label>Status</label>
                                </div>

                                <div className={`form-field w-50 ${formInputTask.code ? 'filled' : ''}`}>
                                    <input
                                    name="code"
                                    value={formInputTask.code}
                                    onChange={handleChangeTask}
                                    required
                                    />
                                    <label>Code</label>
                                </div>
                            </div>

                            <div className="actions">
                                <button type="button" className="btn-submit" onClick={handleSaveTask}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default ModalTask;