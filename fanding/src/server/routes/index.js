const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/api', (req,res)=> res.json({username:"jinyoung2"}));

// router.get('/api/verification', function(req,res){
//     console.log('authorize')
//     const url = "https://testapi.openbanking.or.kr/oauth/2.0/token";
//     const params = {
//         response_type: 'code',
//         client_id: config.client_id,
//         redirect_uri: 'http://localhost:3000/account_auth',
//         scope: 'login inquiry transfer',
//         state: '202002CAPSTONEPROJECTTEAM002A2B2',
//         auth_type: '0',
//     }
//     axios.get(url, params)
//         .then((res)=>res.json(res))
//     res.json(req.params);
// })

router.get('/api/authResult', function(req,res){
    console.log('authResult');
    console.log(req.query);
    var authCode=req.query.code;

    if(authCode==null){
        console.log("사용자 인증 코드 요청 없음");
        // res.send("null")
    }
    else{
        console.log(authCode);
        res.send(authCode);
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
            console.log(body)

            var result= JSON.parse(body);
            var accessToken = result.access_token;
            var refreshToken = result.refresh_token;
            var usenum = result.user_seq_no;

            console.log(accessToken);
            console.log(refreshToken);
            console.log(usenum);

            res.json(result);
        })
    }


});


module.exports=router;