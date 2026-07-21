using NUnit.Framework;
using Moq;
using PlayersManagerLib;

namespace PlayerManager.Tests
{
    [TestFixture]
    public class PlayerTests
    {
        private Mock<IPlayerMapper> _mockPlayerMapper;
        [OneTimeSetUp]
        public void Init()
        {
            _mockPlayerMapper = new Mock<IPlayerMapper>();
        }
        [Test]
        [TestCase("JohnDoe")]
        public void RegisterNewPlayer_WhenPlayerDoesNotExist_ReturnsPlayer(string playerName)
        {
            _mockPlayerMapper.Setup(x => x.IsPlayerNameExistsInDb(playerName)).Returns(false);
            _mockPlayerMapper.Setup(x => x.AddNewPlayerIntoDb(playerName));
            var result = Player.RegisterNewPlayer(playerName, _mockPlayerMapper.Object);
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Name, Is.EqualTo(playerName));
            Assert.That(result.Age, Is.EqualTo(23));
            Assert.That(result.Country, Is.EqualTo("India"));
            Assert.That(result.NoOfMatches, Is.EqualTo(30));
        }
        [Test]
        [TestCase("ExistingPlayer")]
        public void RegisterNewPlayer_WhenPlayerExists_ThrowsException(string playerName)
        {
            _mockPlayerMapper.Setup(x => x.IsPlayerNameExistsInDb(playerName)).Returns(true);
            Assert.That(() => Player.RegisterNewPlayer(playerName, _mockPlayerMapper.Object),
                Throws.ArgumentException.With.Message.EqualTo("Player name already exists."));
        }
        [Test]
        [TestCase("")]
        [TestCase(null)]
        [TestCase(" ")]
        public void RegisterNewPlayer_WhenNameIsEmpty_ThrowsException(string playerName)
        {
            Assert.That(() => Player.RegisterNewPlayer(playerName, _mockPlayerMapper.Object),
                Throws.ArgumentException.With.Message.EqualTo("Player name can't be empty."));
        }
    }
}
