import React from 'react';
import { NavLink } from 'react-router-dom';

function TaskIndicator() {
    return (
        <div className='task-nav w-full'>
            <nav className='flex justify-center'>
                <ul className='task-nav-list flex gap-2 md:gap-4 bg-slate-900/90 backdrop-blur-sm rounded-2xl p-2 border border-slate-700/50 shadow-lg'>
                    <li>
                        <NavLink to="/" className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-slate-800/50 hover:text-white">
                            All Tasks
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/active" className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-slate-800/50 hover:text-white">
                            Active
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/completed" className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-slate-800/50 hover:text-white">
                            Completed
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard" className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-slate-800/50 hover:text-white">
                            Dashboard
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
     );
}

export default TaskIndicator;