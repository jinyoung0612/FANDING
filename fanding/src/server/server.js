const express =require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const router = express.Router();

app.use(cors({
    origin:true,
    credentials:true
}));
app.use(bodyParser.urlencoded({limit: 5000000, extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: 5000000}));
app.use('/',require('./routes/index'));





app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})

