import { apiClient } from './client.js';

export const dashboardApi = {
  getStats: async () => {
    const res = await apiClient.get('/api/dashboard/stats');
    return res.data;
  },
};
