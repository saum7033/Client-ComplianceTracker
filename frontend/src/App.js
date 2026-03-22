import React, { useState } from 'react';
import ClientList from './components/ClientList';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import './App.css';

function App() {
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [refreshTasks, setRefreshTasks] = useState(0);

  const handleClientSelect = (clientId) => {
    setSelectedClientId(clientId);
  };

  const handleTaskAdded = () => {
    setRefreshTasks(prev => prev + 1);
  };

  return (
    <div className="app-bg-prussian min-h-screen">
      <header className="bg-ink-black text-alabaster-grey shadow-soft border-b border-dusk-blue glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-dusty-denim rounded-lg flex items-center justify-center mr-4 shadow-soft">
                <div className="w-6 h-6 bg-alabaster-grey rounded-sm"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-alabaster-grey text-smooth">
                  Mini Compliance Tracker
                </h1>
                <div className="text-sm text-dusty-denim text-smooth">
                  LedgersCFO Compliance Management
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-dusty-denim text-smooth">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ClientList 
              onClientSelect={handleClientSelect} 
              selectedClientId={selectedClientId}
            />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <AddTaskForm 
              clientId={selectedClientId} 
              onTaskAdded={handleTaskAdded}
            />
            <TaskList 
              clientId={selectedClientId} 
              key={`${selectedClientId}-${refreshTasks}`}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
