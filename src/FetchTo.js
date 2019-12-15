const fetch = require('node-fetch');

const FetchToText = async url =>
  fetch(url)
    .then(res => res.text())
    .catch(error => error);

const FetchToBuffer = async url =>
  fetch(url)
    .then(x => x.arrayBuffer())
    .catch(error => error);

module.exports = { FetchToText, FetchToBuffer };
