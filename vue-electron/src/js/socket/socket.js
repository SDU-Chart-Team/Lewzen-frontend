import SimpleWebsocket from "@/js/simplewebsocket.min";
import {socketPush} from "@/js/socket/socketQueue";
import {updateCMD} from "@/js/action/actionQueue";
let socketVal={};
function SocketWrapper(init)
{
    this.socket = new SimpleWebsocket(init);
    this.messageHandlers = {};

    var that = this;
    this.socket.on('data', function(data)
    {
        //Extract the message type
        var messageData = JSON.parse(data);
        var messageType = messageData['__MESSAGE__'];
        delete messageData['__MESSAGE__'];

        //If any handlers have been registered for the message type, invoke them
        if (that.messageHandlers[messageType] !== undefined)
        {
            for (index in that.messageHandlers[messageType]) {
                that.messageHandlers[messageType][index](messageData);
            }
        }
    });
}

SocketWrapper.prototype.on = function(event, handler)
{
    //If a standard event was specified, forward the registration to the socket's event emitter
    if (['connect', 'close', 'data', 'error'].indexOf(event) != -1) {
        this.socket.on(event, handler);
    }
    else
    {
        //The event names a message type
        if (this.messageHandlers[event] === undefined) {
            this.messageHandlers[event] = [];
        }
        this.messageHandlers[event].push(handler);
    }
}

SocketWrapper.prototype.send = function(message, payload)
{
    //Copy the values from the payload object, if one was supplied
    var payloadCopy = {};
    if (payload !== undefined && payload !== null)
    {
        var keys = Object.keys(payload);
        for (var index in keys)
        {
            var key = keys[index];
            payloadCopy[key] = payload[key];
        }
    }

    payloadCopy['__MESSAGE__'] = message;
    this.socket.send(JSON.stringify(payloadCopy));
}

function log(text)
{
    console.log(text)
    // socketPush(text);
}


let socket;


export function initSocket(){
    socket=new SocketWrapper("ws://127.0.0.1:8000");

    socket.on('connect',function () {
        log("socket is connected!");
    });

    socket.on('data',function (data) {
        // log(JSON.parse(''+data)['id']);
        socketPush(JSON.parse(''+data));
    });

    socket.on('close',function () {
        log("socket is disconnected!");
    });

    socket.on('error',function (err) {
        log('Error: '+err);
    })
}

export function sendSocket(val){
    // console.log(val['cmd']);
    updateCMD(val['cmd'])
    socket.send("message",val);
}

