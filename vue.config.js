import { defineConfig } from '@vue/cli-service';

export default defineConfig({
  // Enable source maps for development and production
  productionSourceMap: true,
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
  },
  devServer: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    },
  },
});

