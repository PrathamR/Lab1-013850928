var router = require('express').Router();
  
  router.get('/past', (req, res) => {
    console.log("Get this user's past orders")
  })
  
  router.get('/upcoming', (req, res) => {
    console.log("Get this user's active orders")
  })

module.exports = router;