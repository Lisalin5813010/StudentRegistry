import { defineConfig } from '@vue/cli-service';

export default defineConfig({
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});

