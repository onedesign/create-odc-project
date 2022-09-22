import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default {
  input: 'src/cli.ts',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [terser(), typescript()],
  external: Object.keys(pkg.dependencies),
};
