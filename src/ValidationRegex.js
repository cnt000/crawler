
const ValidationRegex = {
  url: /^http(s*):\/\/\S+$/,
  number: /^\d+$/,
  path: /^\/\S+$/, // and not spaces
};

module.exports = ValidationRegex;
