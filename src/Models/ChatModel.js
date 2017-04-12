var m = require('mithril');

var ChatModel = {
    socket : null,
    messages : [],
    message : '',
    init : (vn) => {
        if(ChatModel.socket !== null) return;
        ChatModel.socket = io();

        ChatModel.socket.on('chat message', function(msg){
            console.log("Aniya");
            ChatModel.push(msg, "chat");
            m.redraw();
        });
    },
    push : (msg, type) => {
        ChatModel.messages.push({
            message : msg,
            type : type
        });
    },
    send : (e) => {
        ChatModel.socket.emit('chat message', ChatModel.message);
        ChatModel.push(ChatModel.message, "mine");
        ChatModel.message = '';
    }
};

module.exports = ChatModel;