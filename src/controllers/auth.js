const { request, response } = require('express');
const User = require('../models/User');
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const { serverError } = require('../utils/server-error');
const { generateJWT } = require('../utils/jwt');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'Email is not registered',
      });
    }

    const isValidPassword = compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        ok: false,
        msg: 'Email or password invalid',
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      msg: 'Login success',
      data: { ...user.toJSON(), token },
    });
  } catch (error) {
    serverError(error, res);
  }
};

const register = async (req = request, res = response) => {
  const { name, email, password } = req.body;

  try {
    const isEmailUsed = await User.findOne({ email });

    if (isEmailUsed) {
      return res.status(409).json({
        ok: false,
        msg: 'Email is already registered',
      });
    }

    const user = new User({ name, email, password });

    const salt = genSaltSync();
    user.password = hashSync(password, salt);

    await user.save();

    res.status(201).json({
      ok: true,
      msg: 'User created',
    });
  } catch (error) {
    serverError(error, res);
  }
};

const renew = async (req, res) => {
  const token = await generateJWT(req.uid);

  res.json({
    ok: true,
    msg: 'Token renewed',
    data: token,
  });
};

module.exports = {
  login,
  register,
  renew,
};
