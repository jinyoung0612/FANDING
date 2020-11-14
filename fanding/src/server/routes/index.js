const express = require('express');
const router = express.Router();
const axios = require('axios');
const request = require('request');
const config = require('../../config/finConfig');

router.get('/api', (req,res)=> res.json({username:"jinyoung2"}));

router.post('/api/token', (req,res) =>{
    const authCode = req.body.code;
    console.log(authCode);
    const option = {
        method: "POST",
        url: "https://testapi.openbanking.or.kr/oauth/2.0/token",
        headers: "",
        form: {
            code: authCode,
            client_id: config.client_id,
            client_secret: config.client_secret,
            redirect_uri: "http://localhost:3000/account_auth",
            grant_type: "authorization_code"
        }
    }
    request(option, (error, response, body) => {
        console.log('/token');
        var result = JSON.parse(body);

        console.log('token result');
        console.log(result);

        res.send(result);
    });
})

router.post('/api/account/list', (req,res) =>{
    console.log('/api/account/list');
    console.log(req.body.access_token);
    console.log(req.body.user_seq_no);
    var option2 = {
        method: "GET",
        url: "https://testapi.openbanking.or.kr/v2.0/account/list",
        headers: {
            'Authorization':'Bearer ' + req.body.access_token
        },
        form: {
            user_seq_no: req.body.user_seq_no,
            include_cancel_yn: 'N',
            sort_order: 'D'
        }
    }
    request(option2,function(error,response,body){
        console.log('/account/list');
        var result2 = JSON.parse(body);
        console.log(result2);
       // var fintechNumber = result2.body.res_list[0].fintech_use_num;
       // var realBankName = result2.body.res_list[0].bank_name;
       // var bankHolderName = result2.body.res_list[0].account_holder_name;

       // var account_info = [];
       // account_info = [fintechNumber, realBankName, bankHolderName];
       // console.log(account_info);
       res.send(result2);
    })
})

// 토큰 발급 - 2-legged
router.get('/api/oobToken', function(req, res) {
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
        var result = JSON.parse(body);
        var oob_token = result.access_token;
        console.log(oob_token);
    });
})

module.exports=router;