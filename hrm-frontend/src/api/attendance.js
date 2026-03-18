import { apiClient } from './client.js';

export const attendanceApi = {
  getAll: async (params) => {
    const res = await apiClient.get('/api/attendance', { params });
    return res.data;
  },

  mark: async (data) => {
    const res = await apiClient.post('/api/attendance', data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await apiClient.put(`/api/attendance/${id}`, data);
    return res.data;
  },

  delete: async (id) => {
    await apiClient.delete(`/api/attendance/${id}`);
  },

  getByEmployee: async (employeeId) => {
    const res = await apiClient.get(`/api/attendance/employee/${employeeId}`);
    return res.data;
  },
};
