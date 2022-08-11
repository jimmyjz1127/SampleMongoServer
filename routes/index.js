const express = require('express'); //import express
const router = express.Router(); //create our router variable

//root get 
router.get('/', (req, res) => {
    res.render('index');
})


module.exports = router;