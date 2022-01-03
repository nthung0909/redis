const express = require('express');
const axios = require('axios');
const PORT = 3002;
const withRedis = express();

withRedis.get('/', async (req, res) => {
    try {
        console.time('LOG_TIME');
        axios({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/todos/1',
        }).then(async response => {
            const {userId} = response.data;
            console.timeEnd('LOG_TIME');
            return res.json({userId});
        }).catch(async e => {
            console.log(e);
            return res.json({status: 500, message: 'error'});
        })
    } catch (e) {
        console.log(e);
    }
});

withRedis.listen(PORT, (req, res) => {
    console.log('App is runing at port ', PORT);
})