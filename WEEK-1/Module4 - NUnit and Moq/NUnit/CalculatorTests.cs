using NUnit.Framework;
using CalcLibrary;

namespace CalcLibrary.Tests
{
    [TestFixture]
    public class CalculatorTests
    {
        private Calculator _calculator;
        [SetUp]
        public void Setup()
        {
            _calculator = new Calculator();
        }
        [TearDown]
        public void Teardown()
        {
            _calculator = null;
        }
        [Test]
        [TestCase(10, 5, 15)]
        [TestCase(0, 0, 0)]
        [TestCase(-5, 10, 5)]
        public void Addition_WithVariousInputs_ReturnsCorrectResult(double a, double b, double expected)
        {
            double result = _calculator.Add(a, b);
            Assert.That(result, Is.EqualTo(expected));
        }
        [Test]
        [TestCase(10, 5, 5)]
        [TestCase(0, 0, 0)]
        [TestCase(-5, 10, -15)]
        public void Subtraction_WithVariousInputs_ReturnsCorrectResult(double a, double b, double expected)
        {
            double result = _calculator.Subtract(a, b);
            Assert.That(result, Is.EqualTo(expected));
        }
    }
}
