import React, { useContext, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import TaskContext from '../../context/TaskContext';
import './Dashboard.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Dashboard() {
    const { tasks } = useContext(TaskContext);

    const stats = useMemo(() => {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const pending = total - completed;
        const overdue = tasks.filter(task => !task.completed && task.dueDate && new Date(task.dueDate) < new Date()).length;

        const priorityData = [
            { name: 'High', value: tasks.filter(task => task.priority === 'High').length },
            { name: 'Medium', value: tasks.filter(task => task.priority === 'Medium').length },
            { name: 'Low', value: tasks.filter(task => task.priority === 'Low').length },
        ];

        const completionData = [
            { name: 'Completed', value: completed },
            { name: 'Pending', value: pending },
        ];

        return { total, completed, pending, overdue, priorityData, completionData };
    }, [tasks]);

    return (
        <div className="dashboard p-6">
            <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>

            <div className="stats-grid grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="stat-card bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
                    <h3 className="text-lg font-semibold">Total Tasks</h3>
                    <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <div className="stat-card bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
                    <h3 className="text-lg font-semibold">Completed</h3>
                    <p className="text-3xl font-bold">{stats.completed}</p>
                </div>
                <div className="stat-card bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-lg text-white">
                    <h3 className="text-lg font-semibold">Pending</h3>
                    <p className="text-3xl font-bold">{stats.pending}</p>
                </div>
                <div className="stat-card bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white">
                    <h3 className="text-lg font-semibold">Overdue</h3>
                    <p className="text-3xl font-bold">{stats.overdue}</p>
                </div>
            </div>

            <div className="charts-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="chart-card bg-white/10 backdrop-blur-md p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Tasks by Priority</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={stats.priorityData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {stats.priorityData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card bg-white/10 backdrop-blur-md p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Completion Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.completionData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="progress-circle mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Completion Progress</h3>
                <div className="flex justify-center">
                    <div className="relative">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                                d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                                fill="none"
                                stroke="rgba(255,255,255,0.2)"
                                strokeWidth="2"
                            />
                            <path
                                d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                                fill="none"
                                stroke="#00C49F"
                                strokeWidth="2"
                                strokeDasharray={`${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}, 100`}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">
                                {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;