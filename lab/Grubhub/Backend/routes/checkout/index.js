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

router.post('/', (req, res) => {
    console.log("Create a new order based on items in cart")

    let items       = req.body.itemsList;  // List of Item IDs
    let quantities  = req.body.quantities;
    let address     = req.body.address;
    let restID      = req.body.restID;
    let userID      = req.body.userID; 
    let queryString = `INSERT INTO Orders (restID, userID, status, address) VALUES (?, ?, ?, ?)`;

    console.log(items);
    console.log(quantities);

    getConnection().query(queryString, [restID, userID, "New", address], (err, results, fields) => {
        if(err) {
            console.log(`Failed to order ${err}`);
            res.sendStatus(500);
            return;
        }

        console.log("Added new order with id", results);
 /*        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        });
        res.end("Successful Order"); */
        //quantities = [3, 2];
        //items = [4,6];

        let newOrderID = results.insertId;
    console.log("Adding OrderItems for", newOrderID);

    for (let i = 0; i < quantities.length; i++) {
      console.log("Adding OrderItems", i);
      let queryString  = `INSERT INTO OrderItems (orderID, itemID, quantity) VALUES (?, ?, ?)`;
      getConnection().query(queryString, [newOrderID, items[i], quantities[i]], (err, results, fields) => {
        if(err) {
            console.log(`Failed to order ${err}`);
            res.sendStatus(500);
            return;
        }

        console.log("Added new order with id", results);
        
    });
    }

    res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        });
        res.end("Successful Order");

    });

  });

  router.get('/', (req, res) => {
    console.log("Create a new order based on items in cart")

    const items     = req.body.items;
    const address   = req.body.address;
    const restID    = req.body.restID;
    const userID    = req.body.UserID; 
    let queryString = `INSERT INTO Orders (restID, userID, address) VALUES (?, ?, ?)`;

    getConnection().query(queryString, [restID, userID, address], (err, results, fields) => {
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

module.exports = router;