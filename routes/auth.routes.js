const router = require('express').Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User.model');

const { isAuthed, isNotAuthed} = require("../middleware/auth.middleware");

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

router.get('/login', isNotAuthed, (req, res, next) => {
    res.render('login')
})
router.post('/login', (req, res, next) => {
    const {username, password} = req.body;
    
    User.findOne({username})
        .then(foundUser => {
            if (!foundUser) {
                res.send('no user found,,, go back to <a href="/login">login</a>?');
                return;
            }

            const isValid = bcrypt.compareSync(password, foundUser.password);

            if (!isValid) {
                res.send('incorrect password,,, go back to <a href="/login">login</a>?');
                return;
            }

            req.session.user = foundUser;

            res.redirect('/profile')
        })
        .catch(err => {
            console.log(err);
        })
})

router.get('/profile', isAuthed, (req, res, next) => {
    res.render('profile', { username: req.session.user.username});
})
module.exports = router;