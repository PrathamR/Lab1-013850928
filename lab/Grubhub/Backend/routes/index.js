/* Router file, contains all the routes */

const express = require('express');
const router = express.Router();

// mount our 'products' router onto the API router
// api/products/

router.use('/users', require('./users'));    // Singup, login, logout, profile
router.use('/search', require('./search'));  // Search items and restaurants
router.use('/orders', require('./orders'));      // Get past and upcoming
router.use('/restaurant', require('./restaurant'));  // Signup, login, logout, profile, other options
router.use('/checkout', require('./checkout'));    // Place new order

//router.use('/admin', ensureAuthenticated, require('./admin'));

module.exports = router;  