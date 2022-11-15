import { execa } from 'execa';

async function installNodePackages(targetDir: string) {
  const result = await execa('ddev', ['npm', 'install'], {
    cwd: targetDir,
  });

  if (result.failed) {
    return Promise.reject(new Error('Failed to install node modules.'));
  }

  return true;
}

export default installNodePackages;
