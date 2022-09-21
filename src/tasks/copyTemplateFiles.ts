import ncp from 'ncp';
import { promisify } from 'util';

const copy = promisify(ncp);

async function copyTemplateFiles(templateDir: string, targetDir: string) {
  return copy(templateDir, targetDir, { clobber: true });
}

export default copyTemplateFiles;
