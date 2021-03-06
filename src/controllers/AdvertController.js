// Controller de la route '/adverts'
import _ from "lodash";
import moment from "moment";
import Errors from "../helpers/Errors";

// Récupération du model
import AdvertModel from "../models/AdvertModel";
import UserModel from"../models/UserModel";

const adverts = () => {
  // On fait appel à la fonction getAdverts du model
  // Celle ci renvoie toutes les adverts présents en base
  return AdvertModel.getAdverts()
  .then((data) => {
    // On récupère ici data qui est une liste d'advert

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noAdvertsError' 
      throw new Error('noAdvertsError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    let response = [];
    for (let advert of data){
      // On parcours data. pour chaque élément, on garde les champs ...
      response[response.length] = {
        id: advert._id,
        title: advert.title,
        location: advert.location,
        description: advert.description,
        type: advert.type,
        price: advert.price,
        date: advert.date,
        userId: advert.userId,
        petId: advert.petId,
        activated: advert.activated
      }
    }

    // Avant d'envoyer la réponse on la tri par ordre de date
    return _.sortBy(response, 'date');
  });
}

const advert = (_id) => {
  // On fait appel à la fonction getAdvert du model
  // Celle ci renvoie l'advert dont l'id est _id
  return AdvertModel.getAdvert(_id)
  .then((advert) => {
    // On récupère ici data qui est une liste de adverts

    if (advert === null) {
      // Si data est vide, nous renvoyons l'erreur 'noAdvertError'
      throw new Error('noAdvertError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    let response = {
      id: advert._id,
      title: advert.title,
      location: advert.location,
      description: advert.description,
      type: advert.type,
      price: advert.price,
      date: advert.date,
      userId: advert.userId,
      petId: advert.petId,
      activated: advert.activated
    };
    return response;
  });
}

const advertsByUserId = (userId) => {
  // On fait appel à la fonction getAdvertsByUserId du model
  // Celle ci renvoie l'advert dont l'userId est userId
  return AdvertModel.getAdvertsByUserId(userId)
  .then((data) => {
    // On récupère ici data qui est une liste de adverts

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noAdvertError'
      throw new Error('noAdvertError');
    }


    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    let response = [];
    for (let advert of data){
      // On parcours data. pour chaque élément, on garde les champs ...
      response[response.length] = {
        id: advert._id,
        title: advert.title,
        location: advert.location,
        description: advert.description,
        type: advert.type,
        price: advert.price,
        date: advert.date,
        userId: advert.userId,
        petId: advert.petId,
        activated: advert.activated
      }
    }

    // Avant d'envoyer la réponse on la tri par ordre de date
    return _.sortBy(response, 'date');
  });
}

const advertsByType = (type) => {
  // On fait appel à la fonction getAdvert du model
  // Celle ci renvoie l'advert dont l'id est _id
  return AdvertModel.getAdvertsByType(type)
  .then((data) => {
    // On récupère ici data qui est une liste de adverts

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noAdvertError'
      throw new Error('noAdvertError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    let response = [];
    for (let advert of data){
      // On parcours data. pour chaque élément, on garde les champs ...
      response[response.length] = {
        id: advert._id,
        title: advert.title,
        location: advert.location,
        description: advert.description,
        type: advert.type,
        price: advert.price,
        date: advert.date,
        userId: advert.userId,
        petId: advert.petId,
        activated: advert.activated
      }
    }

    // Avant d'envoyer la réponse on la tri par ordre de date
    return _.sortBy(response, 'date');
  });
}

const createAdvert = (advert) => {
  // On fait appel à la fonction createAdvert du model
  // Celle ci renvoie l'advert dont l'id est _id
  return AdvertModel.createAdvert(advert);
}

const updateAdvert = (id, advert) => {
  // On fait appel à la fonction updateAdvert du model
  // Celle ci renvoie l'advert dont l'id est _id
  return AdvertModel.updateAdvert(id, advert);
}

const deleteAdvert = (id) => {
  // On fait appel à la fonction deleteAdvert du model
  // Celle ci renvoie l'advert dont l'id est _id
  return AdvertModel.deleteAdvert(id);
}

export default {
  // Controller des views
  getAdverts: (req, res) => {
    adverts()
    .then((data) => {
      // data contient une liste d'adverts
      data.forEach(a => {a.date = moment(a.date).format('Do MMMM YYYY')});
      res.render('advert/adverts', { adverts: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getAdvert: (req, res) => {
    advert(req.params.id)
    .then((data) => {
      res.render('advert/advert', { advert: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getAdvertsByUserId: (req, res) => {
    advertsByUserId(req.params.userId)
    .then((data) => {
      res.render('advert/adverts', { advert: data }); // A SURVEILLER
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getAdvertsByType: (req, res) => {
    advertsByType(req.params.type)
    .then((data) => {
      res.render('advert/adverts', { advert: data }); // A SURVEILLER
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreateAdvert: (req, res) => {
    res.render('advert/createAdvert');
  },

  postCreateAdvert: (req, res) => {
    let advert = {
      title: req.body.title,
      location: req.body.location,
      description: req.body.description,
      type: req.body.type,
      price: req.body.price,
      image: req.body.image,
      date: req.body.date,
      userId: req.body.userId,
      petId: req.body.petId,
      activated: req.body.activated
    };

    createAdvert(advert)
    .then((data) => {
      res.redirect('/adverts');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdateAdvert: (req, res) => {
    advert(req.params.id)
    .then((data) => {
      res.render('advert/updateAdvert', { advert: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateAdvert: (req, res) => {
    let advert = {
      title: req.body.title,
      location: req.body.location,
      description: req.body.description,
      type: req.body.type,
      price: req.body.price,
      image: req.body.image,
      date: req.body.date,
      userId: req.body.userId,
      petId: req.body.petId,
      activated: req.body.activated
    };

    updateAdvert(req.params.id, advert)
    .then((data) => {
      res.redirect('/adverts');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeleteAdvert: (req, res) => {
    deleteAdvert(req.params.id)
    .then((data) => {
      res.redirect('/adverts');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getAdvertsApi: (req, res) => {
    adverts()
    .then((data) => {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de adverts
      res.send(data);
    }, (err) => {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getAdvertApi: (req, res) => {
    advert(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getAdvertsByUserIdApi: (req, res) => {
    advertsByUserId(req.params.userId)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getAdvertsByTypeApi: (req, res) => {
    advertsByType(req.params.type)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateAdvertApi: (req, res) => {
    let advert = {
      title: req.body.name,
      location: req.body.venue,
      description: req.body.description,
      type: req.body.type,
      price: req.body.price,
      image: req.body.image,
      date: req.body.date,
      userId: req.body.userId,
      petId: req.body.petId,
      activated: req.body.activated
    };

    createAdvert(advert)
    .then((data) => {
      res.send('Advert successfully created');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateAdvertApi: (req, res) => {
    let advert = {
      title: req.body.title,
      location: req.body.location,
      description: req.body.description,
      type: req.body.type,
      price: req.body.price,
      image: req.body.image,
      date: req.body.date,
      userId: req.body.userId,
      petId: req.body.petId,
      activated: req.body.activated
    };

    updateAdvert(req.params.id, advert)
    .then((data) => {
      res.send('Advert successfully updated');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeleteAdvertApi: (req, res) => {
    deleteAdvert(req.params.id)
    .then((data) => {
      res.send('Advert successfully deleted');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
