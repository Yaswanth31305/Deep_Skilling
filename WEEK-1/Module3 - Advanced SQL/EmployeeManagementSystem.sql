IF OBJECT_ID('vw_EmployeeReport','V') IS NOT NULL DROP VIEW vw_EmployeeReport;
IF OBJECT_ID('vw_EmployeeAnnualSalary','V') IS NOT NULL DROP VIEW vw_EmployeeAnnualSalary;
IF OBJECT_ID('vw_EmployeeFullName','V') IS NOT NULL DROP VIEW vw_EmployeeFullName;
IF OBJECT_ID('vw_EmployeeBasicInfo','V') IS NOT NULL DROP VIEW vw_EmployeeBasicInfo;
IF OBJECT_ID('Employees','U') IS NOT NULL DROP TABLE Employees;
IF OBJECT_ID('Departments','U') IS NOT NULL DROP TABLE Departments;

CREATE TABLE Departments
(
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(100)
);

CREATE TABLE Employees
(
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DepartmentID INT,
    Salary DECIMAL(10,2),
    JoinDate DATE,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);

INSERT INTO Departments VALUES
(1,'Human Resources'),
(2,'Information Technology'),
(3,'Finance'),
(4,'Sales');

INSERT INTO Employees VALUES
(101,'Rahul','Sharma',2,60000,'2022-01-15'),
(102,'Priya','Reddy',1,50000,'2021-06-20'),
(103,'Amit','Kumar',3,70000,'2020-03-10'),
(104,'Neha','Patel',2,65000,'2023-02-01'),
(105,'Kiran','Verma',4,55000,'2022-08-12');
GO

CREATE VIEW vw_EmployeeBasicInfo AS
SELECT E.EmployeeID, E.FirstName, E.LastName, D.DepartmentName
FROM Employees E JOIN Departments D ON E.DepartmentID = D.DepartmentID;
GO

CREATE VIEW vw_EmployeeFullName AS
SELECT E.EmployeeID, E.FirstName + ' ' + E.LastName AS FullName, D.DepartmentName
FROM Employees E JOIN Departments D ON E.DepartmentID = D.DepartmentID;
GO

CREATE VIEW vw_EmployeeAnnualSalary AS
SELECT E.EmployeeID, E.FirstName, E.LastName, D.DepartmentName, E.Salary, E.Salary * 12 AS AnnualSalary
FROM Employees E JOIN Departments D ON E.DepartmentID = D.DepartmentID;
GO

CREATE VIEW vw_EmployeeReport AS
SELECT E.EmployeeID, E.FirstName + ' ' + E.LastName AS FullName, D.DepartmentName,
    E.Salary * 12 AS AnnualSalary, (E.Salary * 12) * 0.10 AS Bonus
FROM Employees E JOIN Departments D ON E.DepartmentID = D.DepartmentID;
GO

SELECT * FROM vw_EmployeeBasicInfo;
SELECT * FROM vw_EmployeeFullName;
SELECT * FROM vw_EmployeeAnnualSalary;
SELECT * FROM vw_EmployeeReport;
GO
