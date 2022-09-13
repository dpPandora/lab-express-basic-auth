const router = require('express').Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User.model');

router.get('/signup', (req, res, next) => {
    res.render('signup')
})
router.post('/signup', (req, res, next) => {
    const {username, password} = req.body;
    const hashedPass = bcrypt.hashSync(password);

    User.create({username, password: hashedPass})
        .then(createdUser => {
            console.log(createdUser);
            res.send(`User ${createdUser.username} created successfuly,,, go to <a href="/login">login</a>?`);
        })
        .catch(err => {
            console.log(err);
            res.send(`Error,,, go back to <a href="/signup">signup</a>?\n` + err);
        })
})

router.get('/login', (req, res, next) => {
    res.render('login')
})
router.post('/login', (req, res, next) => {
    const {username, password} = req.body;
})
module.exports = router;