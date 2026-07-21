using System.Collections.Generic;
using System.IO;

namespace MagicFilesLib
{
    public interface IDirectoryExplorer
    {
        ICollection<string> GetFiles(string path);
    }
    public class DirectoryExplorer : IDirectoryExplorer
    {
        public ICollection<string> GetFiles(string path)
        {
            return Directory.GetFiles(path);
        }
    }
}
