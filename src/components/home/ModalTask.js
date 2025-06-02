import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Modal.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { setActiveModalTask } from '../../redux/headerSlice';

const ModalTask = () => {
    const dispatch = useDispatch();
    const [formInputTask, setFormInputTask] = useState({
        title: "",
        description: "",
        code: "",
        status: "",
    });
    const [isClosing, setIsClosing] = useState(false);
    const activeModalTask = useSelector((state) => state.header.activeModalTask); 

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
    
    return (
        <>
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

                            <div className="d-flex align-items-center justify-content-between">
                                <div className={`form-field w-50 ${formInputTask.status ? 'filled' : ''}`}>
                                    <select
                                        name="status"
                                        value={formInputTask.status}
                                        onChange={handleChangeTask}
                                        required
                                    >
                                        <option value="" disabled hidden>
                                        Pilih Status
                                        </option>
                                        <option value="open">Open</option>
                                        <option value="closed">Closed</option>
                                        <option value="pending">Pending</option>
                                        <option value="archived">Archived</option>
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
                                {/* <button type="button" onClick={() => setShow(false)}>Cancel</button> */}
                                <button className="btn-submit" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default ModalTask;