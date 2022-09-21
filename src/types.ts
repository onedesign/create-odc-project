export type Args = string[];

export type RawOptions = {
  git: boolean;
  install: boolean;
  skipPrompts: boolean;
  template?: string;
};

export type Options = Omit<RawOptions, 'skipPrompts'> & {
  template: string;
};
