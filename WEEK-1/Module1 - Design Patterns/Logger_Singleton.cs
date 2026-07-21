using System;

public sealed class Logger
{
    private static Logger instance;
    private Logger() {}
    public static Logger GetInstance()
    {
        if (instance == null)
            instance = new Logger();
        return instance;
    }
    public void Log(string message)
    {
        Console.WriteLine("Log: " + message);
    }
}

class TestSingleton
{
    static void Main(string[] args)
    {
        Logger logger1 = Logger.GetInstance();
        Logger logger2 = Logger.GetInstance();
        Console.WriteLine(object.ReferenceEquals(logger1, logger2));
        logger1.Log("Test message");
    }
}
