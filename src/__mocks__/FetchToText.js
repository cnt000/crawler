const FetchToText = async url => {
  return new Promise((resolve, reject) => resolve('text')).then(text => text);
};

// class Response {
//   construtor(text) {
//     this.text = text;
//   }
//   get text() {
//     return this.text;
//   }
// }

module.exports = FetchToText;
