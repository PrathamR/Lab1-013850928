const router = require('express').Router();

router.get('/', (req, res) => {
    console.log("Get items and their restaurants based on search query")
    // Query all items and also query all restaurants haveing that item
});

module.exports = router;