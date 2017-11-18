// Controller de la route '/users'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import UserModel from "../models/UserModel";

const users = () => {
  // On fait appel à la fonction getUsers du model
  // Celle ci renvoie toutes les users présents en base
  return UserModel.getUsers()
  .then((data) => {
    // On récupère ici data qui est une liste d'user

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noUsersError'
      throw new Error('noUsersError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    let response = [];
    for (let user of data){
      // On parcours data. pour chaque élément, on garde les champs name, venue, description, capacity, price, image et date
      response[response.length] = {
        id: user._id,
        userName: user.userName,
        fistName: user.fistName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        birthDate: user.birthDate,
        location: user.location,
        phoneNumber: user.phoneNumber,
        description: user.description, 
        image: user.image
      }
    }

    // Avant d'envoyer la réponse on la tri par ordre de date
    return _.sortBy(response, 'userNamer');
  });
}

const user = (_id) => {
  // On fait appel à la fonction getUser du model
  // Celle ci renvoie l'user dont l'id est _id
  return UserModel.getUser(_id)
  .then((user) => {
    // On récupère ici data qui est une liste de users

    if (user === null) {
      // Si data est vide, nous renvoyons l'erreur 'noUserError'
      throw new Error('noUserError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    let response = {
      id: user._id,
      userName: user.userName,
      fistName: user.fistName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      birthDate: user.birthDate,
      location: user.location,
      phoneNumber: user.phoneNumber,
      description: user.description, 
      image: user.image
    };
    return response;
  });
}

const createUser = (user) => {
  // On fait appel à la fonction createUser du model
  // Celle ci renvoie l'user dont l'id est _id
  return UserModel.createUser(user);
}

const updateUser = (id, user) => {
  // On fait appel à la fonction updateUser du model
  // Celle ci renvoie l'user dont l'id est _id
  return UserModel.updateUser(id, user);
}

const deleteUser = (id) => {
  // On fait appel à la fonction deleteUser du model
  // Celle ci renvoie l'user dont l'id est _id
  return UserModel.deleteUser(id);
}

export default {
  // Controller des views
  getUsers: (req, res) => {
    users()
    .then((data) => {
      // data contient une liste d'users
      res.render('user/users', { users: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUser: (req, res) => {
    user(req.params.id)
    .then((data) => {
      res.render('user/user', { user: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreateUser: (req, res) => {
    res.render('user/createUser');
  },

  postCreateUser: (req, res) => {
    let user = {
      userName: req.body.userName,
      fistName: req.body.fistName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      birthDate: req.body.birthDate,
      location: req.body.location,
      phoneNumber: req.body.phoneNumber,
      description: req.body.description, 
      image: req.body.image
    };

    createUser(user)
    .then((data) => {
      res.redirect('/users');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdateUser: (req, res) => {
    user(req.params.id)
    .then((data) => {
      res.render('user/updateUser', { user: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateUser: (req, res) => {
    console.error(req.body);
    let user = {
      userName: req.body.userName,
      fistName: req.body.fistName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      birthDate: req.body.birthDate,
      location: req.body.location,
      phoneNumber: req.body.phoneNumber,
      description: req.body.description, 
      image: req.body.image
    };

    updateUser(req.params.id, user)
    .then((data) => {
      res.redirect('/users');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeleteUser: (req, res) => {
    deleteUser(req.params.id)
    .then((data) => {
      res.redirect('/users');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getUsersApi: (req, res) => {
    users()
    .then((data) => {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de users
      res.send(data);
    }, (err) => {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUserApi: (req, res) => {
    user(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateUserApi: (req, res) => {
    let user = {
      userName: req.body.userName,
      fistName: req.body.fistName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      birthDate: req.body.birthDate,
      location: req.body.location,
      phoneNumber: req.body.phoneNumber,
      description: req.body.description, 
      image: req.body.image
    };

    createUser(user)
    .then((data) => {
      res.send('User successfully created');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateUserApi: (req, res) => {
    let user = {
      userName: req.body.userName,
      fistName: req.body.fistName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      birthDate: req.body.birthDate,
      location: req.body.location,
      phoneNumber: req.body.phoneNumber,
      description: req.body.description, 
      image: req.body.image
    };

    updateUser(req.params.id, user)
    .then((data) => {
      res.send('User successfully updated');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeleteUserApi: (req, res) => {
    deleteUser(req.params.id)
    .then((data) => {
      res.send('User successfully deleted');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
