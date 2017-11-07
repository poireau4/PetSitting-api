// Controller de la route '/shows'
import Errors from "../helpers/Errors";

// Récupération du model
import AdvertModel from "../models/AdvertModel";
import UserModel from "../models/UserModel";
import PetModel from "../models/PetModel";


export default {
  seedDb: (req, res) => {
    return Promise.all([
      AdvertModel.deleteAdverts(),
      UserModel.deleteUsers(),
      PetModel.deletePets()
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
