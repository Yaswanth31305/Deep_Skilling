namespace CustomerCommLib
{
    public interface IMailSender
    {
        bool SendMail(string toAddress, string message);
    }
    public class MailSender : IMailSender
    {
        public bool SendMail(string toAddress, string message)
        {
            return true;
        }
    }
    public class CustomerComm
    {
        private IMailSender _mailSender;
        public CustomerComm(IMailSender mailSender)
        {
            _mailSender = mailSender;
        }
        public bool SendMailToCustomer()
        {
            _mailSender.SendMail("cust123@abc.com", "Some Message");
            return true;
        }
    }
}
