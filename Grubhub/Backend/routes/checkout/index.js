const router = require('express').Router();

router.post('/', (req, res) => {
    console.log("Create a new order based on items in cart")

    const items   = req.body.items;
    const address    = req.body.address;
    const restID       = req.body.restID;
    const userID = req.body.UserID; 
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