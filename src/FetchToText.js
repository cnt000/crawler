const fetch = require('node-fetch');

const FetchToText = async url =>
  fetch(url)
    .then(res => res.text())
    .catch(error => error);

module.exports = FetchToText;
