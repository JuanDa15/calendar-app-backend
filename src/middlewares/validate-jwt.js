const { request } = require('express');
const { verify } = require('jsonwebtoken');

const validateJWT = (req = request, res, next) => {
  const [_, token] = (req.header('authorization') ?? '').split(' ');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'You dont have permissions',
    });
  }

  try {
    const { uid } = verify(token, process.env.JWT_SECRET);

    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid or expired token',
    });
  }
};

module.exports = {
  validateJWT,
};
