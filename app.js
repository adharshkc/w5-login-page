const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
// const cookieParser = require('cookie-parser')
const mongoose = require("mongoose");
// require('dotenv').config()

const PORT = process.env.PORT || 3002;


const homeRouter = require("./routes/homeRouter");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
// app.use(cookieParser())
app.use(
  session({
    secret: "some secret key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
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
app.use("/", userRouter);
app.use("/", homeRouter);
app.use("/", adminRouter)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  mongoose
    .connect("mongodb://localhost:27017/makbig")
    .then(() => console.log("connected to db"));
});
