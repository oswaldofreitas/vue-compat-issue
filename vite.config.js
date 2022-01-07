import vue from '@vitejs/plugin-vue'

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  resolve: {
    alias: {
      vue: '@vue/compat',
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2,
          },
        },
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    hmr: {
      port: 443,
    }
  }
}
