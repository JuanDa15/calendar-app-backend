const { sign } = require('jsonwebtoken');

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '4h',
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject('Error generating JWT');
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
