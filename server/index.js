const express = require('express'),
      cors    = require('cors'),
      bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/", require("./routes/"));
app.use("/product", require("./routes/product"));
app.use("/user", require("./routes/account"));

app.use((err, req, res, next) =>{
    res.status(err.status || 500);
    res.json(err);
    next(err);
})

module.exports = app;