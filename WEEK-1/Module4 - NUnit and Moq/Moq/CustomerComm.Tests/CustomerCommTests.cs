using NUnit.Framework;
using Moq;
using CustomerCommLib;

namespace CustomerComm.Tests
{
    [TestFixture]
    public class CustomerCommTests
    {
        private Mock<IMailSender> _mockMailSender;
        private CustomerComm _customerComm;
        [OneTimeSetUp]
        public void Init()
        {
            _mockMailSender = new Mock<IMailSender>();
            _customerComm = new CustomerComm(_mockMailSender.Object);
        }
        [Test]
        public void SendMailToCustomer_WhenCalled_ReturnsTrue()
        {
            _mockMailSender.Setup(x => x.SendMail(It.IsAny<string>(), It.IsAny<string>())).Returns(true);
            bool result = _customerComm.SendMailToCustomer();
            Assert.That(result, Is.True);
            _mockMailSender.Verify(x => x.SendMail(It.IsAny<string>(), It.IsAny<string>()), Times.Once);
        }
    }
}
