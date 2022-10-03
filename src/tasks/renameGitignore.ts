import * as fs from 'fs';

async function renameGitignore(targetDir: string) {
  fs.rename(
    `${targetDir}/.gitignore.template`,
    `${targetDir}/.gitignore`,
    () => {}
  );
}

export default renameGitignore;
