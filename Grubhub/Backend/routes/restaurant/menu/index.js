const router = require('express').Router();

router.get('/sections', (req, res) => {
    console.log("All sections and items available in restaurant")

    const queryString = `SELECT * FROM Sections WHERE restID = ?`;

    getConnection().query(queryString, [req.query.rest], (err, results, fields) => {
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

module.exports = router;