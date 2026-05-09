import React, { useContext } from 'react';
import TaskIndicator from './TaskIndicator';
import CreateTask from './createTask/CreateTask';
import { Outlet } from 'react-router-dom';
import TaskContext from '../context/TaskContext';
function Layout() {
    const { tasks, filter, setFilter } = useContext(TaskContext);
    const total = tasks.length;
    const activeCount = tasks.filter((task) => !task.completed).length;
    const doneCount = tasks.filter((task) => task.completed).length;
    return (
        <div>
            <div className='flex flex-col md:flex-row md:justify-between'>
                <CreateTask />
                <div className='task-container w-auto mx-5 md:w-1/3 mt-3'>
                    <div className='mb-5'>
                        <div className='grid grid-cols-3 gap-3 mb-4 text-sm text-slate-300'>
                            <div className='rounded-2xl bg-slate-900/80 p-4 border border-slate-600/30'>
                                <p className='uppercase tracking-[0.3em] text-xs text-slate-500'>Total tasks</p>
                                <p className='text-2xl font-semibold'>{total}</p>
                            </div>
                            <div className='rounded-2xl bg-slate-900/80 p-4 border border-slate-600/30'>
                                <p className='uppercase tracking-[0.3em] text-xs text-slate-500'>Open</p>
                                <p className='text-2xl font-semibold'>{activeCount}</p>
                            </div>
                            <div className='rounded-2xl bg-slate-900/80 p-4 border border-slate-600/30'>
                                <p className='uppercase tracking-[0.3em] text-xs text-slate-500'>Completed</p>
                                <p className='text-2xl font-semibold'>{doneCount}</p>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row gap-3 items-center'>
                            <input
                                type='search'
                                value={filter.search}
                                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                                placeholder='Search tasks...'
                                className='form-control flex-1'
                            />
                            <select
                                value={filter.priority}
                                onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
                                className='form-control w-full md:w-44'
                            >
                                <option value='all'>All priorities</option>
                                <option value='Low'>Low</option>
                                <option value='Medium'>Medium</option>
                                <option value='High'>High</option>
                            </select>
                        </div>
                    </div>
                    <div className='outlet'>
                        <Outlet />
                    </div>
                    <div className='indicator'>
                        <TaskIndicator />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Layout;