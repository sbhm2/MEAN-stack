const express = require('express');
const productSchema = require("../../db/models/product");

const router = express.Router();

router.post('/add', async (req, res)=>{
    let productTitle = req.body.title;
    const product = new productSchema({
        title: productTitle
    });

    product.save()
    .then(result =>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    })
})

module.exports = router;