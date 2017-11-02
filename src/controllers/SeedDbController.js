// Controller de la route '/shows'
import Errors from "../helpers/Errors";

// Récupération du model
import AdvertModel from "../models/AdvertModel";
import BookingModel from "../models/BookingModel";

export default {
  seedDb: (req, res) => {
    return Promise.all([
      AdvertModel.deleteAdverts(),
      BookingModel.deleteBookings(),
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