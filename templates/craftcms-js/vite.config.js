import { vitePluginCraftCms } from 'vite-plugin-craftcms';
import { defineConfig, loadEnv } from 'vite';
import eslint from '@rollup/plugin-eslint';
import viteRestart from 'vite-plugin-restart';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    base: command === 'serve' ? '' : '/dist/',
    publicDir: './src/static',
    server: {
      origin: `https://${process.env.DDEV_HOSTNAME}:3000`,
      port: 3000,
      host: '0.0.0.0',
      strictPort: true,
    },
    build: {
      emptyOutDir: true,
      manifest: true,
      outDir: './app/web/dist/',
      rollupOptions: {
        input: './src/entry.html',
        plugins: [
          eslint({
            include: '**/*.+(vue|js|jsx|ts|tsx)',
            throwOnError: true,
          }),
        ],
      },
    },
    plugins: [
      vitePluginCraftCms({
        outputFile: './app/templates/_partials/vite.twig',
      }),
      viteRestart({
        reload: ['./app/templates/**/*'],
      }),
    ],
  };
});
