function taskReducer(tasks, action) {
    console.log("taskreducer");
    switch (action.type) {
        case "ADD_TASK": {
            return [
                ...tasks,
                action.task
            ]
        }
        case "SET_TASK": {
            return action.payload.map((task) => ({
                ...task,
                id: task.id || task._id?.toString()
            }))
        }
        case "REMOVE_TASK": {
            return tasks.filter((task) => task.id !== action.id)
        }
        case "MARK_DONE": {
            return tasks.map((task) => {
                if (task.id === action.id) {
                    return {
                        ...task,
                        completed: !task.completed
                    }
                }
                return task
            })
        }
        case "UPDATE_TASK": {
            return tasks.map((task) => {
                if (task.id === action.task.id) {
                    return action.task;
                }
                return task;
            })
        }
        default: {
            throw Error("Unknown Action" + action.type)
        }
    }
}

export default taskReducer;