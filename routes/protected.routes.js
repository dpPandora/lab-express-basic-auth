const { isAuthed } = require('../middleware/auth.middleware');

const router = require('express').Router();

router.get('/main', isAuthed, (req, res, next) => {
    res.render('main');
})

router.get('/private', isAuthed, (req, res, next) => {
    res.render('protect');
})

module.exports = router;