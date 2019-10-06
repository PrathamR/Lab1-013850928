var router = require('express').Router();

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
  })
  
  router.post('/restaurant/cancelOrders', (req, res) => {
    console.log("Cancel an active order")
  })
  
  router.get('/restaurant/archivedOrders', (req, res) => {
    console.log("Get all delivered orders")
  })
  
  router.post('/restaurant/menu/sections', (req, res) => {
    console.log("Add a new menu to your restaurant")
  })
  
  router.update('/restaurant/menu/sections', (req, res) => {
    console.log("Update a menu section in your restaurant")
  })
  
  router.post('/restaurant/menu/items', (req, res) => {
    console.log("Add items to a restaurant menu")
  })
  
  router.delete('/restaurant/menu/items', (req, res) => {
    console.log("Delete items in a restaurant menu")
  })
  
  router.update('/restaurant/menu/items', (req, res) => {
    console.log("Update items in a restaurant menu")
  })
  
  router.get('/restaurant/menu/items', (req, res) => {
    console.log("Get items in a restaurant menu section")
  })
  
  router.get('/restaurant/menu/sections', (req, res) => {
    console.log("All sections and items available in restaurant")
  })

module.exports = router;