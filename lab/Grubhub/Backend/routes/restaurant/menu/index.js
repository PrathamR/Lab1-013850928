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

router.get('/sections', (req, res) => {
    console.log("All sections and items available in restaurant")

    const queryString = `SELECT Items.*, Sections.name as sectionName FROM Items JOIN Sections ON Items.sectionID = Sections.id WHERE Items.restID=? ORDER BY Items.sectionID`;

    getConnection().query(queryString, [req.query.rest], (err, results, fields) => {
        if(err) {
            console.log(`Failed to login user ${err}`);
            res.sendStatus(500);
            return;
        }

        console.log("Getting sectoin-wise items for this restaurant ", results);
        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        });
        res.end(JSON.stringify(results));
    });

});

router.post('/sections', (req, res) => {
    console.log("Add a new menu or update existing one")
});
  
router.post('/items', (req, res) => {
    console.log("Add items to a restaurant menu")
});
  
router.delete('/items', (req, res) => {
    console.log("Delete items in a restaurant menu")
});
  
router.get('/items', (req, res) => {
    console.log("Get items in a restaurant menu section")

    const queryString = `SELECT * FROM Items WHERE  = sectionID?`;

    getConnection().query(queryString, [req.query.section], (err, results, fields) => {
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

router.get('/itemsByID', (req, res) => {
    console.log("Get items in a restaurant menu section", JSON.stringify(req.query.id));
    let itemsArray = req.query.id.split(",");

    //for (let i = 0 ; i < req.query.id.length ; i++) {
    //    if(str.charAt())
    //}
    console.log(itemsArray);
    var queryData = [itemsArray];

    const queryString = `SELECT * FROM Items WHERE id IN (?) ORDER BY id`;

    getConnection().query(queryString, queryData, (err, results, fields) => {
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

module.exports = router;