import React from 'react';
import Task from './Task/Task';
import { useContext } from 'react';
import TaskContext from '../context/TaskContext';
function AllTask() {
    const { tasks, filter } = useContext(TaskContext);
    const filteredTasks = tasks.filter((task) => {
        const query = filter.search?.toLowerCase() || "";
        const matchesSearch = !query || task.title.toLowerCase().includes(query) || task.description.toLowerCase().includes(query);
        const matchesPriority = filter.priority === "all" || task.priority === filter.priority;
        return matchesSearch && matchesPriority;
    });

    return (
        <div>
            {
                (filteredTasks.length !== 0) ? (
                    filteredTasks.map((task) => {
                        return (
                            <Task
                                key={task.id}
                                task={task}
                                id={task.id}
                            />
                        )
                    })
                ) : (
                    <h1>No Task Found</h1>
                )
            }
        </div>
    );
}

export default AllTask;