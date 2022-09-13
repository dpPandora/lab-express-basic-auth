const isAuthed = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

const isNotAuthed = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/profile');
    }
    next();
}

module.exports = {isAuthed, isNotAuthed};