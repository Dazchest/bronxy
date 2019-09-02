class Chat {


    constructor() {
        var tempuserid;
        // Create WebSocket connection.
        if(location.hostname === "localhost") {
            socket = new WebSocket('ws://localhost:3000');
        } else {
            socket = new WebSocket('wss://bronxcraft.glitch.me');
        }
        
        socket.onopen = function (event) {
            tempuserid = Math.floor(Math.random() * 5000) + 2
            console.log("we are now conected to the websocket");
            // div.innerHTML += "<br>opened " + new Date().toLocaleString();
            // socket.send("Hey socket! " + new Date().toLocaleString());
        };

        // Connection opened
        socket.addEventListener('open', function (event) {
            //socket.send('Hello Server!');
        });
        
        // // Listen for messages
        socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
            try {
                //let parsedmsg = JSON.parse(event.data);
                chat.messageList.push(event.data);
                //document.getElementById('allchat').innerHTML += "<br>" + parsedmsg.userid + ": " + parsedmsg.message;
            } catch (err) {
                //let parsedmsg = event.data;
                //document.getElementById('allchat').innerHTML += "<br>" + parsedmsg;
            }
        });

        this.messageList = [];
        
    }

    sendMessage(msg) {
        // let message = {};
        // message.message = "hello"    //document.getElementById('message').value;
        // //document.getElementById('message').value = "";
        // message.userid = user.id;
        msg = JSON.stringify(msg);
        socket.send(msg);
    }
}


class ChatScreen extends ScreenView {

    constructor() {
        super();

        this.active = true;
        this.name = "Chat";

        camera.x = 0;
        camera.y = 0;
        this.lines = 22;
        this.inputOffset = 0;

        this.buttons = [];
        this.buttons.push(new Button({"style": "circle", radius: 50, "active": true, "x": 450, "y": 50, "w": 100, "h": 50, "text": "Exit", "screen": this, "action":  this.exitScreen}));

        let i = {};
        i.id = 'chatInput';
        i.name = 'chatInput[]';
        i.type = 'text';
        i.value = "";
        let iData = {x: 100, y: 720, w: 300, h: 50};
        this.chatInput = new NewInput(i, iData);
        this.chatInput.i.addEventListener('keypress', (function(e) {
            if(e.keyCode == 13) {
                this.send();
            }       
        }).bind(this));
        this.originalY = iData.y;

        this.buttons.push(new Button({"active": true, "x": 450, "y": 720, "w": 100, "h": 50, "text": "Send", "screen": this, "action":  this.send.bind(this)}));

    }

    draw() {
        if(this.active) {
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#dddddd";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#000000';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, this.x, this.y + 20);

            // DRAW TH PANEL

            this.displayChat();
            this.drawButtons();
            this.checkButtons();

            if(this.chatInput.i === document.activeElement) {
                this.inputOffset = -400;
                this.lines = 12;
                camera.y = 250;
            } else {
                this.inputOffset = 0;
                //camera.y = 0;
                this.lines = 22;
            }
            this.chatInput.y = this.originalY + this.inputOffset;
            this.chatInput.button.y = this.originalY + this.inputOffset;
            this.chatInput.draw();
            this.chatInput.button.check();

            // this.checkItemButtons();
            // Resource.drawAll();
        }
    }

    displayChat() {
        ctx.fillText("wahoooooo", 50,50);
        ctx.save();
        ctx.rect(0, 125, 500, 560);
        ctx.clip();
        let offset = 0;
        if(chat.messageList.length > this.lines) {
            offset = chat.messageList.length - this.lines;
        }
        for(let x=0; x<chat.messageList.length; x++) {
            let msg;
            try {
                msg = JSON.parse(chat.messageList[x]);
                ctx.fillText(msg.userid + ": " + msg.message, 100, 150 + ((x-offset)*25) + this.inputOffset + camera.y);
            } catch (err) {
                msg = chat.messageList[x];
                ctx.fillText(msg, 100, 150 + ((x-offset)*25) + this.inputOffset + camera.y);
            }
        }
        ctx.restore();
    }

    send() {
        console.log("preparing to send message");
        let msg = {};
        msg.userid = user.name;
        msg.message = this.chatInput.i.value;
        this.chatInput.i.value = "";
        camera.y = 0;
        chat.sendMessage(msg);
    }

}
