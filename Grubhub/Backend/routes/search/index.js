const router = require('express').Router();

router.get('/', (req, res) => {
    console.log("Get items and their restaurants based on search query")
});

module.exports = router;