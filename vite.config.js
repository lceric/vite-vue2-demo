const path = require('path');
const { defineConfig } = require('vite');
const { createVuePlugin } = require('vite-plugin-vue2');
const { injectHtml } = require('vite-plugin-html');
const { genScssOptions, genHtmlOptions } = require('./config');
const projectRootDir = path.resolve(__dirname);
console.log(genHtmlOptions('vite'))
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createVuePlugin({
      jsx: true,
    }),
    injectHtml({
      injectData: genHtmlOptions('vite'),
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: genScssOptions('vite'),
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(projectRootDir, 'src'),
      },
    ],
  },
});
