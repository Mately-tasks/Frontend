import { apiClient } from './client';
import { ITask } from '../models/Task';

export const taskService = {

  /**
   * Récupère les tâches après une date donnée
   */
  getTasks: async (afterDate: string): Promise<ITask[]> => {
    const url =`/tasks?after=${encodeURIComponent(afterDate)}` ;
    const response = await apiClient.get<ITask[]>(url);
    return response.data;
  },

  /**
   * Lance la simulation de 10 tâches côté backend
   */
  simulateTasks: async (): Promise<void> => {
    await apiClient.post('/simulate');
  }
};