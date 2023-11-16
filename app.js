const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const path = require("path");
const session = require('express-session')
// const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3002;


const homeRouter = require("./routes/homeRouter");
const loginRouter = require("./routes/loginRouter");
// app.use(cookieParser())
app.use(session({
  secret: 'some secret key',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000}
}))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts",
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use("/", loginRouter);
app.use("/", homeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
