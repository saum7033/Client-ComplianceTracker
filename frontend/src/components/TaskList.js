import React, { useState, useEffect, useCallback } from 'react';
import { getTasksForClient, updateTaskStatus, deleteTask } from '../services/api';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Calendar, 
  Tag, 
  Trash2,
  Filter,
  CheckSquare
} from 'lucide-react';
import './TaskList.css';

const TaskList = ({ clientId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ status: '', category: '' });
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Tax Compliance', 'Licensing', 'Financial Reporting', 'Corporate Compliance'];
  const statuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE'];

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getTasksForClient(
        clientId, 
        filters.status || null, 
        filters.category || null
      );
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [clientId, filters]);

  useEffect(() => {
    if (clientId) {
      fetchTasks();
    }
  }, [clientId, fetchTasks]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      fetchTasks(); // Refresh tasks
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        fetchTasks(); // Refresh tasks
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle2 className="text-success-500" size={16} />;
      case 'IN_PROGRESS':
        return <Clock className="text-info-500" size={16} />;
      case 'PENDING':
        return <Clock className="text-warning-500" size={16} />;
      case 'OVERDUE':
        return <AlertCircle className="text-danger-500" size={16} />;
      default:
        return <Clock className="text-gray-500" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'status-completed';
      case 'IN_PROGRESS':
        return 'status-in-progress';
      case 'PENDING':
        return 'status-pending';
      case 'OVERDUE':
        return 'status-overdue';
      default:
        return 'status-pending';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'URGENT':
        return 'priority-urgent';
      case 'HIGH':
        return 'priority-high';
      case 'MEDIUM':
        return 'priority-medium';
      case 'LOW':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  if (!clientId) {
    return (
      <div className="task-list-container">
        <div className="task-list-header">
          <div className="task-list-title-section">
            <div className="task-list-icon">
              <CheckSquare className="text-alabaster-grey" size={20} />
            </div>
            <div>
              <h2 className="task-list-title">Tasks</h2>
              <p className="task-list-subtitle">Task Management</p>
            </div>
          </div>
        </div>
        <div className="task-list-empty">
          <div className="task-list-empty-icon">
            <CheckSquare className="text-dusty-denim" size={32} />
          </div>
          <h3 className="task-list-empty-title">No client selected</h3>
          <p className="task-list-empty-text">Select a client to view tasks</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="task-list-container">
        <div className="task-list-header">
          <div className="task-list-title-section">
            <div className="task-list-icon">
              <CheckSquare className="text-alabaster-grey" size={20} />
            </div>
            <div>
              <h2 className="task-list-title">Tasks</h2>
              <p className="task-list-subtitle">Task Management</p>
            </div>
          </div>
        </div>
        <div className="task-list-loading">
          <div className="task-list-spinner"></div>
          <span className="task-list-loading-text">Loading tasks...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-list-error">
        <div className="task-list-error-header">
          <div className="task-list-error-icon">
            <AlertCircle className="text-danger-600" size={20} />
          </div>
          <h2 className="task-list-title">Tasks</h2>
        </div>
        <div className="task-list-error-content">
          <div className="task-list-error-dot"></div>
          <span className="task-list-error-text">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <div className="task-list-title-section">
          <div className="task-list-icon">
            <CheckSquare className="text-alabaster-grey" size={20} />
          </div>
          <div>
            <h2 className="task-list-title">Tasks</h2>
            <p className="task-list-subtitle">Task Management</p>
          </div>
        </div>
        <div className="task-list-badge">
          <span className="task-list-badge-text">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>
      </div>

      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`task-list-filter-toggle ${showFilters ? 'active' : ''}`}
      >
        <Filter size={14} className="task-list-filter-toggle-icon" />
        Filters
      </button>

      {showFilters && (
        <div className="task-list-filters">
          <div className="task-list-filters-grid">
            <div className="task-list-filter-group">
              <label className="task-list-filter-label">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="task-list-filter-select"
              >
                <option value="">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="task-list-filter-group">
              <label className="task-list-filter-label">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="task-list-filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="task-list-empty">
          <div className="task-list-empty-icon">
            <CheckSquare className="text-dusty-denim" size={32} />
          </div>
          <h3 className="task-list-empty-title">No tasks found</h3>
          <p className="task-list-empty-text">Try adjusting your filters or add a new task</p>
        </div>
      ) : (
        <div className="task-list-cards">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className={`task-card ${getStatusColor(task.status)}`}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="task-card-content">
                <div className="task-card-main">
                  <div className="task-card-header">
                    <div className="task-card-icon">
                      {getStatusIcon(task.status)}
                    </div>
                    <div className="task-card-title-section">
                      <h3 className="task-card-title">{task.title}</h3>
                      <div className="task-card-status">
                        <div className="task-card-status-dot"></div>
                        <span className="task-card-status-text">{task.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  {task.description && (
                    <p className="task-card-description">{task.description}</p>
                  )}
                  
                  <div className="task-card-details">
                    <div className="task-card-detail">
                      <Tag className="task-card-detail-icon" size={12} />
                      <span className="task-card-detail-text">{task.category}</span>
                    </div>
                    
                    <div className="task-card-detail">
                      <Calendar className="task-card-detail-icon" size={12} />
                      <span className="task-card-detail-text">{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="task-card-meta">
                    <span className={`task-card-badge ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                    <span className={`task-card-badge ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
                
                <div className="task-card-actions">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className="task-card-status-select"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                  
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="task-card-delete-button"
                    title="Delete task"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              
              {/* Hover Effect */}
              <div className="task-card-hover-effect"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
