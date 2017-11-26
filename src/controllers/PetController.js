// Controller de la route '/pets'
import _ from "lodash";
import moment from "moment";
import Errors from "../helpers/Errors";

// Récupération du model
import PetModel from "../models/PetModel";

const pets = () => {
  // On fait appel à la fonction getPets du model
  // Celle ci renvoie toutes les pets présents en base
  return PetModel.getPets()
  .then((data) => {
    // On récupère ici data qui est une liste d'pet

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noPetsError'
      throw new Error('noPetsError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    let response = [];
    for (let pet of data){
      // On parcours data. pour chaque élément, on garde les champs name, venue, description, capacity, price, image et date
      response[response.length] = {
        id: pet._id,
        name: pet.name,
        breed: pet.breed,
        birthDate: pet.birthDate,
        description: pet.description,
        image: pet.image,
        ownerId: pet.ownerId
      }
    }

    // Avant d'envoyer la réponse on la tri par ordre de date
    return _.sortBy(response, 'name');
  });
}

const pet = (_id) => {
  // On fait appel à la fonction getPet du model
  // Celle ci renvoie l'pet dont l'id est _id
  return PetModel.getPet(_id)
  .then((pet) => {
    // On récupère ici data qui est une liste de pets

    if (pet === null) {
      // Si data est vide, nous renvoyons l'erreur 'noPetError'
      throw new Error('noPetError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    let response = {
      id: pet._id,
      name: pet.name,
      breed: pet.breed,
      birthDate: pet.birthDate,
      description: pet.description,
      image: pet.image,
      ownerId: pet.ownerId
    };
    return response;
  });
}

const petsByOwnerId = (ownerId) => {
  // On fait appel à la fonction getPets du model
  // Celle ci renvoie toutes les pets présents en base
  return PetModel.getPetsByOwnerId(ownerId)
  .then((data) => {
    // On récupère ici data qui est une liste d'pet

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noPetsError'
      throw new Error('noPetsError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    let response = [];
    for (let pet of data){
      // On parcours data. pour chaque élément, on garde les champs name, venue, description, capacity, price, image et date
      response[response.length] = {
        id: pet._id,
        name: pet.name,
        breed: pet.breed,
        birthDate: pet.birthDate,
        description: pet.description,
        image: pet.image,
        ownerId: pet.ownerId
      }
    }

    // Avant d'envoyer la réponse on la tri par ordre de date
    return _.sortBy(response, 'name');
  });
}

const createPet = (pet) => {
  // On fait appel à la fonction createPet du model
  // Celle ci renvoie le pet dont l'id est _id (???)
  return PetModel.createPet(pet);
}

const updatePet = (id, pet) => {
  // On fait appel à la fonction updatePet du model
  // Celle ci renvoie le pet dont l'id est _id
  return PetModel.updatePet(id, pet);
}

const deletePet = (id) => {
  // On fait appel à la fonction deletePet du model
  // Celle ci renvoie l'pet dont l'id est _id
  return PetModel.deletePet(id);
}

export default {
  // Controller des views
  getPets: (req, res) => {
    pets()
    .then((data) => {
      // data contient une liste d'pets
      data.forEach(p => {p.birthDate = moment(p.birthDate).format('l')}); 
      res.render('pet/pets', { pets: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getPet: (req, res) => {
    pet(req.params.id)
    .then((data) => {
      data.birthDate = moment(data.birthDate).format('l');
      res.render('pet/pet', { pet: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getPetsByOwnerId: (req, res) => {
    petsByOwnerId(req.params.id)
    .then((data) => {
      // data contient une liste d'pets
      data.forEach(p => {p.birthDate = moment(p.birthDate).format('l')}); 
      res.render('pet/pets', { pets: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreatePet: (req, res) => {
    res.render('pet/createPet');
  },

  postCreatePet: (req, res) => {
    let pet = {
      name: req.body.name,
      breed: req.body.breed,
      birthDate: req.body.birthDate,
      description: req.body.description,
      image: req.body.image,
      ownerId: req.body.ownerId
    };

    createPet(pet)
    .then((data) => {
      res.redirect('/pets');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdatePet: (req, res) => {
    pet(req.params.id)
    .then((data) => {
      res.render('pet/updatePet', { pet: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdatePet: (req, res) => {
    let pet = {
      name: req.body.name,
      breed: req.body.breed,
      birthDate: req.body.birthDate,
      description: req.body.description,
      image: req.body.image,
      ownerId: req.body.ownerId
    };

    updatePet(req.params.id, pet)
    .then((data) => {
      res.redirect('/pets');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeletePet: (req, res) => {
    deletePet(req.params.id)
    .then((data) => {
      res.redirect('/pets');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getPetsApi: (req, res) => {
    pets()
    .then((data) => {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de pets
      res.send(data);
    }, (err) => {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getPetApi: (req, res) => {
    pet(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getPetsByOwnerIdApi: (req, res) => {
    petsByOwnerId(req.params.id)
    .then((data) => {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de pets
      res.send(data);
    }, (err) => {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreatePetApi: (req, res) => {
    let pet = {
      name: req.body.name,
      breed: req.body.breed,
      birthDate: req.body.birthDate,
      description: req.body.description,
      image: req.body.image,
      ownerId: req.body.ownerId
    };

    createPet(pet)
    .then((data) => {
      res.send('Pet successfully created');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdatePetApi: (req, res) => {
    let pet = {
      name: req.body.name,
      breed: req.body.breed,
      birthDate: req.body.birthDate,
      description: req.body.description,
      image: req.body.image,
      ownerId: req.body.ownerId
    };

    updatePet(req.params.id, pet)
    .then((data) => {
      res.send('Pet successfully updated');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeletePetApi: (req, res) => {
    deletePet(req.params.id)
    .then((data) => {
      res.send('Pet successfully deleted');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
