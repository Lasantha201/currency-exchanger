const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//all currencies
app.get('/getAllCurencies', async (req, res) => {

    const nameURL = `https://docs.openexchangerates.org/reference/currencies-json?app_id=02b6be1f928d4a48a23c3b338ab815ee`;

    
    try {

    const nameResponse = await axios.get(nameURL);
    const namesData = nameResponse.data;

    return res.json(namesData);

        
    } catch (err) {
        console.log(err);
    }

});

//listen on port 
app.listen(5000, () => {
    console.log('Server is running on port 5000');
})