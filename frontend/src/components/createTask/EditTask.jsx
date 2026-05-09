import React, { useState } from 'react';
import { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from "../../Axios/axios.js"
import "./createTask.css"

function EditTask({ task, onClose }) {
    const { dispatch } = useContext(TaskContext)
    const {userToken} = useContext(TokenContext)
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    const [dueDate, setDueDate] = useState(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : "")
    const [priority, setPriority] = useState(task.priority || "Medium")

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put("/task/updateTask", {
                id: task.id || task._id,
                title,
                description,
                dueDate,
                priority
            },{
              headers: {
                Authorization: `Bearer ${userToken}`
              }
            })
            dispatch({
                type: "UPDATE_TASK",
                task: {
                    ...res.data.task,
                    id: res.data.task._id || res.data.task.id
                }
            })
            onClose(); // Close the edit modal/form
          } catch (error) {
            console.log(error);
          }
    }

    return (
        <div className="create-task addContainer md:w-1/3 md:mx-auto mx-3 mt-3 flex justify-center">
            <div className='w-11/12'>
                <form onSubmit={handleEdit}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            className='form-control' />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="description">Description</label>
                        <textarea
                            rows={5}
                            name="description"
                            id="description"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ resize: "none" }}
                            className='form-control' />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        <div>
                            <label htmlFor="dueDate">Due date</label>
                            <input
                                type="date"
                                id="dueDate"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className='form-control' />
                        </div>
                        <div>
                            <label htmlFor="priority">Priority</label>
                            <select
                                id="priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className='form-control'
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex justify-center mt-4 gap-2'>
                        <button
                            type='submit'
                            className='btn-primary'
                        >Update task</button>
                        <button
                            type='button'
                            onClick={onClose}
                            className='btn-secondary'
                        >Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTask;