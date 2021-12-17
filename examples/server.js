const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 8900
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var allowCors = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
  };
app.use(allowCors)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/user', (req, res) => {
    const data = {
        code: 200,
        data: {},
        message: '成功'
    }
    setTimeout(() => {
        res.send(data)
    }, 2000);
})

app.listen(port, () => {
    console.log('------------')
    console.log(`本地服务启动： http://localhost:${port}`)
    console.log('------------')
})
