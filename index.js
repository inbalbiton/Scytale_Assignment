require("dotenv").config();
var express = require("express");
var logger = require("morgan");
const cors = require("cors");
var app = express();

// Pullrequest module
const pr = require("./Routes/PullRequests/pr");

// cors configuration
const corsConfig = {
    origin: true,
    credentials: true
  };
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

//requests logger
app.use(logger("dev"));
app.use(logger(":method :url :status  :response-time ms"));

//for encoding data from client and send data
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

//routing all request with "/prs" prefix to the correct module
app.use("/prs", pr);


const hostname = process.env.HOSTNAME || localhost
const port = process.env.PORT || 3004;

const server = app.listen(port, () => {
    console.log(`Server listen on http://${hostname}:${port}/`);
});

// process.on("SIGINT", function () {
//     if (server) {
//       server.close(() => console.log("server closed"));
//     }
//     process.exit();
// });
  
// Default router
app.use( (req,res) => {
  console.log("badrequest");
  res.sendStatus('400')
});

// When we get error in some request
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send({ message: err.message, success: false });
});

