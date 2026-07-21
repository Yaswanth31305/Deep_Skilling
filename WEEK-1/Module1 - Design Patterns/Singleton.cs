using System;

public sealed class Singleton
{
    private static Singleton instance = null;
    private Singleton()
    {
        Console.WriteLine("Singleton Instance Created");
    }
    public static Singleton GetInstance()
    {
        if (instance == null)
            instance = new Singleton();
        return instance;
    }
    public void DisplayMessage()
    {
        Console.WriteLine("Hello from Singleton Instance");
    }
}

class Program
{
    static void Main(string[] args)
    {
        Singleton obj1 = Singleton.GetInstance();
        Singleton obj2 = Singleton.GetInstance();
        obj1.DisplayMessage();
        Console.WriteLine("Are both objects same? " + Object.ReferenceEquals(obj1, obj2));
    }
}
