const express = require("express");
const Controller = require("./controller");
const app = express();
const { auth, autz } = require(".//middlewares/auth");
const error = require('./middlewares/error')
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", Controller.register);
app.post("/login", Controller.login);

app.use(auth);

app.get("/games", Controller.read);
app.post("/games", Controller.add);

app.delete("/games/:id", autz, Controller.delete);
app.put("/games/:id", autz, Controller.edit);

app.use(error)
module.exports = app;