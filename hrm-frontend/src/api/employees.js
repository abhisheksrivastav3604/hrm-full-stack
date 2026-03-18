import { apiClient } from './client.js';

export const employeeApi = {
  getAll: async (search, department) => {
    const params = {};
    if (search) params.search = search;
    if (department) params.department = department;
    const res = await apiClient.get('/api/employee', { params });
    return res.data;
  },

  create: async (data) => {
    const res = await apiClient.post('/api/employee', data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await apiClient.put(`/api/employee/${id}`, data);
    return res.data;
  },

  delete: async (id) => {
    await apiClient.delete(`/api/employee/${id}`);
  },

  getDepartments: async () => {
    const res = await apiClient.get('/api/employee/department');
    return res.data;
  },
};
