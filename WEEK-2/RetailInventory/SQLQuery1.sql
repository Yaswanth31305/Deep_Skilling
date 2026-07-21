SELECT p.ProductId, p.Name AS ProductName, p.Price, p.Quantity, c.Name AS CategoryName
FROM Products p
INNER JOIN Categories c ON p.CategoryId = c.CategoryId;
