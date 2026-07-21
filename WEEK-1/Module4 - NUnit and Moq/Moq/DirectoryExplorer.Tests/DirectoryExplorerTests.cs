using System.Collections.Generic;
using NUnit.Framework;
using Moq;
using MagicFilesLib;

namespace DirectoryExplorer.Tests
{
    [TestFixture]
    public class DirectoryExplorerTests
    {
        private Mock<IDirectoryExplorer> _mockDirExplorer;
        private readonly string _file1 = "file.txt";
        private readonly string _file2 = "file2.txt";
        [OneTimeSetUp]
        public void Init()
        {
            _mockDirExplorer = new Mock<IDirectoryExplorer>();
        }
        [Test]
        [TestCase(@"C:\Test")]
        public void GetFiles_WhenCalled_ReturnsMockedFiles(string path)
        {
            var expectedFiles = new List<string> { _file1, _file2 };
            _mockDirExplorer.Setup(x => x.GetFiles(path)).Returns(expectedFiles);
            var result = _mockDirExplorer.Object.GetFiles(path);
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(2));
            Assert.That(result.Contains(_file1), Is.True);
            Assert.That(result.Contains(_file2), Is.True);
        }
    }
}
