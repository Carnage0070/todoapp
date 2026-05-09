import moment from "moment"
function CompletedTask({task}) {
    return ( 
        <div className='task-card completed'>
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
        </div>
     );
}

export default CompletedTask;