const error = (error, req, res, next) => {
  console.log(error, "AAAAAAAAAAAAAAAAAAAAAAA");

  let message = "Internal server error";
  let status = 500;

  if (error.name == "Badrequest") {
    message = error.errors[0].message;
    status = 400;
  }
  if (error.name == "SequelizeValidationErro") {
    message = error.errors[0].message;
    status = 400;
  }

  if (error.name == "BadLogin") {
    message = "Invalid email/password";
    status = 401;
  }
  if (error.name == "Notfound") {
    message = "Data not found";
    status = 404;
  }
  if (error.name == "Forbidden") {
    message = "You are not authorized";
    status = 403;
  }
  if (error.name == "Unauthorized") {
    message = "Invalid token";
    status = 401;
  }
  res.status(status).json({message});
};

module.exports = error;
