// Model for adverts

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import AdvertSeeds from "../helpers/AdvertSeeds";

let Schema = new mongoose.Schema({
  title: {type: String },        // title of advert (we can standardize this)
  location: {type: String },        // place of petsitting: city, park,... user can choose detail of information
  description: { type: String }, // description of petsitting: walking with my dog, nurishing my cat,...
  type: { type: Boolean },       // 0-supply, 1-demand
  price: { type: Number },       // price offered/demanded
  image: { type: String },       // image of pet (reference to pet category)
  date: { type: String },        // date of pet sitting
  user_id: {type: Number}        // id of advertiser
});

let Model = mongoose.model('Advert', Schema);
//let AdvertModel = mongoose.model('Advert', Schema);

export default {
  seedAdvert: () => {
    let promises = [];
    for (let advert of AdvertSeeds){
      promises[promises.legth] = Model.create(advert);
    }
    return Promise.all(promises);
  },

  getAdverts: () => {
    return Model.find({}).exec();
  },

  getAdvert: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createAdvert: (advert) => {
    return Model.create({
      id: advert.id
      title: advert.title,
      location: advert.place,        
      description: advert.description,
      type: advert.type,        
      price: advert.price,
      image: advert.image,   
      date: advert.date, 
      user_id: advert.user_id
    });
  },

  updateAdvert: (_id, advert) => {
    return Model.findOneAndUpdate({ _id }, {      
      id: advert.id
      title: advert.title,
      location: advert.place,        
      description: advert.description,
      type: advert.type,        
      price: advert.price,
      image: advert.image,   
      date: advert.date, 
      user_id: advert.user_id
    }, {upsert: true}).exec();
  },

  deleteAdvert: () => {
    return Model.remove({}).exec();
  },

  deleteAdvert: (_id) => {
    return Model.remove({ _id }).exec();
  },
};
