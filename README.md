# Mini Compliance Tracker

A simple web application to track compliance tasks for multiple clients at LedgersCFO.

## Features

- **Client Management**: View and select clients
- **Task Management**: 
  - View tasks for selected clients
  - Add new tasks with categories and priorities
  - Update task status (Pending → In Progress → Completed)
  - Delete tasks
- **Filtering**: Filter tasks by status and category
- **Overdue Task Highlighting**: Automatically identifies and highlights overdue pending tasks
- **Responsive Design**: Clean, modern UI using Tailwind CSS

## Technology Stack

### Backend
- **Spring Boot 4.0.4** with Java 17
- **Spring Data JPA** for database operations
- **PostgreSQL** database
- **Maven** for dependency management

### Frontend
- **React 18** with functional components
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Lucide React** for icons

## Database Schema

```sql
Clients {
  id int PK
  company_name varchar
  country varchar
  entity_type varchar
  created_at timestamp
  updated_at timestamp
}

Compliance_Tasks {
  id int PK
  client_id int FK
  title varchar
  description text
  category varchar
  due_date date
  status varchar
  priority varchar
  created_at timestamp
  updated_at timestamp
}

Clients ||--o{ Compliance_Tasks : "has"
```

## Setup Instructions

### Prerequisites
- Java 17+
- Node.js 16+
- PostgreSQL 12+
- Maven 3.6+

### Database Setup
1. Install PostgreSQL on your system
2. Create a database named `ctms_db`
3. Update database credentials in `backend/src/main/resources/application.properties` if needed

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build and run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The frontend will start on `http://localhost:3000`

### Sample Data
The application automatically seeds sample data on startup:
- 3 clients (Tech Solutions Inc., Global Manufacturing Ltd., Digital Services GmbH)
- 7 compliance tasks with various statuses and due dates

## API Endpoints

### Clients
- `GET /api/clients` - Get all clients
- `GET /api/clients/{id}` - Get client by ID
- `POST /api/clients` - Create new client
- `PUT /api/clients/{id}` - Update client
- `DELETE /api/clients/{id}` - Delete client

### Tasks
- `GET /api/tasks/client/{clientId}` - Get tasks for a client (with optional status/category filters)
- `GET /api/tasks/client/{clientId}/overdue` - Get overdue tasks for a client
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}/status?status={status}` - Update task status
- `DELETE /api/tasks/{id}` - Delete task

## Usage

1. **Select a Client**: Choose a client from the left sidebar to view their tasks
2. **View Tasks**: See all tasks for the selected client with status indicators
3. **Add Tasks**: Click "Add New Task" to create compliance tasks
4. **Update Status**: Use the dropdown to change task status
5. **Filter Tasks**: Use the filter panel to narrow down tasks by status or category
6. **Identify Overdue Tasks**: Overdue pending tasks are highlighted with red border and "OVERDUE" badge

## Tradeoffs

1. **Database Choice**: Used PostgreSQL for production readiness but could use SQLite for simpler deployment
2. **Frontend Framework**: Chose React for familiarity, but Vue.js would have been equally suitable
3. **Styling**: Used Tailwind CSS for rapid development, but Material-UI could provide more consistent design system
4. **State Management**: Used simple React state instead of Redux for this small application
5. **Authentication**: Not implemented for this demo version

## Assumptions

1. Single-user system (no authentication required)
2. PostgreSQL database is available and configured
3. Tasks are automatically marked as overdue if due date passes and status is not "COMPLETED"
4. Client information is basic (company name, country, entity type)
5. Task categories are predefined but can be extended

## Future Enhancements

- User authentication and authorization
- Advanced search and sorting
- Dashboard with summary statistics
- Email notifications for overdue tasks
- File attachments for tasks
- Bulk operations on tasks
- Export functionality (PDF, Excel)
- Mobile app version
