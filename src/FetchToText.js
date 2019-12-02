const fetch = require('node-fetch');

const FetchToText = async(url) => fetch(url).then(res => res.text());

module.exports = FetchToText;
