INSERT INTO compliance_tasks (client_id, title, description, category, due_date, status, priority, created_at, updated_at) 
VALUES 
-- Tasks for Client 1 (Tech Solutions Inc.)
(7, 'Annual Tax Filing', 'File federal and state tax returns for 2024', 'Tax Compliance', CURRENT_DATE + INTERVAL '30 days', 'PENDING', 'HIGH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Business License Renewal', 'Renew state business license before expiration', 'Licensing', CURRENT_DATE - INTERVAL '5 days', 'PENDING', 'URGENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Quarterly Financial Report', 'Prepare and submit Q3 financial statements', 'Financial Reporting', CURRENT_DATE + INTERVAL '15 days', 'IN_PROGRESS', 'MEDIUM', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Tasks for Client 2 (Global Manufacturing Ltd.)
(8, 'GST/HST Filing', 'File quarterly GST/HST return', 'Tax Compliance', CURRENT_DATE + INTERVAL '45 days', 'PENDING', 'HIGH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Annual Corporate Return', 'File annual corporate return with CRA', 'Corporate Compliance', CURRENT_DATE + INTERVAL '60 days', 'PENDING', 'MEDIUM', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Tasks for Client 3 (Digital Services GmbH)
(9, 'VAT Return', 'Submit monthly VAT return', 'Tax Compliance', CURRENT_DATE + INTERVAL '10 days', 'PENDING', 'HIGH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'Trade License Update', 'Update trade license information', 'Licensing', CURRENT_DATE - INTERVAL '10 days', 'COMPLETED', 'LOW', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- OVERDUE TASKS
(7, 'Payroll Tax Deposit', 'Submit monthly payroll tax deposits', 'Tax Compliance', CURRENT_DATE - INTERVAL '15 days', 'PENDING', 'URGENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Employee Benefits Reporting', 'Submit annual employee benefits report', 'HR Compliance', CURRENT_DATE - INTERVAL '20 days', 'IN_PROGRESS', 'HIGH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(8, 'Environmental Compliance Report', 'Submit quarterly environmental impact report', 'Regulatory Compliance', CURRENT_DATE - INTERVAL '25 days', 'PENDING', 'HIGH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Workplace Safety Inspection', 'Complete annual workplace safety inspection', 'Safety Compliance', CURRENT_DATE - INTERVAL '30 days', 'PENDING', 'MEDIUM', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(9, 'Data Privacy Audit', 'Conduct annual data privacy compliance audit', 'Data Protection', CURRENT_DATE - INTERVAL '12 days', 'IN_PROGRESS', 'URGENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'Anti-Money Laundering Report', 'Submit AML compliance report', 'Financial Compliance', CURRENT_DATE - INTERVAL '8 days', 'PENDING', 'HIGH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
