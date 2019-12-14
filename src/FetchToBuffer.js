const fetch = require('node-fetch');

const FetchToBuffer = async url => fetch(url).then(x => x.arrayBuffer());

module.exports = FetchToBuffer;
