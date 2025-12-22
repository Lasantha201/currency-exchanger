const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//all currencies
app.get('/getAllCurencies', async (req, res) => {

    const nameURL = `https://openexchangerates.org/api/currencies.json?app_id=02b6be1f928d4a48a23c3b338ab815ee`;

    
    try {

    const nameResponse = await axios.get(nameURL);
    const namesData = nameResponse.data;

    return res.json(namesData);

        
    } catch (err) {
        console.log(err);
    }

});


app.get("/convert", async(req, res) =>{
    
    const {date, sourceCurrency, targetCurrency, amountInSource} = req.query;

    try {
        const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=02b6be1f928d4a48a23c3b338ab815ee`
        const dataResponse = await axios.get(dataURL);
        const rates = dataResponse.data.rates;

        //rates
        const rateSource = rates[sourceCurrency];
        const rateTarget = rates[targetCurrency];

        //final target value
        const amountInTarget = (rateTarget / rateSource) * amountInSource;

        return res.json({amountInTarget: amountInTarget.toFixed(2)});


    } catch (err) {
        console.error(err);
    }
    
})


//listen on port 
app.listen(5000, () => {
    console.log('Server is running on port 5000');
})