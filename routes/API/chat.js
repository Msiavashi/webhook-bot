var express = require('express');
var router = express.Router();
var chatController = require('../../controllers/chat');

const token = 'TestToken';  //verification token for webhook


router.get('/', function(req, res, next) {
    if (req.query.token !== token){
        return res.sendStatus(401);
    }
    chatController.pushMessage(req);
    chatController.initial(req, res, next);
});

router.post('/', function(req, res, next){
    if (req.query.token !== token) {
        return res.sendStatus(401);
    }
    chatController.pushMessage(req);
    chatController.handleResponse(req, res, next);
});

router.get('/messeges/', function(req, res, next){
   chatController.sendMesseges(req, res, next);
});

module.exports = router;
