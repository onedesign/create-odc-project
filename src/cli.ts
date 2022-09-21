import createProject from './createProject';
import parseArgumentsIntoOptions from './utils/parseArgumentsIntoOptions';
import generateOptionPrompts from './utils/generateOptionPrompts';
import type { Args } from './types';

export async function cli(args: Args) {
  const rawOptions = parseArgumentsIntoOptions(args);
  const options = await generateOptionPrompts(rawOptions);
  await createProject(options);
}
