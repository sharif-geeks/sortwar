const electronInstaller = require('electron-winstaller');

const tryBuildWinstaller = async () => {
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: 'dist/app64',
      outputDirectory: 'dist/installer64',
      authors: 'Sharif Geeks',
      description: "sort war app",
      exe: 'sortwar.exe',
    });
    console.log('It worked!');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
}

tryBuildWinstaller();