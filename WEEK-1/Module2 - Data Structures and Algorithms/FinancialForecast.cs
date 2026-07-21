using System;

class FinancialForecast
{
    static double PredictFutureValue(double initialValue, double growthRate, int years)
    {
        if (years == 0) return initialValue;
        return PredictFutureValue(initialValue * (1 + growthRate), growthRate, years - 1);
    }

    static double PredictFutureValueOptimized(double initialValue, double growthRate, int years)
    {
        return initialValue * Math.Pow(1 + growthRate, years);
    }

    static void Main(string[] args)
    {
        double initial = 10000.0;
        double rate = 0.08;
        int years = 5;

        Console.WriteLine("=== Financial Forecasting Tool ===");
        Console.WriteLine($"Initial Value : {initial:C}");
        Console.WriteLine($"Growth Rate   : {rate * 100}%");
        Console.WriteLine($"Years         : {years}");
        Console.WriteLine($"Recursive     : {PredictFutureValue(initial, rate, years):C}");
        Console.WriteLine($"Optimized     : {PredictFutureValueOptimized(initial, rate, years):C}");

        Console.WriteLine("\n=== Year-by-Year ===");
        for (int y = 1; y <= years; y++)
            Console.WriteLine($"Year {y} : {PredictFutureValue(initial, rate, y):C}");

        Console.WriteLine("\n=== Complexity ===");
        Console.WriteLine("Recursive  - Time: O(n), Space: O(n)");
        Console.WriteLine("Optimized  - Time: O(1), Space: O(1)");
    }
}
