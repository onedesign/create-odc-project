import { vitePluginCraftCms } from 'vite-plugin-craftcms';
import { defineConfig, loadEnv } from 'vite';
import eslint from '@rollup/plugin-eslint';
import viteRestart from 'vite-plugin-restart';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    base: command === 'serve' ? '' : '/dist/',
    publicDir: './src/static',
    server: {
      port: process.env.VITE_DEV_PORT || 3000,
      host: true,
      hmr: {
        host: 'localhost',
      },
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
      mkcert(),
      vitePluginCraftCms({
        outputFile: './app/templates/_partials/vite.twig',
      }),
      viteRestart({
        reload: ['./app/templates/**/*'],
      }),
    ],
  };
});
