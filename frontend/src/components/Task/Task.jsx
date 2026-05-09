import React, { useState } from 'react';
import moment from 'moment';
import "./task.css";
import { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from "../../Axios/axios.js"
import EditTask from '../createTask/EditTask';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
function Task({ task, id }) {
    const { dispatch } = useContext(TaskContext);
    const {userToken} = useContext(TokenContext);
    const [isEditing, setIsEditing] = useState(false);
    const taskId = task.id || id;

    const handleRemove = async (e) => {
        e.preventDefault();
        try {
            await axios.get("/task/removeTask", {
                params: { id: taskId },
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            dispatch({
                type: "REMOVE_TASK",
                id: taskId
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleMarkDone = async (e) => {
        const newCompleted = !task.completed;
        try {
            const res = await axios.put("/task/updateTask", {
                id: taskId,
                completed: newCompleted
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            dispatch({
                type: "UPDATE_TASK",
                task: {
                    ...res.data.task,
                    id: res.data.task._id || res.data.task.id
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleCloseEdit = () => {
        setIsEditing(false);
    }
    return (
        <>
            <div className='task-card'>
                <div className="mark-done">
                    <input type="checkbox" className="checkbox" onChange={handleMarkDone} checked={task.completed} />
                </div>
                <div className="task-info text-slate-900 text-sm w-10/12">
                    <div className='flex flex-wrap items-center gap-3 mb-2'>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${task.priority === 'High' ? 'bg-red-500/20 text-red-200' : task.priority === 'Low' ? 'bg-emerald-500/20 text-emerald-200' : 'bg-sky-500/20 text-sky-200'}`}>
                            {task.priority || 'Medium'}
                        </span>
                        <span className='text-xs text-slate-400'>
                            {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No due date'}
                        </span>
                    </div>
                    <h4 className="task-title text-lg capitalize">{task.title}</h4>
                    <p className="task-description">{task.description}</p>
                    <div className=' italic opacity-60'>
                        {
                            task?.createdAt ? (
                                <p>{moment(task.createdAt).fromNow()}</p>
                            ) : (
                                <p>just now</p>
                            )
                        }
                    </div>
                </div>
                <div className="remove-task text-sm text-white flex gap-2">
                    <EditIcon
                        style={{ fontSize: 30, cursor: "pointer" }}
                        size="large"
                        onClick={handleEdit}
                        className="edit-task-btn bg-green-700 rounded-full border-2 shadow-2xl border-white p-1" />
                    <DeleteIcon
                        style={{ fontSize: 30, cursor: "pointer" }}
                        size="large"
                        onClick={handleRemove}
                        className="remove-task-btn bg-red-700 rounded-full border-2 shadow-2xl border-white p-1" />
                </div>
            </div>
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <EditTask task={task} onClose={handleCloseEdit} />
                </div>
            )}
        </>
    );
}

export default Task;