const express = require("express");
const userRouter = require("./routers/user");
const functionsRouter = require("./routers/functions");
const mediaRouter = require("./routers/media");
const articleRouter = require("./routers/articles");
var cors = require("cors");

const port = process.env.PORT;
require("./db/db");

var corsOptions = {
  origin: function(origin, callback) {
    callback(null, true);
  }
};
const app = express();
app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(userRouter);
app.use(functionsRouter);
app.use(mediaRouter);
app.use(articleRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
