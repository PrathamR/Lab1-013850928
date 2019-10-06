const router = require('express').Router();

router.post('/signup', (req, res) => {
    console.log("Signing-up owner")
});
  
router.post('/login', (req, res) => {
    console.log("Signing-up owner")
});
  
router.post('/logout', (req, res) => {
    console.log("Signing-up owner")
});
  
router.get('/profile', (req, res) => {
    console.log("Get owner's profile")
});
  
router.post('/profile', (req, res) => {
    console.log("Get owner's profile")
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