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
