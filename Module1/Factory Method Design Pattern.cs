using System;

interface INotification
{
    void Send();
}

class EmailNotification : INotification
{
    public void Send()
    {
        Console.WriteLine("Email Notification Sent");
    }
}

class SMSNotification : INotification
{
    public void Send()
    {
        Console.WriteLine("SMS Notification Sent");
    }
}

abstract class NotificationFactory
{
    public abstract INotification CreateNotification();
}

class EmailFactory : NotificationFactory
{
    public override INotification CreateNotification()
    {
        return new EmailNotification();
    }
}

class SMSFactory : NotificationFactory
{
    public override INotification CreateNotification()
    {
        return new SMSNotification();
    }
}

class Program
{
    static void Main(string[] args)
    {
        NotificationFactory factory;

        factory = new EmailFactory();
        INotification email = factory.CreateNotification();
        email.Send();

        factory = new SMSFactory();
        INotification sms = factory.CreateNotification();
        sms.Send();
    }
}