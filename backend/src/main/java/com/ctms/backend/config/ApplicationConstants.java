package com.ctms.backend.config;

public class ApplicationConstants {
    
    // API Endpoints
    public static final String CLIENTS_ENDPOINT = "/api/clients";
    public static final String PROJECTS_ENDPOINT = "/api/projects";
    public static final String TASKS_ENDPOINT = "/api/tasks";
    public static final String USERS_ENDPOINT = "/api/users";
    public static final String COMPLIANCE_ENDPOINT = "/api/compliance";
    
    // Database Table Names
    public static final String CLIENT_TABLE_NAME = "clients";
    public static final String COMPLIANCE_TASK_TABLE_NAME = "compliance_tasks";
    
    // Database Column Names
    public static final String CLIENT_ID_COLUMN = "client_id";
    public static final String DUE_DATE_COLUMN = "due_date";
    public static final String CREATED_AT_COLUMN = "created_at";
    public static final String UPDATED_AT_COLUMN = "updated_at";
    
    // Task Status Constants
    public static final String TASK_STATUS_PENDING = "PENDING";
    public static final String TASK_STATUS_COMPLETED = "COMPLETED";
    
}
