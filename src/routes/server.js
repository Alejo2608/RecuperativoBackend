const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('server');
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;