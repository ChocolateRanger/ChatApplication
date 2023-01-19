const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // res.json({ msg: 'This is CORS-enabled for all origins!' })
    res.send("Server is Up and Running");
})

module.exports = router;
