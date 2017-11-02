// Model for adverts

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import ShowSeeds from "../helpers/ShowSeeds";

let Schema = new mongoose.Schema({
 /* name: { type: String },         // le nom du concert
  venue: { type: String },        // le nom de la salle
  description: { type: String },  // la description
  capacity: { type: Number },     // la capacité du show
  price: { type: Number },        // le prix
  image: { type: String },        // l'url de l'image
  date: { type: String },         // la date du concert
  lat: { type: String },          // latitude du lieu
  lng: {type: String }            // longitude du lieu£*/
  
  title: {type: String },        // title of advert (we can standardize this)
  place: {type: String },        // place of petsitting: city, park,... user can choose detail of information
  description: { type: String }, // description of petsitting: walking with my dog, nurishing my cat,...
  type: { type: Bolean },        // 0-supply, 1-demand
  price: { type: Number },       // price offered/demanded
  image: { type: String },       // image of pet (reference to pet category)
  date: { type: String },        // date of pet sitting
  user_id {type: Number}         // id of advertiser
});

let Model = mongoose.model('Show', Schema);

export default {
  seedShows: () => {
    let promises = [];
    for (let show of ShowSeeds){
      promises[promises.legth] = Model.create(show);
    }
    return Promise.all(promises);
  },

  getShows: () => {
    return Model.find({}).exec();
  },

  getShow: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createShow: (show) => {
    return Model.create({
      /*name: show.name,
      venue: show.venue,
      description: show.description,
      capacity: show.capacity,
      price: show.price,
      image: show.image,
      date: show.date,
      lat: show.lat,
      lng: show.lng*/
      
      title: show.title,         // Should we change show to advert everywhere?
      place: show.place,        
      description: show.description,
      type: show.type,        
      price: show.price,
      image: show.image,   
      date: show.date, 
      user_id: show.user_id
    });
  },

  updateShow: (_id, show) => {
    return Model.findOneAndUpdate({ _id }, {
      /*name: show.name,
      venue: show.venue,
      description: show.description,
      capacity: show.capacity,
      price: show.price,
      image: show.image,
      date: show.date,
      lat: show.lat,
      lng: show.lng*/
      
      title: show.title,         // Should we change show to advert everywhere?
      place: show.place,        
      description: show.description,
      type: show.type,        
      price: show.price,
      image: show.image,   
      date: show.date,
      user_id: show.user_id
      
    }, {upsert: true}).exec();
  },

  deleteShows: () => {
    return Model.remove({}).exec();
  },

  deleteShow: (_id) => {
    return Model.remove({ _id }).exec();
  },
};
