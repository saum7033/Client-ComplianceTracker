import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Client API calls
export const getClients = () => api.get('/clients');
export const getClientById = (id) => api.get(`/clients/${id}`);
export const createClient = (clientData) => api.post('/clients', clientData);

// Task API calls
export const getTasksForClient = (clientId, status = null, category = null) => {
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  if (category) params.append('category', category);
  return api.get(`/tasks/client/${clientId}?${params.toString()}`);
};

export const getOverdueTasksForClient = (clientId) => api.get(`/tasks/client/${clientId}/overdue`);
export const createTask = (taskData) => api.post('/tasks', taskData);
export const updateTaskStatus = (taskId, status) => api.put(`/tasks/${taskId}/status?status=${status}`);
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);

export default api;
