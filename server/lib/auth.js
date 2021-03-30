const crypto = require('crypto');

const config = require('../../config');
const userSchema = require('../../db/models/user');

module.exports.register = async function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let cpassword = req.body.cpassword;

    let passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    let cpasswordHash = crypto.createHash('sha256').update(cpassword).digest('hex');
    
    console.log("passwords", passwordHash, cpasswordHash);
    if(passwordHash != cpasswordHash) return res.status(412).send({message: "Password and confirm password should match"}).end();
    const token = req.token;

    const user = new userSchema({
        username: username,
        password: passwordHash
    });

    user.save()
    .then(result =>{
        return res.status(200).send({message: "Registration successful", accessToken: token}).end();
    })
    .catch((err)=>{
        console.log(err);
        return res.status(500).send({message: "Registration unsuccessful"}).end();
    });
}

module.exports.login = async function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let passwordHash = crypto.createHash('sha256').update(password).digest('hex');

    userSchema.findById(username)
    .select('password')
    .exec(function(err, doc){
        console.log("response", doc);
        if(err || doc === null) return res.status(404).json({error: 'PersonNotFound'}).end();
        return res.status(200).send({message: "Login successful", token: req.token});
    });
}