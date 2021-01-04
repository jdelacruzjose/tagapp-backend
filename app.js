require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");

// IF YOU STILL DIDN'T, GO TO 'configs/passport.js' AND UN-COMMENT OUT THE WHOLE FILE

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gd0jc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

// app.use(
//   require("node-sass-middleware")({
//     src: path.join(__dirname, "public"),
//     dest: path.join(__dirname, "public"),
//     sourceMap: true
//   })
// );

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// ADD SESSION SETTINGS HERE:
app.use(
  session({
    secret: "some secret goes here",
    resave: true,
    saveUninitialized: true,
  })
);

require("./configs/passport");

// USE passport.initialize() and passport.session() HERE:
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(
    "this is the user info form within app.js ******************* ",
    req.user
  );
  next();
});

// default value for title local
app.locals.title = "Tag Along";

// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"], // <== this will be the URL of our React app (it will be running on port 3000)
  })
);

// ROUTES MIDDLEWARE STARTS HERE:
const authRoutes = require("./routes/auth-routes");
app.use("/api", authRoutes);

const index = require("./routes/index");

app.use("/", index);
app.use("/api", require("./routes/shenanigan-routes"));
app.use("/api", require("./routes/transportation-routes"));
app.use("/api", require("./routes/file-upload-routes"));

app.use((req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
module.exports = app;
