const algoliasearch = require('algoliasearch');

// TODO key in env
const client = algoliasearch('UKO1VN8X22', '••••••••••••••••••••');
const index = client.initIndex('products');

// get all from firestore TODO
const products = require('./contacts.json');

index
  .saveObjects(products, {
    autoGenerateObjectIDIfNotExist: true,
  })
  .then(({ objectIDs }) => {
    console.log(objectIDs);
  });

index
  .setSettings({
    searchableAttributes: [
      'lastname',
      'firstname',
      'company',
      'email',
      'city',
      'address',
    ],
  })
  .then(() => {
    // done
  });
