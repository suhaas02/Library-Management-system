const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(morgan('dev'));

//defining get request for home page.
app.get('/', (req,res) => {
    res.render("home", {variable: "joey"});
})

const books = [{
    bookName: "Rudest Book Ever",
    bookAuthor: "Shwetabh Gangwar",
    bookPages: 200,
    bookPrice: 240,
    bookState: "Available"
},
{
    bookName: "Do Epic Shit",
    bookAuthor: "Ankur Wariko",
    bookPages: 200,
    bookPrice: 240,
    bookState: "Available"
}
]

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/',(req,res) => {
    res.render("home", {
        data: books
    })
})

app.post("/", (req,res) => {
    const ipBookName = req.body.bookName;
    const ipBookAuthor = req.body.bookName;
    const ipBookPages = req.body.bookName;
    const ipBookPrice = req.body.bookName;

    books.push({
        bookName: ipBookAuthor,
        bookAuthor: ipBookAuthor,
        bookPages: ipBookPages,
        bookPrice: ipBookPrice,
        bookState: "Available"
    })
    res.render("home", {
        data: books
    })
})

app.post('/issue', (req, res) => {
    var requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName == requestedBookName) {
            book.bookState = "Issued";
        }
    })
    res.render("home", {
        data: books
    })
})
  
app.post('/return', (req, res) => {
    var requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName == requestedBookName) {
            book.bookState = "Available";
        }
    })
    res.render("home", {
        data: books
    })
})
  
app.post('/delete', (req, res) => {
    var requestedBookName = req.body.bookName;
    var j = 0;
    books.forEach(book => {
        j = j + 1;
        if (book.bookName == requestedBookName) {
            books.splice((j - 1), 1)
        }
    })
    res.render("home", {
        data: books
    })
})

app.listen(3000, (req,res) => {
    console.log("Server is up and running");
})