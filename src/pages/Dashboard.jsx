import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { CheckCircleIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Error fetching tasks');
    } else {
      setTasks(data);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const { error } = await supabase.from('tasks').insert([
      {
        title: newTask.title,
        description: newTask.description,
        user_id: user.id,
      },
    ]);

    if (error) {
      toast.error('Error adding task');
    } else {
      toast.success('Task added successfully');
      setNewTask({ title: '', description: '' });
      setIsAddingTask(false);
      fetchTasks();
    }
  };

  const toggleTaskComplete = async (taskId, currentStatus) => {
    const { error } = await supabase
      .from('tasks')
      .update({ is_completed: !currentStatus })
      .eq('id', taskId);

    if (error) {
      toast.error('Error updating task');
    } else {
      fetchTasks();
    }
  };

  const deleteTask = async (taskId) => {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);

    if (error) {
      toast.error('Error deleting task');
    } else {
      toast.success('Task deleted');
      fetchTasks();
    }
  };

  const completedTasksCount = tasks.filter((task) => task.is_completed).length;
  const progress = tasks.length > 0 ? (completedTasksCount / tasks.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Task Dashboard</h1>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl">Progress</h2>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <button
            onClick={() => setIsAddingTask(!isAddingTask)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            <PlusIcon className="h-5 w-5" />
            Add New Task
          </button>

          {isAddingTask && (
            <form onSubmit={addTask} className="mt-4 space-y-4 bg-gray-800 p-4 rounded-lg">
              <div>
                <input
                  type="text"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <textarea
                  placeholder="Task description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Add Task
              </button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                <p className="text-gray-400">{task.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleTaskComplete(task.id, task.is_completed)}
                  className={`p-2 rounded-lg ${
                    task.is_completed ? 'bg-green-600' : 'bg-gray-600'
                  } hover:opacity-80`}
                >
                  <CheckCircleIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 rounded-lg bg-red-600 hover:bg-red-700"
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}