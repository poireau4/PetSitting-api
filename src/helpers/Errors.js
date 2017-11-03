// Liste des erreurs que l'API peut renvoyer

const list = {
  noAdvertsError: {
    code: 500,
    error: 'noAdvertsError',
    error_description: 'La base ne contient pas d\'annonce'
  },
  noAdvertError: {
    code: 500,
    error: 'noAdvertError',
    error_description: 'Cette annonce n\'existe pas'
  },
  noUsersError: {
    code: 500,
    error: 'noUsersError',
    error_description: 'La base ne contient pas d\'utilisateur'
  },
  noUserError: {
    code: 500,
    error: 'noUserError',
    error_description: 'Cet utilisateur n\'existe pas'
  },
  noBookingsError: {
    code: 500,
    error: 'noBookingsError',
    error_description: 'La base ne contient pas de booking'
  },
  noBookingError: {
    code: 500,
    error: 'noBookingError',
    error_description: 'Ce booking n\'existe pas'
  },
};

export default (err) => {
  if (err instanceof Error && err.message){
    return list[err.message] ? list[err.message] : { code: 500, error: 'UnknownError', error_description: 'Unknown error' };
  } else {
    return list[err] ? list[err] : { code: 500, error: 'UnknownError', error_description: 'Unknown error' };
  }
};