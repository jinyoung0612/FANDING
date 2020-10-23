const express = require('express');
const router = express.Router();

router.get('/api', (req,res)=> res.json({username:"jinyoung2"}));


module.exports=router;