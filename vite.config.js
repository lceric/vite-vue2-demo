const path = require('path');
const { defineConfig } = require('vite');
const { createVuePlugin } = require('vite-plugin-vue2');
const { injectHtml } = require('vite-plugin-html');
const resolveExternalsPlugin = require('vite-plugin-resolve-externals');

const { genScssOptions, genHtmlOptions } = require('./config');
const projectRootDir = path.resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    resolveExternalsPlugin({
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
    }),
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
    externals: {
      axios: 'axios',
    },
  },
});
