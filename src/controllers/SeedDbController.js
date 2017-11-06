// Controller de la route '/shows'
import Errors from "../helpers/Errors";

// Récupération du model
import AdvertModel from "../models/AdvertModel";
import UserModel from "../models/UserModel";
import PetModel from "../models/PetModel";
import BookingModel from "../models/BookingModel"; // A SUPPRIMER

export default {
  seedDb: (req, res) => {
    return Promise.all([
      AdvertModel.deleteAdverts(),
      UserModel.deleteUsers(),
      PetModel.deletePets(),
      BookingModel.deleteBookings() // A SUPPRIMER
    ])
    .then((data) => {
      return Promise.all([
        AdvertModel.seedAdverts(),
      ]);
    })
    .then((data) => {
      res.send('seedDb -> ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};