// create another router for getting 'users' APIs
const router = require('express').Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

router.use(cors({ origin: 'http://localhost:3000', credentials: true }));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const getConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'cmpe273sjsu',
        database: 'grubhub'
    })
};

router.post('/signup', (req, res) => {
    console.log("Signing-up user", req.body);

    const firstName   = req.body.firstname;
    const lastName    = req.body.lastname;
    const email       = req.body.email;
    const phoneNumber = req.body.phone; 
    const password    = req.body.password; 
    const queryString = `INSERT INTO Users (first_name, last_name, email, phone, password_hash) VALUES (?, ?, ?, ?, ?)`;

    getConnection().query(queryString, [firstName, lastName, email, phoneNumber, password], (err, results, fields) => {
        if(err) {
            console.log(`Failed to signup new user ${err}`);
            res.sendStatus(500);
            return;
        }

        console.log(`Added new user with id ${results}`);
        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        });
        res.end("Successful SignUp");
    });
});

router.post('/login', (req, res) => {
    console.log("Logging in visitor")

    const email       = req.body.email;
    const password    = req.body.password; 
    const queryString = `SELECT * FROM Users WHERE email = ? AND password_hash = ? `;

    getConnection().query(queryString, [email, password], (err, results, fields) => {
        if(err) {
            console.log(`Failed to login user ${err}`);
            res.sendStatus(500);
            return;
        }

        console.log(`Logging in user with id ${results}`);
        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        });
        res.end("Successful Login");
    });

});
  
router.post('/logout', (req, res) => {
    console.log("Logging out visitor")
});
  
router.get('/profile', (req, res) => {
    console.log("Get user's profile")
});
  
router.post('/profile', (req, res) => {
    console.log("Get user's profile")
});

module.exports = router;