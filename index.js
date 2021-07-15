const express = require('express')
const app = new express()

const ejs = require('ejs')
app.set('view engine','ejs')
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const fileUpload = require('express-fileupload')
app.use(fileUpload())

const validateMiddleware = require("./middleware/validationMiddleware");

app.use('/posts/store',validateMiddleware);

const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const aboutController = require('./controllers/about');
const contactController = require('./controllers/contact');
const newPostController = require('./controllers/newPost');
const newUserController = require('./controllers/newUser');


app.listen(4000, ()=>{
console.log('App listening on port 4000')
})

app.get('/', homeController);

app.get('/about', aboutController);

app.get('/contact', contactController);

app.get('/post/:id', getPostController);

app.get('/posts/new',newPostController)

app.post('/posts/store', storePostController);

app.get('/auth/register', newUserController);


    
    
        