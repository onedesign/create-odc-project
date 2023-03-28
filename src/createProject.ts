import chalk from 'chalk';
import Listr from 'listr';
import path from 'path';
import { fileURLToPath } from 'url';

import copyTemplateFiles from './tasks/copyTemplateFiles';
import initGitRepo from './tasks/initGitRepo';
import installNodePackages from './tasks/installNodePackages';
import renameGitignore from './tasks/renameGitignore';
import renameVitePartial from './tasks/renameVitePartial';

import type { Options } from './types';

async function createProject(options: Options) {
  const targetDirectory = process.cwd();
  const currentFileUrl = import.meta.url;
  const templateDirectory = path.resolve(
    decodeURI(fileURLToPath(currentFileUrl)),
    '../../templates'
  );

  const tasks = new Listr([
    {
      title: 'Copy Base Project Files',
      task: () =>
        copyTemplateFiles(`${templateDirectory}/craftcms-js/`, targetDirectory),
    },
    {
      title: 'Copy NewCo Project Files',
      enabled: () => options.template === 'newco',
      task: () =>
        copyTemplateFiles(`${templateDirectory}/newco/`, targetDirectory),
    },
    {
      title: 'Rename .gitignore File',
      task: () => renameGitignore(targetDirectory),
    },
    {
      title: 'Rename Vite Partial',
      task: () =>
        renameVitePartial(`${targetDirectory}/app/templates/_partials`),
    },
    {
      title: 'Initialize Git',
      enabled: () => options.git,
      task: () => initGitRepo(targetDirectory),
    },
    {
      title: 'Install Node Dependencies',
      enabled: () => options.install,
      task: () => installNodePackages(targetDirectory),
    },
  ]);

  try {
    await tasks.run();
    // eslint-disable-next-line no-console
    console.log('%s Project ready', chalk.green.bold('DONE'));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`${error}`, chalk.red.bold('ERROR'));
  }
}

export default createProject;
