#!/usr/bin/env node

const debug  = require("debug")("api:server");
const http   = require('http'),
      util   = require('util');
const mongoose = require('mongoose');
      
const config    = require("../config");
const server    = require("../server");
const package   = require("../package.json");

const host      = config.get("host");
const port      = config.get("port");
const app    = http.createServer(server);

const URI = "mongodb+srv://user_ecomm:1234567890@cluster0.ebsda.mongodb.net/ecomm?retryWrites=true&w=majority"
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((result)=>{
        console.log(`connected ${result}`);
        app.listen(port, host, ()=>{
            process.title = package.name + " " + package.version;
            process.title = util.format("%s %s listening on %s:%s", package.name, package.version, host, port);
            debug("API service started on %s:%s", host, port);
        });
    })
    .catch((err)=> {
        console.log(`error ${err}`);
    })