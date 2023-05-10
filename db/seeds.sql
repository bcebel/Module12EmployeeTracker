
INSERT INTO department (name)
VALUES 
('IT'),
('Finance & Accounting'),
('Sales & Marketing'),
('Operations');

INSERT INTO role (title, salary, department_id)
VALUES
('Full Stack Developer', 87654, 3),
('Software Engineer', 115500, 3),
('Accountant', 102000, 3), 
('Finanical Analyst', 112000, 2),
('Marketing Coordindator', 70000, 3), 
('Sales Lead', 90000, 3),
('Project Manager', 100000, 4),
('Operations Manager', 90000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Brian', 'Edison', 2, null),
('Mark', 'Poole', 1, 1),
('Bill', 'Monto', 4, null),
('Jane', 'Jetson', 3, 3),
('Barney', 'Rubble', 6, null),
('Linda', 'Verde', 5, 5),
('Roger', 'Roy', 7, null),
('Bob', 'Roberts', 8, 7);
