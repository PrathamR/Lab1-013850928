const router = require('express').Router();
var cors = require('cors');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.use(cors({ origin: 'http://localhost:3004', credentials: true }));
  
router.post('/add', (req, res) => {
    console.log("Add numbers");

    const op1 = req.body.op1;
    const op2 = req.body.op2;

    let result = parseInt(op1) + parseInt(op2);

    console.log(`Adding ..`);
    res.writeHead(200,{
            'Content-Type' : 'text/plain'
    });
    res.end(JSON.stringify(result));
});
  
router.post('/subtract', (req, res) => {
    console.log("Subtract");

    const op1 = req.body.op1;
    const op2 = req.body.op2;

    let result = parseInt(op1) - parseInt(op2);

    console.log(`Subtracting ..`);
    res.writeHead(200,{
            'Content-Type' : 'text/plain'
    });
    res.end(JSON.stringify(result));
});

router.post('/multiply', (req, res) => {
    console.log("Multiple numbers");

    const op1 = req.body.op1;
    const op2 = req.body.op2;

    let result = parseInt(op1) * parseInt(op2);

    console.log(`Multiplying ..`);
    res.writeHead(200,{
            'Content-Type' : 'text/plain'
    });
    res.end(JSON.stringify(result));
});

router.post('/divide', (req, res) => {
    console.log("Divide");

    const op1  = req.body.op1;
    const op2  = req.body.op2;
    let result = 0

    if (op2 == 0) {
        result = "Undefined : Division by 0"
    } else {
        result = parseInt(op1) / parseInt(op2);
    }

    console.log(`Dividing ..`);
    res.writeHead(200,{
            'Content-Type' : 'text/plain'
    });
    res.end(JSON.stringify(result));
});

module.exports = router;