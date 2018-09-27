const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('pusher-chatkit-server')

const app = express();

const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:dda8a9b5-5d23-4b7b-84ba-c2ce5bd5ffd8',
    key : 'adabb617-519a-4410-9c7b-9b386ec6cb24:tQRZBrOF5lInOIcF5hrs0QtbQzsJr4QdTIseie1sJhM='
})

app.user(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
    const { username } = req.body
    chatkit
        .createUser({
            id: username,
            name: username
        })
        .then(() => res.sendStatus(201))
        .catch(error => {
            if(error.error_type === 'services/chatkit/user_already_exists') {
                res.sendStatus(200) 
            } else {
                res.status(error.status).json(error)
            }
            })
        })

app.post('/authenticate', (req, res) => {
    const authData = chatkit.authenticate({ userId: req.query.user_id})
    res.status(authData.status).send(authData.body)
})

const PORT = 3000
app.listen(PORT, err=> {
    if(err) {
        console.error(err)
    } else {
        console.log(`Running on port ${Port}`)
    }
})