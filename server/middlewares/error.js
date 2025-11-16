const error = (err, req, res, next) => {
  console.log(err, "AAAAAAAAAAAAAAAAAAAAAAA");

  let status = 500;
  let message = "Internal server error";

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "BadRequest":
      status = 400;
      message = err.message || "Bad request";
      break;
    case "LoginError":
      status = 401;
      message = "Invalid email/password";
      break;
    case "Unauthorized":
    case "JsonWebTokenError":
    case "TokenExpiredError":
      status = 401;
      message = "Invalid token";
      break;
    case "Forbidden":
      status = 403;
      message = "You are not authorized";
      break;
    case "Notfound":
      status = 404;
      message = "Data not found";
      break;
    default:
      break;
  }

  res.status(status).json({ message });
};

module.exports = error;
