import React, { useState } from 'react';
import { createTask } from '../services/api';
import { Plus, X } from 'lucide-react';
import './AddTaskForm.css';

const AddTaskForm = ({ clientId, onTaskAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Tax Compliance',
    dueDate: '',
    priority: 'MEDIUM'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Tax Compliance', 'Licensing', 'Financial Reporting', 'Corporate Compliance'];
  const priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientId) return;

    try {
      setLoading(true);
      setError('');
      
      const taskData = {
        clientId,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        dueDate: formData.dueDate,
        priority: formData.priority
      };

      await createTask(taskData);
      onTaskAdded();
      resetForm();
      setShowForm(false);
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Tax Compliance',
      dueDate: '',
      priority: 'MEDIUM'
    });
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!clientId) {
    return null;
  }

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="add-task-button"
      >
        <div className="add-task-button-content">
          <Plus size={20} className="add-task-button-icon" />
          <span className="add-task-button-text">Add New Task</span>
        </div>
      </button>
    );
  }

  return (
    <div className="add-task-form-container">
      <div className="add-task-form-header">
        <div className="add-task-form-title-section">
          <div className="add-task-form-icon">
            <Plus className="text-alabaster-grey" size={20} />
          </div>
          <div>
            <h3 className="add-task-form-title">Add New Task</h3>
            <p className="add-task-form-subtitle">Create a new task</p>
          </div>
        </div>
        <button
          onClick={() => {
            setShowForm(false);
            resetForm();
          }}
          className="add-task-form-close-button"
          title="Close form"
        >
          <X size={16} />
        </button>
      </div>

      {error && (
        <div className="add-task-form-error">
          <div className="add-task-form-error-dot"></div>
          <span className="add-task-form-error-text">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="add-task-form-group">
          <label className="add-task-form-label">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="add-task-form-input"
            placeholder="Enter task title"
          />
        </div>

        <div className="add-task-form-group">
          <label className="add-task-form-label">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="add-task-form-textarea"
            placeholder="Enter task description (optional)"
          />
        </div>

        <div className="add-task-form-grid">
          <div className="add-task-form-group">
            <label className="add-task-form-label">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="add-task-form-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="add-task-form-group">
            <label className="add-task-form-label">
              Priority *
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
              className="add-task-form-select"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="add-task-form-group">
          <label className="add-task-form-label">
            Due Date *
          </label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className="add-task-form-input"
          />
        </div>

        <div className="add-task-form-actions">
          <button
            type="button"
            onClick={() => {
              setShowForm(false);
              resetForm();
            }}
            className="add-task-form-button add-task-form-button-cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="add-task-form-button add-task-form-button-submit"
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <div className="add-task-form-spinner"></div>
                Creating...
              </span>
            ) : (
              'Create Task'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
