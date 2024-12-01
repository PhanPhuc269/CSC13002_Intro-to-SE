const express = require ('express');
const router =express.Router();

const sitesController= require('../app/controllers/SitesController');

router.post('/auth/google',sitesController.google);
router.post('/login',sitesController.login);


module.exports = router;