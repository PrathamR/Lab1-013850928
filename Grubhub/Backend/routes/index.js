/* Router file, contains all the routes */

const express = require('express');
const router = express.Router();

// mount our 'products' router onto the API router
// api/products/
router.use('/products', require('./products')); 

// let's mount a few more...
router.use('/search', require('./search'));  
router.use('/cart', require('./cart'));  
router.use('/userCreation', require('./userCreation'));  
router.use('/checkout', require('./checkout'));  
router.use('/promo', require('./promo'));  
router.use('/account', ensureAuthenticated, require('./account'));  
router.use('/admin', ensureAuthenticated, require('./admin'));

module.exports = router;  