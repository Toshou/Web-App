const {MongoClient} = require('mongodb');
const fs = require('fs');
const path = require('path');

async function insertData(db) {
  try {
    // Chemin du fichier JSON à importer (à partir du dossier courant)
    const dedi = path.join(__dirname, '/eshops/dedicatedbrand.json')
    const mont = path.join(__dirname, '/eshops/montlimart.json')
    const sport = path.join(__dirname, '/eshops/circleSportswear.json')

    // Lire le fichier JSON en tant que chaîne de caractères
    const jsonDedi = fs.readFileSync(dedi, 'utf-8');
    const jsonMont = fs.readFileSync(mont, 'utf-8');
    const jsonSport = fs.readFileSync(sport, 'utf-8');

    // Convertir la chaîne de caractères en objet JSON
    const jsonData_dedi = JSON.parse(jsonDedi);
    const jsonData_mont = JSON.parse(jsonMont);
    const jsonData_Sport = JSON.parse(jsonSport);

    // Ajouter les données à la collection 'news'
    const collection = db.collection('products');
    const result_dedi = await collection.insertMany(jsonData_dedi);
    const result_mont = await collection.insertMany(jsonData_mont);
    const result_sport = await collection.insertMany(jsonData_Sport);
    console.log(`${result_dedi.insertedCount} documents dedicated insérés.`);
    console.log(`${result_mont.insertedCount} documents montlimart insérés.`);
    console.log(`${result_sport.insertedCount} documents circleSportswear insérés.`);
  } catch(e) {
    console.error(e);
  }
}
async function brand(brandName, db){
  try{
    const collection = db.collection('products');
    const cursor = collection.find({brand: brandName}); // récupère tous les documents de la collection pour une marque donnée
    await cursor.forEach(doc => console.log(doc)); // itère sur les résultats et affiche chaque document
  }catch(e) {
    console.error(e);
  }
}
async function lessThanAprice(db){
  try{
    const collection = db.collection('products');
    const cursor = collection.find({ price: { $lt: "50.00 €" } });
    await cursor.forEach(product => {
    const price = parseFloat(product.price.replace('€', '').replace(',', '.'));
    if (price < 50) {
      console.log(product);}});
  }catch(e) {
    console.error(e);
  }
}
async function sortByPrice(db){
  try{
    const collection = db.collection('products');
    const cursor = collection.find().sort({price: 1}); // récupère tous les documents triés par ordre croissant de prix
    await cursor.forEach(doc => console.log(doc)); // itère sur les résultats et affiche chaque document
  }catch(e) {
    console.error(e);
  }
}

(async () => {
  try {
    const MONGODB_URI = 'mongodb+srv://chloedeperthes:Z2xzgNoGqAdVvCS7@cluster0.vrw7zs8.mongodb.net/?retryWrites=true&w=majority';
    const MONGODB_DB_NAME = 'clearfashion'; //creation db
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true}); //connect to mongodb
    const db = client.db(MONGODB_DB_NAME); //select the db
    
    // Insertion des données
    await insertData(db);

    // Find all products related to a given brands
    // await brand("Montlimart",db)

    //Find all products sorted by price
    await sortByPrice(db)

    //Find all products less than a price
    // await lessThanAprice(db)

    await client.close();
  } catch(e) {
    console.error(e);
  }
})();
