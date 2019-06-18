var express = require('express');
var router = express.Router();
var chatController = require('../../controllers/chat');

const token = 'TestToken';  //verification token for webhook
var userAnswers = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (req.query.token !== token){
        return res.sendStatus(401);
    }
    const data = {
        challenge: req.query.challenge,
        data: {
            type: "text",
            elements: {},
            text: "Hi, What is your name?"
        }
    }
    return res.json(data);
});

router.post('/', function(req, res, next){
     if (req.query.token !== token) {
        return res.sendStatus(401);
    }
 
    console.log(req.body);

    const data = [
        {
            type: 'text',
            elements: [
                "hi",
                "hello"
            ]
        }
    ];
    res.json(data);
});

module.exports = router;
