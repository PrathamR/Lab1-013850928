var router = require('express').Router();

router.post('/', (req, res) => {
    console.log("Create a new order based on items in cart")
  })

module.exports = router;