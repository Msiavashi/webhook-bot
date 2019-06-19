var express = require('express');
var router = express.Router();
var chatController = require('../../controllers/chat');

const token = 'TestToken';  //verification token for webhook


router.get('/', function(req, res, next) {
    if (req.query.token !== token){
        return res.sendStatus(401);
    }
    chatController.pushMessage(req.body);
    chatController.initial(req, res, next);
});

router.post('/', function(req, res, next){
    if (req.query.token !== token) {
        return res.sendStatus(401);
    }
    chatController.pushMessage(req.body);
    chatController.handleResponse(req, res, next);
});

router.get('/messages/', function(req, res, next){
   chatController.sendMessages(req, res, next);
});

router.delete('/message/:id', function(req, res, next){
    chatController.deleteMessage(req, res, next);
});

router.get('/message/:id', function(req, res, next){
    chatController.getMessageById(req, res, next);
});

module.exports = router;
