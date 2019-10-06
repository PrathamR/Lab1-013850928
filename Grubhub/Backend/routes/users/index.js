// create another router for getting 'users' APIs
var router = require('express').Router();

router.post('/signup', (req, res) => {
    console.log("Signing-up user")
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

router.update('/users/profile', (req, res) => {
    console.log("Update user's profile")
});

module.exports = router;