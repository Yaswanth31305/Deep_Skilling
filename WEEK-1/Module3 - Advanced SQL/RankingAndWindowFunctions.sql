IF OBJECT_ID('OrderDetails','U') IS NOT NULL DROP TABLE OrderDetails;
IF OBJECT_ID('Orders','U') IS NOT NULL DROP TABLE Orders;
IF OBJECT_ID('Customers','U') IS NOT NULL DROP TABLE Customers;
IF OBJECT_ID('Products','U') IS NOT NULL DROP TABLE Products;

CREATE TABLE Customers (CustomerID INT PRIMARY KEY, Name VARCHAR(50), Region VARCHAR(30));
CREATE TABLE Products (ProductID INT PRIMARY KEY, ProductName VARCHAR(50), Category VARCHAR(30), Price DECIMAL(10,2));
CREATE TABLE Orders (OrderID INT PRIMARY KEY, CustomerID INT, OrderDate DATE, FOREIGN KEY(CustomerID) REFERENCES Customers(CustomerID));
CREATE TABLE OrderDetails (OrderDetailID INT PRIMARY KEY, OrderID INT, ProductID INT, Quantity INT,
    FOREIGN KEY(OrderID) REFERENCES Orders(OrderID), FOREIGN KEY(ProductID) REFERENCES Products(ProductID));

INSERT INTO Customers VALUES (1,'Rahul','North'),(2,'Amit','South'),(3,'Priya','East'),(4,'Neha','West');
INSERT INTO Products VALUES (1,'Laptop A','Electronics',80000),(2,'Laptop B','Electronics',75000),
    (3,'Chair','Furniture',8000),(4,'Table','Furniture',12000),(5,'Shirt','Clothing',2500),(6,'Jeans','Clothing',3000);
INSERT INTO Orders VALUES (101,1,'2025-01-05'),(102,2,'2025-01-10'),(103,1,'2025-02-01'),
    (104,3,'2025-02-15'),(105,4,'2025-03-01'),(106,1,'2025-03-10');
INSERT INTO OrderDetails VALUES (1,101,1,2),(2,101,5,5),(3,102,2,1),(4,103,3,4),
    (5,104,4,2),(6,105,6,8),(7,106,1,1),(8,106,3,3);

SELECT ProductID, ProductName, Category, Price,
    ROW_NUMBER() OVER (PARTITION BY Category ORDER BY Price DESC) AS Row_Number,
    RANK() OVER (PARTITION BY Category ORDER BY Price DESC) AS Rank_Number,
    DENSE_RANK() OVER (PARTITION BY Category ORDER BY Price DESC) AS Dense_Rank
FROM Products;

SELECT * FROM
(
    SELECT *, ROW_NUMBER() OVER (PARTITION BY Category ORDER BY Price DESC) AS RN FROM Products
) T
WHERE RN <= 3;

SELECT c.Region, p.Category, SUM(od.Quantity) AS TotalQuantity
FROM Customers c JOIN Orders o ON c.CustomerID=o.CustomerID
JOIN OrderDetails od ON o.OrderID=od.OrderID
JOIN Products p ON od.ProductID=p.ProductID
GROUP BY GROUPING SETS ((c.Region),(p.Category),(c.Region,p.Category));

SELECT c.Region, p.Category, SUM(od.Quantity) AS TotalQuantity
FROM Customers c JOIN Orders o ON c.CustomerID=o.CustomerID
JOIN OrderDetails od ON o.OrderID=od.OrderID
JOIN Products p ON od.ProductID=p.ProductID
GROUP BY ROLLUP (c.Region, p.Category);

SELECT c.Region, p.Category, SUM(od.Quantity) AS TotalQuantity
FROM Customers c JOIN Orders o ON c.CustomerID=o.CustomerID
JOIN OrderDetails od ON o.OrderID=od.OrderID
JOIN Products p ON od.ProductID=p.ProductID
GROUP BY CUBE (c.Region, p.Category);

WITH Calendar AS
(
    SELECT CAST('2025-01-01' AS DATE) AS Dates
    UNION ALL
    SELECT DATEADD(DAY,1,Dates) FROM Calendar WHERE Dates < '2025-01-31'
)
SELECT * FROM Calendar OPTION(MAXRECURSION 100);

CREATE TABLE StagingProducts (ProductID INT, ProductName VARCHAR(50), Category VARCHAR(30), Price DECIMAL(10,2));
INSERT INTO StagingProducts VALUES (1,'Laptop A','Electronics',82000),(7,'Mobile','Electronics',45000);

MERGE Products AS Target
USING StagingProducts AS Source
ON Target.ProductID = Source.ProductID
WHEN MATCHED THEN UPDATE SET Target.Price = Source.Price
WHEN NOT MATCHED THEN INSERT (ProductID, ProductName, Category, Price)
VALUES (Source.ProductID, Source.ProductName, Source.Category, Source.Price);

SELECT * FROM
(
    SELECT p.ProductName, MONTH(o.OrderDate) AS MonthNo, od.Quantity
    FROM Orders o JOIN OrderDetails od ON o.OrderID=od.OrderID JOIN Products p ON od.ProductID=p.ProductID
) AS SourceTable
PIVOT (SUM(Quantity) FOR MonthNo IN ([1],[2],[3])) AS PivotTable;

WITH CustomerOrderCounts AS
(
    SELECT CustomerID, COUNT(OrderID) AS OrderCount FROM Orders GROUP BY CustomerID
)
SELECT c.CustomerID, c.Name, CustomerOrderCounts.OrderCount
FROM CustomerOrderCounts JOIN Customers c ON c.CustomerID=CustomerOrderCounts.CustomerID
WHERE CustomerOrderCounts.OrderCount > 3;
