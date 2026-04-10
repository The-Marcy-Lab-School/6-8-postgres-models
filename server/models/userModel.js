// models/userModel.js
// Postgres-backed User model — same interface as userModel-in-memory.js.
// Controllers and routes are unchanged between the two versions.

const pool = require('../db/pool');

// Returns all users — never expose password
module.exports.list = async () => {
  // TODO
};

// Stores the user and returns user_id and username — never expose password
module.exports.create = async (username, password) => {
  // TODO
};

// Returns user_id and username — never exposes password
// Used only to check whether a username is already taken (register)
// Returns null if not found
module.exports.findByUsername = async (username) => {
  // TODO
};

// Finds the user by username and validates the password
// Returns user_id and username if credentials match — never exposes password
// Returns null if not found or password doesn't match
module.exports.validatePassword = async (username, password) => {
  // TODO
};

// Updates the user's password and returns user_id and username — never expose password
// Returns null if not found
module.exports.update = async (user_id, password) => {
  // TODO
};

// Deletes the user and returns user_id and username
// Returns null if not found
module.exports.destroy = async (user_id) => {
  // TODO
};
