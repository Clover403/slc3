const bcrypt = require("bcryptjs");

const hash = (pass) => {
  return bcrypt.hashSync(pass);
};
const compare = (pass, hash) => {
  return bcrypt.compareSync(pass, hash);
};

module.exports = { hash, compare };
