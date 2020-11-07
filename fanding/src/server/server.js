const express =require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
app.use(cors({
    origin:true,
    credentials:true
}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('/',require('./routes/index'));





app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})