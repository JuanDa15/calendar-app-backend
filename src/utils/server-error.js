const { response } = require('express');

const serverError = (error, res = response) => {
  console.error(error);
  res.status(500).json({
    ok: false,
    msg: 'Something went wrong',
  });
};

module.exports = {
  serverError,
};
