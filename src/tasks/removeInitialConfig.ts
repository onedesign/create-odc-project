import { execa } from 'execa';

async function removeInitialConfig(targetDir: string) {
  const result = await execa('rm', ['-rf', 'app/config/project/'], {
    cwd: targetDir,
  });

  if (result.failed) {
    return Promise.reject(new Error('Failed to remove initial config.'));
  }

  return true;
}

export default removeInitialConfig;
