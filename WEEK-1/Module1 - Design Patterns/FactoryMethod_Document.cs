using System;

public interface IDocument
{
    void Open();
    void Save();
    void Close();
}

public class WordDocument : IDocument
{
    public void Open() { Console.WriteLine("Opening Word document"); }
    public void Save() { Console.WriteLine("Saving Word document"); }
    public void Close() { Console.WriteLine("Closing Word document"); }
}

public class PdfDocument : IDocument
{
    public void Open() { Console.WriteLine("Opening PDF document"); }
    public void Save() { Console.WriteLine("Saving PDF document"); }
    public void Close() { Console.WriteLine("Closing PDF document"); }
}

public class ExcelDocument : IDocument
{
    public void Open() { Console.WriteLine("Opening Excel document"); }
    public void Save() { Console.WriteLine("Saving Excel document"); }
    public void Close() { Console.WriteLine("Closing Excel document"); }
}

public abstract class DocumentFactory
{
    public abstract IDocument CreateDocument();
}

public class WordFactory : DocumentFactory
{
    public override IDocument CreateDocument() { return new WordDocument(); }
}

public class PdfFactory : DocumentFactory
{
    public override IDocument CreateDocument() { return new PdfDocument(); }
}

public class ExcelFactory : DocumentFactory
{
    public override IDocument CreateDocument() { return new ExcelDocument(); }
}

class TestDocumentFactory
{
    static void Main(string[] args)
    {
        DocumentFactory factory;
        factory = new WordFactory();
        IDocument word = factory.CreateDocument();
        word.Open(); word.Save(); word.Close();
        factory = new PdfFactory();
        IDocument pdf = factory.CreateDocument();
        pdf.Open(); pdf.Save(); pdf.Close();
        factory = new ExcelFactory();
        IDocument excel = factory.CreateDocument();
        excel.Open(); excel.Save(); excel.Close();
    }
}
