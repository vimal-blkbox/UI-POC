import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteSvgr from 'vite-plugin-svgr';
import { resolve } from 'path';
import alias from '@rollup/plugin-alias';

const projectRootDir = resolve(__dirname);

export default defineConfig(({ command, mode }) => {
  const isDevMode = mode === 'development';

  const env = loadEnv(mode, process.cwd(), '');
  console.log(env.BACKEND_SERVER_URL);

  return {
    plugins: [
      alias(),
      react(),
      viteSvgr({
        exportAsDefault: true,
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(projectRootDir, 'src'),
        common: resolve(projectRootDir, 'src/common'),
        assets: resolve(projectRootDir, 'src/assets'),
      },
    },
    server: {
      port: 3000,
    },
    css: {
      devSourcemap: true,
      postcss: './postcss.config.js',
      modules: {
        generateScopedName: '[local]___[hash:base64:5]',
        localsConvention: 'camelCase',
      },
    },
    build: {
      sourcemap: false, // set 'true' when production build should include sourcemap
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            console.log(id);
            if (id.includes('node_modules')) {
              if (id.includes('@emoji-mart')) {
                return 'vendor_emoji';
              }

              return 'vendor';
            }
          },
        },
      },
    },
  };
});
