const express = require('express');
const router = express.Router();
const axios = require('axios');
const request = require('request');
const config = require('../../config/finConfig');

router.get('/api', (req,res)=> res.json({username:"jinyoung2"}));

/*
router.get('/verification', function(req,res){
    console.log('authorize')
    const url = "https://testapi.openbanking.or.kr/oauth/2.0/authorize";
    const params = {
        response_type: 'code',
        client_id: config.client_id,
        redirect_uri: 'http://localhost:3000/account_auth',
        scope: 'login inquiry transfer',
        state: '202002CAPSTONEPROJECTTEAM002A2B2',
        auth_type: '0',
    }
    axios.get(url, params)
    .then((res)=>res.json(res))
    console.log(res.json(req.params));

})

router.post('/verification', function(req, res,next){
    if(req.params){
        res.json(res.params)
        next()
    }
    if(req, body){
        res.json(req.body)
    }
})*/

router.get('/token', function(req,res){
    var option = {
        method: "POST",
        url: "https://testapi.openbanking.or.kr/oauth/2.0/token",
        headers: "",
        form: {
            code : req.body.code,
            client_id: config.client_id,
            client_secret: config.client_secret,
            redirect_uri: "http://localhost:3000/account_auth",
            grant_type: "authorization_code"
        }
    }
    request(option, function (error, response, body) {
        console.log('/token');
        var result = JSON.parse(body);
        console.log(result);
        var accesstoken = result.access_token;
        var refreshtoken = result.refresh_token;
        var userseqno = result.user_seq_no;
    });
    //res.render('account_auth');
})

// 토큰 발급 - 2-legged
router.get('/oobToken', function(req, res) {
    var option = {
        method : "POST",
        url : "https://testapi.openbanking.or.kr/oauth/2.0/token",
        headers : "",
        form : {
            client_id : config.client_id,
            client_secret : config.client_secret,
            scope : 'oob',
            grant_type : 'client_credentials'
        }
    }
    request(option, function (error, response, body) {
        console.log('/oobToken');
        console.log(body);       
    });
})

module.exports=router;