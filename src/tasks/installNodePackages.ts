import { projectInstall } from 'pkg-install';

function installNodePackages(targetDir: string) {
  return projectInstall({
    cwd: targetDir,
  });
}

export default installNodePackages;
