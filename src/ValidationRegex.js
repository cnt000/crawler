const ValidationRegex = {
  url: /^http(s*):\/\/\S+$/,
  number: /^\d+$/,
  path: /^\/\S+$/,
  directory: /^\.?\/?\S+\/?$/,
};

module.exports = ValidationRegex;
