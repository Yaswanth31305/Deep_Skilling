using System;

class Program
{
    static int LinearSearch(string[] products, string item)
    {
        for (int i = 0; i < products.Length; i++)
        {
            if (products[i].Equals(item, StringComparison.OrdinalIgnoreCase))
            {
                return i;
            }
        }

        return -1;
    }

    static void Main(string[] args)
    {
        string[] products =
        {
            "Laptop",
            "Mobile",
            "Keyboard",
            "Mouse",
            "Monitor"
        };

        Console.Write("Enter product to search: ");
        string item = Console.ReadLine();

        int index = LinearSearch(products, item);

        if (index != -1)
        {
            Console.WriteLine("Product Found at Position : " + index);
        }
        else
        {
            Console.WriteLine("Product Not Found");
        }
    }
}