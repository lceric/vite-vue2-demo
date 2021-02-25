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
    options.process = {
      env: {
        TOOL_NAME: 'vite',
        NODE_ENV: process.env.NODE_ENV,
      },
    };
  }
  return options;
};
