import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteSvgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isDevMode = mode === 'development';

  const env = loadEnv(mode, process.cwd(), '');
  console.log(env.BACKEND_SERVER_URL);

  return {
    plugins: [
      react(),
      viteSvgr({
        exportAsDefault: true,
      }),
    ],
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
