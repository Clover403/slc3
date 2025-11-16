const bcrypt = require("bcryptjs");

const hash = (pass) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pass, salt);
};

const compare = (pass, hash) => {
  return bcrypt.compareSync(pass, hash);
};

module.exports = { hash, compare };
