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

//사용자/계좌 관리
router.post('/api/user/me', (req,res) =>{
    console.log('/api/user/me');
    
    var accessToken = req.body.access_token;
    var userSeqNo = req.body.user_seq_no;
    console.log('req.body.access_token: ',accessToken);
    console.log('req.body.user_seq_no: ', userSeqNo);

    var option2 = {
        method: "GET",
        url: "https://testapi.openbanking.or.kr/v2.0/user/me",
        headers: {
            Authorization:'Bearer '+ accessToken
        },
        qs: {
            user_seq_no: userSeqNo
        }
    }
    request(option2,function(error,response,body){
        console.log('/user/me');
        var result2 = JSON.parse(body);
        //console.log('user me result: ',result2);
        //var userName = result2.user_name;
        //console.log('user name : ', userName);
        //var res_list0 = result2.res_list[0];
        //console.log('res_list[0]: ', res_list0);
       
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

router.get('/api/authResult', function(req,res){
    console.log('authResult');
    console.log(req.query);
    var authCode=req.query.code;

    // if(authCode==null){
    //     console.log("사용자 인증 코드 요청 없음");
    //     // res.send("null")
    // }
    // else{
        console.log(authCode);
        // res.send(authCode);
        var option={
            method : "POST",
            url : "https://testapi.openbanking.or.kr/oauth/2.0/token",
            header : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            form : {
                code : authCode,
                client_id : 'fHcAK2eGVzYpQN6p860McUqC0xiku8UnU95iqRyM',
                client_secret : '3dmg9c0lkuW6jJJVrmNqTyPKY301Xdy3dPyBJv64',
                redirect_uri : 'http://localhost:3001/api/authResult',
                grant_type : 'authorization_code'
            }
        }

        request(option,function(error,response,body){
            console.log(body);

            var result= JSON.parse(body);
            var accessToken = result.access_token;
            var refreshToken = result.refresh_token;
            var usenum = result.user_seq_no;

            console.log(accessToken);
            console.log(refreshToken);
            console.log(usenum);

            res.redirect('/api');
        })
    // }


});


module.exports=router;