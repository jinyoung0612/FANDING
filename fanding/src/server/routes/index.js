const express = require('express');
const router = express.Router();
const axios = require('axios');
const request = require('request');
const config = require('../../config/finConfig');

router.get('/api', (req,res)=> res.json({username:"jinyoung2"}));

router.get('/verification', function(req,res){
    const url = "https://testapi.openbanking.or.kr/oauth/2.0/authorize";
    const params = {
        response_type: code,
        client_id: config.client_id,
        redirect_uri: 'http://localhost:3000/account_auth',
        scope: 'login inquiry transfer',
        state: '202002CAPSTONEPROJECTTEAM002A2B2',
        auth_type: '0',
    }
    axios.get(url, params)
    .then((res)=>res.json(res))
    res.json(req.params)
})

router.post('/verification', function(req, res,next){
    if(req.params){
        res.json(res.params)
        next()
    }
    if(req, body){
        res.json(req.body)
    }
})

module.exports=router;