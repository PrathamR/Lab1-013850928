var router = require('express').Router();

router.get('/search/item', (req, res) => {
    console.log("Get items and their restaurants based on search query")
});

module.exports = router;