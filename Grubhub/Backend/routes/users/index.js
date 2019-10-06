// create another router for getting 'users' APIs
const router = require('express').Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');

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
    console.log(`Signing-up user ${req.body.first_name}`)

/*     const firstName   = req.body.first_name;
    const lastName    = req.body.last_name;
    const email       = req.body.email;
    const phoneNumber = req.body.phone; */
    const queryString = `INSERT INTO Users (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)`;

    getConnection().query(queryString, ["firstName", "lastName", "email", "111"], (err, results, fields) => {
        if(err) {
            console.log(`Failed to signup new user ${err}`);
            res.sendStatus(500);
            return;
        }

        console.log(`Added new user with id ${results}`);
        res.end();
    });
});

router.post('/login', (req, res) => {
    console.log("Logging in visitor")
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