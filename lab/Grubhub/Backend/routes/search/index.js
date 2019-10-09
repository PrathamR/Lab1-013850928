const router = require('express').Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

router.use(cors({ origin: 'http://localhost:3000', credentials: true }));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
/* 
Code used to test without connection pooling commented out

const getConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'cmpe273sjsu',
        database: 'grubhub'
    })
}; */

const pool = mysql.createPool({
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        password: 'cmpe273sjsu',
        database: 'grubhub'
    });

router.get('/', (req, res) => {
    console.log("Get items and their restaurants based on search query ", req.query.search)
    // Query all items and also query all restaurants haveing that item

    const searchQuery = req.query.search; 
    let items = []
    let myrestArray = [];
    //const queryString = `SELECT INTO Users (first_name, last_name, email, phone, password_hash) VALUES (?, ?, ?, ?, ?)`;
    let queryString = `SELECT * FROM Items WHERE name = ?`;

    pool.getConnection(function(err, conn) {
        if(err) {
            res.send("Error occured");
        } else {
            conn.query(queryString, [searchQuery], (err, results, fields) => {
                if(err) {
                    console.log(`Failed to signup new user ${err}`);
                    res.sendStatus(500);
                    return;
                }

    /*
    Code used to test without connection pooling commented out

    getConnection().query(queryString, [searchQuery], (err, results, fields) => {
        if(err) {
            console.log(`Failed to signup new user ${err}`);
            res.sendStatus(500);
            return;
        } */
        restArray = [];
        console.log("Results are", results);
        items = results;
        console.log("Items are", items, items[0].restID);
        for (let item of items) {
            console.log(item.restID, restArray);
            restArray.push(item.restID.toString());
        }

        console.log(restArray);
        
        queryString = `SELECT * FROM Restaurants WHERE id IN (?)`;
        var queryData = [restArray];
        conn.query(queryString, queryData, (err, results, fields) => {
                if(err) {
                    console.log(`Failed to signup new user ${err}`);
                    res.sendStatus(500);
                    return;
                }

        console.log("Results are", results);

        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        });
        res.end(JSON.stringify(results));

    });

    });

    }});
    
});

module.exports = router;