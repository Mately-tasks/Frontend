import axios from 'axios';
import { Platform } from 'react-native';
import { ITask } from '../models/Task';

const BASE_URL = 'http://192.168.1.219:3000';
/**
 * Fetch tasks created strictly after the provided date.
 */
export const fetchTasksAPI = async (afterDate: string): Promise<ITask[]> => {
  const response = await axios.get(`${BASE_URL}/tasks?after=${afterDate}`);
  return response.data;
};

/**
 * Trigger the backend simulation to generate 10 tasks.
 */
export const simulateTasksAPI = async (): Promise<void> => {
  await axios.post(`${BASE_URL}/simulate`);
};