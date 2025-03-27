const express = require('express');
const router = express.Router();
const presentationRoute = require("./presentationRoute")


router.use('/presentations', presentationRoute);

module.exports = router;
