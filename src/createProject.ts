import chalk from 'chalk';
import Listr from 'listr';
import path from 'path';
import { fileURLToPath } from 'url';

import copyTemplateFiles from './tasks/copyTemplateFiles';
import initGitRepo from './tasks/initGitRepo';
import installNodePackages from './tasks/installNodePackages';
import renameGitignore from './tasks/renameGitignore';

import type { Options } from './types';

async function createProject(options: Options) {
  const targetDirectory = process.cwd();
  const currentFileUrl = import.meta.url;
  const templateDirectory = path.resolve(
    decodeURI(fileURLToPath(currentFileUrl)),
    '../../templates',
    options.template.toLowerCase()
  );

  const tasks = new Listr([
    {
      title: 'Copy Project Files',
      task: () => copyTemplateFiles(templateDirectory, targetDirectory),
    },
    {
      title: 'Rename .gitignore File',
      task: () => renameGitignore(targetDirectory),
    },
    {
      title: 'Initialize Git',
      task: () => initGitRepo(targetDirectory),
    },
    {
      title: 'Install Node Dependencies',
      task: () => installNodePackages(targetDirectory),
      skip: () => {
        if (!options.install) {
          return 'Pass --install or -i to automatically install dependencies.';
        }
      },
    },
  ]);

  try {
    await tasks.run();
    console.log('%s Project ready', chalk.green.bold('DONE'));
  } catch (error) {
    console.log(`${error}`, chalk.red.bold('ERROR'));
  }
}

export default createProject;
