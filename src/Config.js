const getOrThrow = (prop, regex) => {
  if (!regex.test(prop)) {
    throw Error(`Prop ${prop} not valid for regex: ${regex}`);
  }
  return prop;
};

const Config = ({ url, number, path }) => ({
  baseUrl: getOrThrow(process.env.baseUrl, url),
  plpUrl: getOrThrow(process.env.plpUrl, path),
  plpPages: Number(getOrThrow(process.env.plpPages, number)),
  pdpUrl: getOrThrow(process.env.pdpUrl, path),
});

module.exports = Config;
