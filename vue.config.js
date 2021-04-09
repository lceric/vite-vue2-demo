const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');
const webpack = require('webpack');
const {
  genScssOptions,
  genHtmlOptions,
  getViteEnvVarDefine,
} = require('./config');

const indexPath = path.resolve(__dirname, './index.html');
const tmpDir = path.resolve(__dirname, 'node_modules/.tmp/build');
mkdirSyncRecursive(tmpDir);

// vite import.meta.env => webpack process.env
const rawEditLoaderOptions = () => ({
  pathReg: 'src',
  replaceReg: 'import.meta.env.',
  replacement: 'process.env.',
});

module.exports = {
  publicPath: './',
  // indexPath,
  css: {
    loaderOptions: {
      scss: genScssOptions(),
    },
  },
  chainWebpack: config => {
    config.externals({
      axios: 'axios',
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
    });
    config
      .plugin('html')
      .tap(args => {
        const htmlOptions = genHtmlOptions();
        const htmlStr = readFileSync(indexPath).toString();
        const tmpHtmlPath = path.resolve(tmpDir, './index.html');

        writeFileSync(tmpHtmlPath, htmlStr);

        args[0].template = tmpHtmlPath;
        args[0].title = htmlOptions.title;

        args[0].filename = './index.html';
        args[0].templateParameters = (
          compilation,
          assets,
          assetTags,
          options
        ) => {
          return {
            compilation,
            webpackConfig: compilation.options,
            htmlWebpackPlugin: {
              tags: assetTags,
              files: assets,
              options,
            },
            ...htmlOptions,
          };
        };
        console.log(args);
        return args;
      })
      .end();
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'raw-edit-loader',
              options: rawEditLoaderOptions(),
            },
          ],
        },
      ],
    },
    plugins: [new webpack.DefinePlugin(getViteEnvVarDefine())],
  },
};

/**
 * 创建文件夹
 * @param {String} pathStr 文件夹路径
 */
function mkdirSyncRecursive(pathStr) {
  if (existsSync(pathStr)) return true;
  mkdirSync(pathStr, {
    recursive: true,
  });
}
