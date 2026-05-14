import React, { useContext, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import TaskContext from '../../context/TaskContext';
import './Dashboard.css';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

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
            <h1>DASHBOARD</h1>

            <div className="stats-grid grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="stat-card p-6">
                    <h3 className="text-sm font-semibold">Total Tasks</h3>
                    <p className="text-3xl font-bold mt-2">{stats.total}</p>
                </div>
                <div className="stat-card p-6">
                    <h3 className="text-sm font-semibold">Completed</h3>
                    <p className="text-3xl font-bold mt-2">{stats.completed}</p>
                </div>
                <div className="stat-card p-6">
                    <h3 className="text-sm font-semibold">Pending</h3>
                    <p className="text-3xl font-bold mt-2">{stats.pending}</p>
                </div>
                <div className="stat-card p-6">
                    <h3 className="text-sm font-semibold">Overdue</h3>
                    <p className="text-3xl font-bold mt-2">{stats.overdue}</p>
                </div>
            </div>

            <div className="charts-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="chart-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Tasks by Priority</h3>
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
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    color: '#1f2937',
                                    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Completion Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.completionData}>
                            <XAxis
                                dataKey="name"
                                tick={{ fill: '#6b7280', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}
                                axisLine={{ stroke: '#e5e7eb' }}
                            />
                            <YAxis
                                tick={{ fill: '#6b7280', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}
                                axisLine={{ stroke: '#e5e7eb' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    color: '#1f2937',
                                    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
                                }}
                            />
                            <Legend
                                wrapperStyle={{ color: '#1f2937', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}
                            />
                            <Bar dataKey="value" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="progress-circle mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Completion Progress</h3>
                <div className="flex justify-center">
                    <div className="relative">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                                d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                                fill="none"
                                stroke="#e5e7eb"
                                strokeWidth="3"
                            />
                            <path
                                d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="3"
                                strokeDasharray={`${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}, 100`}
                                strokeLinecap="round"
                                style={{
                                    filter: 'none',
                                    transition: 'stroke-dasharray 0.3s ease'
                                }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-900" style={{
                                fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
                                textShadow: 'none',
                                color: '#1f2937'
                            }}>
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