var m = require('mithril');
var Chat = require('../Models/ChatModel');

const ChatComponent = {
    oninit : (vnode) => {
        this.messages = [];
        Chat.init();
    },
    view : (vnode) => {
        let view = [
             m("ul#messages", {
                 oncreate : (vn) => {
                     var socket = io();
                 }
             }, Chat.messages.map((msg) => {
                 return m('li', msg.message);
             })),
             m("form[action='']", m("input[autocomplete='off']", {
                 value : Chat.message,
                 onkeyup : (e) => {
                     Chat.message = e.target.value;
                 }
             }), m("button[type='button']", {
                 onclick : Chat.send
             }, "Send"))
        ];
        return view;
    }
};

module.exports = ChatComponent;