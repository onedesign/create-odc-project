import inquirer from 'inquirer';
import { Options, RawOptions } from '../types';

const defaultOptions = {
  git: true,
  install: true,
  template: 'craftcms-js',
};

const skipOptions: Omit<Options, 'template'> = {
  git: true,
  install: true,
};

async function generateOptionPrompts(options: RawOptions): Promise<Options> {
  if (options.skipPrompts) {
    options = { ...options, ...skipOptions };
  }

  const questions = [];

  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose a project base.',
      choices: [{ name: 'CraftCMS (JavaScript)', value: 'craftcms-js' }],
      default: defaultOptions.template,
    });
  }

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize a git repository?',
      default: defaultOptions.git,
    });
  }

  if (!options.install) {
    questions.push({
      type: 'confirm',
      name: 'install',
      message: 'Install node dependencies?',
      default: defaultOptions.install,
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    git: options.git || answers.git,
    install: options.install || answers.install,
    template: options.template || answers.template,
  };
}

export default generateOptionPrompts;
