using System;

class Product
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public string Category { get; set; }
    public Product(int productId, string productName, string category)
    {
        ProductId = productId;
        ProductName = productName;
        Category = category;
    }
    public override string ToString()
    {
        return $"[ID={ProductId}, Name={ProductName}, Category={Category}]";
    }
}

class SearchFunctions
{
    static Product LinearSearch(Product[] products, string searchTerm)
    {
        for (int i = 0; i < products.Length; i++)
        {
            if (products[i].ProductName.Equals(searchTerm, StringComparison.OrdinalIgnoreCase) ||
                products[i].Category.Equals(searchTerm, StringComparison.OrdinalIgnoreCase))
                return products[i];
        }
        return null;
    }

    static Product BinarySearch(Product[] products, string searchTerm)
    {
        int left = 0;
        int right = products.Length - 1;
        while (left <= right)
        {
            int mid = left + (right - left) / 2;
            int comparison = string.Compare(products[mid].ProductName, searchTerm, StringComparison.OrdinalIgnoreCase);
            if (comparison == 0) return products[mid];
            else if (comparison < 0) left = mid + 1;
            else right = mid - 1;
        }
        return null;
    }

    static void Main(string[] args)
    {
        Product[] unsorted = {
            new Product(1, "Laptop", "Electronics"),
            new Product(2, "Mobile", "Electronics"),
            new Product(3, "Chair", "Furniture"),
            new Product(4, "Keyboard", "Electronics"),
            new Product(5, "Table", "Furniture")
        };

        Console.WriteLine("=== Linear Search ===");
        Product r1 = LinearSearch(unsorted, "Keyboard");
        Console.WriteLine("Keyboard : " + (r1 != null ? r1.ToString() : "Not Found"));
        Product r2 = LinearSearch(unsorted, "Shirt");
        Console.WriteLine("Shirt    : " + (r2 != null ? r2.ToString() : "Not Found"));

        Product[] sorted = {
            new Product(3, "Chair", "Furniture"),
            new Product(4, "Keyboard", "Electronics"),
            new Product(1, "Laptop", "Electronics"),
            new Product(2, "Mobile", "Electronics"),
            new Product(5, "Table", "Furniture")
        };

        Console.WriteLine("\n=== Binary Search ===");
        Product r3 = BinarySearch(sorted, "Laptop");
        Console.WriteLine("Laptop   : " + (r3 != null ? r3.ToString() : "Not Found"));
        Product r4 = BinarySearch(sorted, "Shirt");
        Console.WriteLine("Shirt    : " + (r4 != null ? r4.ToString() : "Not Found"));

        Console.WriteLine("\n=== Complexity ===");
        Console.WriteLine("Linear Search - Best: O(1), Worst: O(n)");
        Console.WriteLine("Binary Search - Best: O(1), Worst: O(log n) [sorted data required]");
    }
}
