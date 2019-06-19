var messages = [];
var userName;



function initial(req, res, next){
    const data = {
        challenge: req.query.challenge,
        type: "text",
        elements: [], 
        text: "Hi, What is your name?"
    }
    pushMessage(data);
    return res.json(data);
}

function onNameReceived(req, res, next){
    console.log(req.body);
    let splited = req.body.text.split(" ");
    name = splited[splited.length - 1];
    const response = {
        type: "text",
        elements: ["yes", "no"], 
        text: "Thanks " + name + " would you know your next birthday?"
    }
    pushMessage(response);
    return res.json(response);
}

function onAccept(req, res, next){
    const response = {
        type: "text",
        elements: [],
        text: "please enter your birthday (YYYY-MM-DD)"
    }
    pushMessage(response);
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

function handleResponse(req, res, next){
    const data = req.body;
    if(data.text.startsWith("my name is")){
        onNameReceived(req, res, next);
    }else if(data.text.toLowerCase() == "yes" || data.text.toLowerCase() == "yep"){
        onAccept(req, res, next);
    }else if(data.text.toLowerCase() == "no" || data.text.toLowerCase() == "nah"){
        const repsonse = {
            type: "text",
            elements: [], 
            text: "GoodBye !!!"
        }
        pushMessage(response);
        return res.json();
    }else if (isValidDate(data.text)){
        getNextBirthday(req, res, next);
    }else{
        const response = {
            type: "text",
            elements: [],
            text: "sorry, i didn't understant"
        }
        pushMessage(response);
        res.json(response);
    }
}

function getNextBirthday(req, res, next) {
    var birthday = req.body.text.split("-");
    var today = new Date();
    var next = new Date(today.getFullYear(), parseInt(birthday[1])-1, parseInt(birthday[2]));
    today.setHours(0, 0, 0, 0);
    if(today > next) next.setFullYear(today.getFullYear()+1);
    const response = {
        type: "text",
        elements: [],
        text: "There are " + Math.round((next-today)/8.64e7).toString() + " days left until your next birthday"
    }
    pushMessage(response);
    return res.json(response);
}

function sendMessages(req, res, next){
    for (let [index, element] of messages.entries()){
        console.log(element);
        element.id = index;
    }
    return res.json(messages);
}

function pushMessage(data){
    return messages.push(data);
}

function deleteMessage(req, res, next){
    const id = req.params.id;
    if(id > 0 && id < messages.length){
        messages.splice(id, 1);
        return res.sendStatus(200);
    }
    return res.sendStatus(400);
}

function getMessageById(req, res, next){
    return res.json(messages[req.params.id]);
}

module.exports = {
    pushMessage: pushMessage,
    sendMessages: sendMessages,
    handleResponse: handleResponse,
    initial: initial

}