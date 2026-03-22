import React, { useState, useEffect } from 'react';
import { getClients, createClient } from '../services/api';
import { Users, Building2, Globe, Plus, X } from 'lucide-react';
import './ClientList.css';

const ClientList = ({ onClientSelect, selectedClientId }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state for adding new client
  const [newClient, setNewClient] = useState({
    companyName: '',
    country: '',
    entityType: ''
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await getClients();
      console.log('Clients data received:', response.data);
      setClients(response.data);
      setError(null);
    } catch (err) {
      let errorMessage = 'Failed to fetch clients';
      if (err.response) {
        errorMessage = `Server error: ${err.response.status} - ${err.response.data?.message || 'Unknown error'}`;
      } else if (err.request) {
        errorMessage = 'Network error - unable to reach server. Is the backend running on port 8080?';
      } else {
        errorMessage = `Request error: ${err.message}`;
      }
      setError(errorMessage);
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      const response = await createClient(newClient);
      console.log('Client created:', response.data);
      setClients([...clients, response.data]);
      setShowAddForm(false);
      setNewClient({ companyName: '', country: '', entityType: '' });
      onClientSelect(response.data.id);
    } catch (err) {
      console.error('Error creating client:', err);
      alert('Failed to create client. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setNewClient({
      ...newClient,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="client-list-container">
        <div className="client-list-header">
          <div className="client-list-title-section">
            <div className="client-list-icon">
              <Users className="text-alabaster-grey" size={20} />
            </div>
            <div>
              <h2 className="client-list-title">Clients</h2>
              <p className="client-list-subtitle">Client Portfolio</p>
            </div>
          </div>
        </div>
        <div className="client-list-loading">
          <div className="client-list-spinner"></div>
          <span className="client-list-loading-text">Loading clients...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="client-list-error">
        <div className="client-list-error-header">
          <div className="client-list-error-icon">
            <Users className="text-danger-600" size={20} />
          </div>
          <h2 className="client-list-title">Clients</h2>
        </div>
        <div className="client-list-error-content">
          <div className="client-list-error-dot"></div>
          <span className="client-list-error-text">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="client-list-container">
      <div className="client-list-header">
        <div className="client-list-title-section">
          <div className="client-list-icon">
            <Users className="text-alabaster-grey" size={20} />
          </div>
          <div>
            <h2 className="client-list-title">Clients</h2>
            <p className="client-list-subtitle">Client Portfolio</p>
          </div>
        </div>
        <div className="client-list-badge">
          <span className="client-list-badge-text">
            {clients.length} {clients.length === 1 ? 'client' : 'clients'}
          </span>
        </div>
      </div>
      
      {clients.length === 0 ? (
        <div className="client-list-empty">
          <div className="client-list-empty-icon">
            <Users className="text-dusty-denim" size={32} />
          </div>
          <h3 className="client-list-empty-title">No clients found</h3>
          <p className="client-list-empty-text">Add your first client to get started</p>
          <button 
            className="client-list-empty-button"
            onClick={() => setShowAddForm(true)}
          >
            Add First Client
          </button>
        </div>
      ) : (
        <div className="client-list-cards">
          {clients.map((client, index) => (
            <div
              key={client.id}
              onClick={() => onClientSelect(client.id)}
              className={`client-card ${selectedClientId === client.id ? 'selected' : ''}`}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {/* Selection Indicator */}
              {selectedClientId === client.id && (
                <div className="client-card-selection">
                  <div className="client-card-selection-dot"></div>
                </div>
              )}
              
              <div className="client-card-content">
                <div className="client-card-main">
                  <div className="client-card-header">
                    <div className="client-card-icon">
                      <Building2 className="text-alabaster-grey" size={14} />
                    </div>
                    <div className="client-card-title-section">
                      <h3 className="client-card-title">{client.companyName}</h3>
                      <div className="client-card-status">
                        <div className="client-card-status-dot"></div>
                        <span className="client-card-status-text">Active</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="client-card-details">
                    <div className="client-card-detail">
                      <Building2 className="client-card-detail-icon" size={12} />
                      <span className="client-card-detail-text">{client.entityType}</span>
                    </div>
                    
                    <div className="client-card-detail">
                      <Globe className="client-card-detail-icon" size={12} />
                      <span className="client-card-detail-text">{client.country}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hover Effect */}
              <div className="client-card-hover-effect"></div>
            </div>
          ))}
        </div>
      )}
      
      {/* Add Client Form Modal */}
      {showAddForm && (
        <div className="client-add-form-overlay">
          <div className="client-add-form-container">
            <div className="client-add-form-header">
              <h3 className="client-add-form-title">Add New Client</h3>
              <button 
                className="client-add-form-close"
                onClick={() => setShowAddForm(false)}
              >
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleAddClient} className="client-add-form">
              <div className="client-add-form-group">
                <label className="client-add-form-label">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={newClient.companyName}
                  onChange={handleInputChange}
                  required
                  className="client-add-form-input"
                  placeholder="Enter company name"
                />
              </div>
              
              <div className="client-add-form-group">
                <label className="client-add-form-label">Country *</label>
                <input
                  type="text"
                  name="country"
                  value={newClient.country}
                  onChange={handleInputChange}
                  required
                  className="client-add-form-input"
                  placeholder="Enter country"
                />
              </div>
              
              <div className="client-add-form-group">
                <label className="client-add-form-label">Entity Type *</label>
                <input
                  type="text"
                  name="entityType"
                  value={newClient.entityType}
                  onChange={handleInputChange}
                  required
                  className="client-add-form-input"
                  placeholder="e.g., Corporation, LLC, Partnership"
                />
              </div>
              
              <div className="client-add-form-actions">
                <button
                  type="button"
                  className="client-add-form-button client-add-form-button-cancel"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="client-add-form-button client-add-form-button-submit"
                >
                  Add Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;
