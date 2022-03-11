exports.genScssOptions = function(env) {
  let prependKey = env == 'vite' ? 'additionalData' : 'prependData';
  return {
    [prependKey]: `$primary-color: #42b983;`,
  };
};

exports.genHtmlOptions = function(env) {
  const options = {
    title: 'Vite Vue2 Demo',
  };
  if (env == 'vite') {
    process.env.TOOL_NAME = 'vite';
    options.process = {
      // 注入env
      env: process.env,
    };
  }
  return options;
};

/**
 * 获取vite的env配置
 * @returns webpack DefinePlugin Object
 */
exports.getViteEnvVarDefine = function() {
  // 打包处理.env
  const dotenv = require('dotenv');
  const dotenvExpand = require('dotenv-expand');

  const envResult = dotenv.config();
  const { parsed: envParsed } = dotenvExpand(envResult);

  const viteEnvDefine = {};
  Object.keys(envParsed || {}).reduce((pre, cur) => {
    pre[`process.env.${cur}`] = JSON.stringify(envParsed[cur]);
    return pre;
  }, viteEnvDefine);

  return viteEnvDefine;
};
