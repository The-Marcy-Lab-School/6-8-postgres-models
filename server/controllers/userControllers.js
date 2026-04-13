const userModel = require('../models/userModel-in-memory');

// GET /api/users
const listUsers = async (req, res, next) => {
  try {
    const users = await userModel.list();
    res.send(users);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/users/:user_id { password }
const updateUser = async (req, res, next) => {
  try {
    const { password } = req.body;
    const user = await userModel.update(req.params.user_id, password);
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.send(user);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/users/:user_id
const deleteUser = async (req, res, next) => {
  try {
    const user = await userModel.destroy(req.params.user_id);
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { listUsers, updateUser, deleteUser };
