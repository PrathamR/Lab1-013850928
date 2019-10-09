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
    console.log("Signing-up owner")

    const ownerName   = req.body.ownername;
    const restName    = req.body.restname;
    const email       = req.body.email;
    const password    = req.body.password; 
    const cuisine     = req.body.cuisine; 
    const queryString = `INSERT INTO Restaurants (owner_name, name, email, password_hash, cuisine) VALUES (?, ?, ?, ?, ?)`;

    getConnection().query(queryString, [ownerName, restName, email, password, cuisine], (err, results, fields) => {
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
    console.log("Signing-up owner")
    const email       = req.body.email;
    const password    = req.body.password; 
    const queryString = `SELECT * FROM Restaurants WHERE email = ? AND password_hash = ? `;

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
    console.log("Signing-up owner")
});
  
router.get('/profile', (req, res) => {
    console.log("Get owner's profile")

    const queryString = `SELECT * FROM Restaurants WHERE email = ?`;

    getConnection().query(queryString, [req.query.email], (err, results, fields) => {
        if(err) {
            console.log(`Failed to login user ${err}`);
            res.sendStatus(500);
            return;
        }

        console.log(`Profile of user - ${results}`);
        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        });
        res.end(JSON.stringify(results));
    });
});
  
router.post('/profile', (req, res) => {
    console.log("Get owner's profile")

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

router.get('/restaurant/getOrders', (req, res) => {
    console.log("Get all active orders")
});
  
router.post('/restaurant/cancelOrders', (req, res) => {
    console.log("Cancel an active order")
});
  
router.get('/restaurant/archivedOrders', (req, res) => {
    console.log("Get all delivered orders")
});

router.use('/menu', require('./menu'));    // Place new order

module.exports = router;