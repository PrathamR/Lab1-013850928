const router = require('express').Router();

router.get('/sections', (req, res) => {
    console.log("All sections and items available in restaurant")
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
});

module.exports = router;