const initiateServiceParameters = () => {
  if (process.env.NODE_ENV === 'LOCAL') {
    process.env.BASE_URL = 'http://localhost:5000'
  } else {
    process.env.BASE_URL = 'https://firelibrary.herokuapp.com'
  }
};

initiateServiceParameters();