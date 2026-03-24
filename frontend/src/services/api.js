import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://client-compliancetracker-production.up.railway.app";
  
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`Response received: ${response.status} from ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('Response error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    }
    return Promise.reject(error);
  }
);

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
