require("dotenv").config();

const express = require("express");
const utils = require("./utils/utils");
const morgan = require("morgan");
const reqUtils = require("./utils/req");
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

const cors = require("cors");

app.use(cors());

morgan.token("headers", (getHeaders = (req) => {
    return reqUtils.printHeaders(req);
}));

app.use(morgan(":method :url :status :response-time ms :req[content-length] B :headers"));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

require(__dirname + '/routes/').forEach(function (route) {
    app.use(route.prefix, route.app);
});

app.get('/heartbeat', (req, res) => {
    res.send("404")
});

app.use(utils.errorHandler);

const PORT = process.env.PORT || 8000;
const IP = process.env.SERVER_IP || "0.0.0.0";

app.listen(PORT, IP, () => {
    console.log(`DotShop server listening at :${PORT}`);
});
