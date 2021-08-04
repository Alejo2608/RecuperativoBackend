//Modules
const express = require('express');
const router = express.Router();
const News = require('../models/News');
const multer = require('multer');
fs = require('fs-extra')

// SET STORAGE
var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public");
        },
        filename: function (req, file, cb) {
            imageName = file.originalname;
            cb(null, imageName);
        }
    });

var upload = multer({ storage: storage })

//Add
router.get('/add', (req, res) => {
    res.render('news/addNews');
});

router.post('/add', upload.single('file'), (req, res) => {
    const { title, subtitle, category, author, date, description } = req.body;
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    var finalImg = {
        data:  new Buffer(encode_image, 'base64'),
        contentType: req.file.mimetype
    };
    const addNews = new News({title, subtitle, category, author, date, description, finalImg});
    addNews.save();
    res.redirect('/');
});

//Get all 
router.get('/', async (req, res) => {
    await News.find().sort({date: 'desc'})
    .then(docs => {
        const context = {
            news: docs.map(docs => {
                return {
                    title: docs.title,
                    subtitle: docs.subtitle,
                    category: docs.category,
                    author: docs.author,
                    description: docs.description,
                    date: docs.date,
                    _id: docs._id
                }
            })
        }
        res.render('news/listNews', {news: context.news})
    })
})

//Edit 
router.get('/edit/:_id', async (req, res) => {
    const news = await News.findById(req.params._id)
    .then(docs => {
        return {
            title: docs.title,
            subtitle: docs.subtitle,
            category: docs.category,
            date: docs.date,
            author: docs.author,
            description: docs.description,
            _id: docs._id
        }
    });
    res.render('news/editNews', {news})
});

router.put('/edit/:_id', async (req, res) => {
    const { title, subtitle, category, author, date, description } = req.body;
     await News.findByIdAndUpdate(req.params._id, { title, subtitle, category, author, date, description });
     res.redirect('/')
});

router.delete('/delete/:_id', async (req, res) => {
   await News.findByIdAndDelete(req.params._id);
   res.redirect('/')
});

module.exports = router;