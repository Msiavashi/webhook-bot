var messages = [];
var userName;



exports.initial = (req, res, next) => {
    const data = {
        challenge: req.query.challenge,
        data: {
            type: "text",
            elements: [], 
            text: "Hi, What is your name?"
        }
    }
    return res.json(data);
}

function onNameReceived(req, res, next){
    let splited = req.body.answer.text.split(" ");
    name = splited[splited.length - 1];
    const response = {
        type: "text",
        elements: [], 
        text: "Thanks " + name + " would you know your next birthday?"
    }
    return res.json(response);
}

function onAccept(req, res, next){
    const response = {
        type: "text",
        elements: [],
        text: "please enter your birthday (YYYY-MM-DD)"
    }
    return res.json(response);
}

function isValidDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(regEx)) return false;  // Invalid format
  var d = new Date(dateString);
  var dNum = d.getTime();
  if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0,10) === dateString;
}

exports.handleResponse = (req, res, next) => {
    const data = req.body;
    if(data.text.startsWith("my name is")){
        onNameReceived(data);
    }else if(data.text.toLowerCase() == "yes" || data.text.toLowerCase() == "yep"){
        onAccept(req, res, next);
    }else if(data.text.toLowerCase() == "no" || data.text.toLowerCase() == "nah"){
        return res.json({
            type: "text",
            elements: [], 
            text: "GoodBye !!!"
        });
    }else if (isValidDate(data.text)){
        getNextBirthday(req, res, next);
    }else{
        res.json({
            type: "text",
            elements: [],
            text: "sorry, i didn't understant"
        })
    }
}

function getNextBirthday(req, res, next) {
    var birthday = req.body.text.split("-");
    var today = new Date();
    var next = new Date(today.getFullYear(), parseInt(birthday[1])-1, parseInt(birthday[2]));
    if(today>next) next.setFullYear(y+1);
    const repsonse = {
        type: "text",
        elements: [],
        text: Math.round((next-today)/8.64e7)
    }
    return res.json(response);
}

exports.sendMesseges = function(req, res, next){
    return res.json(messages);
}

exports.pushMessage = function(req){
    return messages.push(req.body);
}