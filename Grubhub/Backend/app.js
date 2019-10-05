const express = require('express')
const app = express()

// mount the router on the app
app.use('/api', require('./routes'));

module.exports = app;

/* Move the APIs below to their respectivce files */

const router = express.Router()
router.post('/signupUser', (req, res) => {
    console.log("Signing-up user")
})

router.post('/signupOwner', (req, res) => {
    console.log("Signing-up owner")
})

router.post('/login', (req, res) => {
    console.log("Logging in visitor")
})

router.post('/logout', (req, res) => {
    console.log("Logging out visitor")
})

router.get('/profileUser', (req, res) => {
    console.log("Get user's profile")
})

router.get('/profileOwner', (req, res) => {
    console.log("Get owner's profile")
})

router.post('/updateUser', (req, res) => {
    console.log("Update user's profile")
})

router.get('/owner/getOrders', (req, res) => {
    console.log("Get all active orders")
})

router.post('/owner/cancelOrders', (req, res) => {
    console.log("Cancel an active order")
})

router.get('/owner/archivedOrders', (req, res) => {
    console.log("Get all delivered orders")
})

router.post('/owner/menu/sections', (req, res) => {
    console.log("Add a new menu to your restaurant")
})

router.update('/owner/menu/sections', (req, res) => {
    console.log("Update a menu section in your restaurant")
})

router.post('/owner/menu/items', (req, res) => {
    console.log("Add items to a restaurant menu")
})

router.delete('/owner/menu/items', (req, res) => {
    console.log("Delete items in a restaurant menu")
})

router.update('/owner/menu/items', (req, res) => {
    console.log("Update items in a restaurant menu")
})

router.get('/owner/menu/items', (req, res) => {
    console.log("Get items in a restaurant menu section")
})

router.get('/search/item', (req, res) => {
    console.log("Get items and their restaurants based on search query")
})

router.get('/restaurant', (req, res) => {
    console.log("All sections and items available in restaurant")
})

router.post('/order', (req, res) => {
    console.log("Create a new order based on items in cart")
})

router.get('/order/past', (req, res) => {
    console.log("Get this user's past orders")
})

router.get('/order/upcoming', (req, res) => {
    console.log("Get this user's active orders")
})

app.get("/", (req, res) => {
    res.send("Hello")
})

app.get("/users", (req, res) => {
    let user1 = {firstnNme:"Steph", lastName:"Curry"}
    let user2 = {firstnNme:"Steph", lastName:"Curry"}
    res.json([user1, user2])
})

app.listen(3003, () => {
    console.log("Server listening on port 3003")
})