const express = require('express')
const app = express()

// mount the router on the app
app.use('/', require('./routes'));

module.exports = app;

/* Move the APIs below to their respectivce files */

/* app.get("/", (req, res) => {
    res.send("Hello")
}) */

/* app.get("/users", (req, res) => {
    let user1 = {firstnNme:"Steph", lastName:"Curry"}
    let user2 = {firstnNme:"Steph", lastName:"Curry"}
    res.json([user1, user2])
}) */

app.listen(3003, () => {
    console.log("Server listening on port 3003")
})