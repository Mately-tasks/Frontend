import { useState, useEffect, useCallback, useRef } from 'react';
import { ITask } from '../models/Task';
import { fetchTasksAPI, simulateTasksAPI } from '../api/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  
  const lastDateRef = useRef<string>("2000-01-01T00:00:00.000Z");

  const fetchNewTasks = useCallback(async () => {
    try {
      const newTasks = await fetchTasksAPI(lastDateRef.current);

      if (newTasks.length > 0) {
        const lastTask = newTasks[newTasks.length - 1];
        lastDateRef.current = lastTask.createdAt;

        setTasks((prevTasks) => {
          const existingIds = new Set(prevTasks.map(t => t._id));
          const uniqueNewTasks = newTasks.filter(t => !existingIds.has(t._id));
          
          return [...prevTasks, ...uniqueNewTasks];
        });
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  const handleSimulate = async () => {
    try {
      await simulateTasksAPI();
    } catch (error) {
      console.error("Simulation error:", error);
    }
  };

  useEffect(() => {
    fetchNewTasks();

    const intervalId = setInterval(() => {
      fetchNewTasks();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [fetchNewTasks]);

  return { tasks, handleSimulate };
};