// Récupération des librairies de base permettant de faire un serveur d'API
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import favicon from "serve-favicon";
import mongoose from "mongoose";
import exphbs from "express-handlebars";

// Récupération du fichier de configuration qui dépend de l'environnement :
// - /config/dev.js si vous lancez l'application en local
// - /config/prod.js si vous lancez l'application sur votre serveur chez Heroku
import config from "./config";
import HandlebarsConfig from "./helpers/HandlebarsConfig";

// Récupération des controllers
import SeedDbController from "./controllers/SeedDbController";
import HomeController from "./controllers/HomeController";
import AdvertController from "./controllers/AdvertController";
import UserController from "./controllers/UserController";
import PetController from "./controllers/PetController";

// Configuration du serveur
const viewsPath = __dirname + '/views/';
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(favicon(path.resolve('./src/assets/favicon.png')));

server.use(express.static(path.resolve('./src/assets')));
server.set('views', path.resolve('./src/views'));
server.engine('.hbs', exphbs(HandlebarsConfig));
server.set('view engine', '.hbs');

server.set('port', (process.env.PORT || 5000));
server.listen(server.get('port'), () => {
  console.log('Node app is running on port', server.get('port'));
});

// CROSS : cela permettra plus tard d'accéder aux API produites ici depuis l'appli mobile
// Voir ici pour plus d'info : https://developer.mozilla.org/fr/docs/HTTP/Access_control_CORS
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Connection à la base de donnée

/////mongoose.connect('mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + config.bddUri, {}, (err, res) => {
mongoose.connect('mongodb://' + 'test-user' + ':' + 'test-password' + '@' + config.bddUri, {}, (err, res) => {
  if (err) {
    // La connection a échouée
    console.log('Mongo error:' + config.bddUri + '. ' + err);
  } else {
    // La connection a réussie
    console.log('Mongo success: ' + config.bddUri);
  }
});


// Routes pour initialiser la base
server.post('/seeddb', SeedDbController.seedDb);


// Routes pour les vues
server.get('/', HomeController.getIndex);

server.get('/adverts', AdvertController.getAdverts);
server.get('/adverts/id/:id', AdvertController.getAdvert);
server.get('/adverts/type/:type', AdvertController.getAdvertsByTypeApi);
server.get('/adverts/userid/:userId', AdvertController.getAdvertsByUserIdApi);
server.get('/adverts/create', AdvertController.getCreateAdvert);
server.post('/adverts/create', AdvertController.postCreateAdvert);
server.get('/adverts/update/:id', AdvertController.getUpdateAdvert);
server.post('/adverts/update/:id', AdvertController.postUpdateAdvert);
server.get('/adverts/delete/:id', AdvertController.getDeleteAdvert);

server.get('/users', UserController.getUsers);
server.get('/users/id/:id', UserController.getUser);
server.get('/users/create', UserController.getCreateUser);
server.post('/users/create', UserController.postCreateUser);
server.get('/users/update/:id', UserController.getUpdateUser);
server.post('/users/update/:id', UserController.postUpdateUser);
server.get('/users/delete/:id', UserController.getDeleteUser);

server.get('/pets', PetController.getPets);
server.get('/pets/id/:id', PetController.getPet);
//server.get('/pets/byuserid/:userid', PetController.getPetByUserId); // A CREER
server.get('/pets/create', PetController.getCreatePet);
server.post('/pets/create', PetController.postCreatePet);
server.get('/pets/update/:id', PetController.getUpdatePet);
server.post('/pets/update/:id', PetController.postUpdatePet);
server.get('/pets/delete/:id', PetController.getDeletePet);


// Routes pour les APIs
server.get('/api/', HomeController.getIndexApi);

server.get('/api/adverts', AdvertController.getAdvertsApi);
server.get('/api/adverts/id/:id', AdvertController.getAdvertApi);
server.get('/api/adverts/type/:type', AdvertController.getAdvertsByTypeApi);
server.get('/api/adverts/userid/:userId', AdvertController.getAdvertsByUserIdApi);
server.post('/api/adverts/create', AdvertController.postCreateAdvertApi);
server.post('/api/adverts/update/:id', AdvertController.postUpdateAdvertApi);
server.post('/api/adverts/delete/:id', AdvertController.postDeleteAdvertApi);

server.get('/api/users', UserController.getUsersApi);
server.get('/api/users/id/:id', UserController.getUserApi);
server.post('/api/users/create', UserController.postCreateUserApi);
server.post('/api/users/update/:id', UserController.postUpdateUserApi);
server.post('/api/users/delete/:id', UserController.postDeleteUserApi);

server.get('/api/pets', PetController.getPetsApi);
server.get('/api/pets/id/:id', PetController.getPetApi);
server.get('/api/pets/ownerid/:id', PetController.getPetsByOwnerIdApi);
server.post('/api/pets/create', PetController.postCreatePetApi);
server.post('/api/pets/update/:id', PetController.postUpdatePetApi);
server.post('/api/pets/delete/:id', PetController.postDeletePetApi);


