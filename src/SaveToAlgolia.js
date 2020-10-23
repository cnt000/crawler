const algoliasearch = require('algoliasearch');
const Firestore = require('./Firestore');

const SaveToAlgolia = async (f) => {
  const client = algoliasearch('UKO1VN8X22', process.env.algoliaAdminApiKey);
  const index = client.initIndex('products');
  let products = [];

  try {
    const productsCollection = await Firestore.db.collection('products');
    const snapshot = await productsCollection.get();
    snapshot.forEach((doc) => {
      products.push(doc.data());
    });

    // const { objectIDs } = await index.saveObjects(products, {
    //   autoGenerateObjectIDIfNotExist: true,
    // });

    const { objectIDs } = await index.replaceAllObjects(products, {
      safe: true,
      autoGenerateObjectIDIfNotExist: true,
    });

    await index.setSettings({
      searchableAttributes: ['name', 'price'],
    });
    return objectIDs;
  } catch (e) {
    throw Error(e);
  }
};

module.exports = { SaveToAlgolia };
