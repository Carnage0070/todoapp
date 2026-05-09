import React, { useContext, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import TaskContext from '../../context/TaskContext';
import './Dashboard.css';

const COLORS = ['#00ff88', '#00ccff', '#ff0080', '#ffff00'];

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
            <div className="matrix-rain"></div>
            <h1 className="glitch" data-text="DASHBOARD">DASHBOARD</h1>

            <div className="stats-grid grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="stat-card bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
                    <h3 className="text-lg font-semibold">Total Tasks</h3>
                    <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <div className="stat-card bg-gradient-to-r from-cyan-500 to-cyan-600 p-4 rounded-lg text-white">
                    <h3 className="text-lg font-semibold">Completed</h3>
                    <p className="text-3xl font-bold">{stats.completed}</p>
                </div>
                <div className="stat-card bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-lg text-white">
                    <h3 className="text-lg font-semibold">Pending</h3>
                    <p className="text-3xl font-bold">{stats.pending}</p>
                </div>
                <div className="stat-card bg-gradient-to-r from-pink-500 to-pink-600 p-4 rounded-lg text-white">
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
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(0, 20, 40, 0.9)',
                                    border: '1px solid #00ff88',
                                    borderRadius: '8px',
                                    color: '#ffffff',
                                    fontFamily: 'Courier New, monospace'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card bg-white/10 backdrop-blur-md p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Completion Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.completionData}>
                            <XAxis
                                dataKey="name"
                                tick={{ fill: '#00ccff', fontFamily: 'Courier New, monospace' }}
                                axisLine={{ stroke: '#00ccff' }}
                            />
                            <YAxis
                                tick={{ fill: '#00ccff', fontFamily: 'Courier New, monospace' }}
                                axisLine={{ stroke: '#00ccff' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(0, 20, 40, 0.9)',
                                    border: '1px solid #00ff88',
                                    borderRadius: '8px',
                                    color: '#ffffff',
                                    fontFamily: 'Courier New, monospace'
                                }}
                            />
                            <Legend
                                wrapperStyle={{ color: '#00ccff', fontFamily: 'Courier New, monospace' }}
                            />
                            <Bar dataKey="value" fill="#00ff88" />
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
                                stroke="rgba(0, 255, 136, 0.2)"
                                strokeWidth="3"
                            />
                            <path
                                d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                                fill="none"
                                stroke="#00ff88"
                                strokeWidth="3"
                                strokeDasharray={`${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}, 100`}
                                strokeLinecap="round"
                                style={{
                                    filter: 'drop-shadow(0 0 10px rgba(0, 255, 136, 0.8))',
                                    animation: 'pulse 2s ease-in-out infinite'
                                }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white" style={{
                                fontFamily: 'Courier New, monospace',
                                textShadow: '0 0 20px rgba(0, 255, 136, 0.8)',
                                color: '#00ff88'
                            }}>
                                {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <div className="inline-block px-4 py-2 bg-black/50 border border-green-500 rounded-lg">
                        <span className="text-green-400 font-mono text-sm">
                            STATUS: {stats.completed === stats.total && stats.total > 0 ? 'MISSION ACCOMPLISHED' :
                                   stats.completed > 0 ? 'IN PROGRESS' : 'STANDBY'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;