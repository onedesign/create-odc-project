import arg from 'arg';
import type { Args, RawOptions } from '../types';

function parseArgumentsIntoOptions(rawArgs: Args): RawOptions {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install',
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    git: args['--git'] || false,
    install: args['--install'] || false,
    skipPrompts: args['--yes'] || false,
    template: args._[0],
  };
}

export default parseArgumentsIntoOptions;
