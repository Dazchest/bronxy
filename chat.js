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
        this.startWindowHeight = window.innerHeight;

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

        this.buttons.push(new Button({"active": true, "x": 450, "y": 575, "w": 100, "h": 50, "text": "Clear", "screen": this, "action":  this.clearDrawing.bind(this)}));
        this.buttons.push(new Button({"active": true, "x": 450, "y": 720, "w": 100, "h": 50, "text": "Send", "screen": this, "action":  this.send.bind(this)}));

        this.buttons.push(new Button({"active": true, "lineColor": '#ff0000', "x": 555, "y": 410, "w": 100, "h": 50, "text": "R", "screen": this, "action":  this.changeDrawingColor.bind(this)}));
        this.buttons.push(new Button({"active": true, "lineColor": '#00ff00', "x": 555, "y": 450, "w": 100, "h": 50, "text": "G", "screen": this, "action":  this.changeDrawingColor.bind(this)}));
        this.buttons.push(new Button({"active": true, "lineColor": '#0000ff', "x": 555, "y": 500, "w": 100, "h": 50, "text": "B", "screen": this, "action":  this.changeDrawingColor.bind(this)}));

        this.drawing = {};
        this.drawing.color = '#0000ff';
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 150;
        this.canvas.height = 150;
    }

    draw() {
        if(this.active) {
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#dddddd";
            ctx.fillRect(0, 0, canvas.width, window.outerHeight);

            ctx.fillStyle = '#000000';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, this.x, this.y + 20);

            // DRAW TH PANEL

            this.displayChat();
            this.drawButtons();
            this.checkButtons();

            if(this.chatInput.i === document.activeElement) {
                this.inputOffset = -(this.startWindowHeight - window.innerHeight + 50);
                this.lines = 12;
                camera.y = 0;
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
        ctx.fillText("start height = " + this.startWindowHeight, 350,150);
        ctx.fillText("height now = " + window.innerHeight, 350,200);

        ctx.save();
        ctx.rect(0, 125, 500, 580);
        ctx.clip();
        let offset = 0;
        // if(chat.messageList.length > this.lines) {
        //     offset = chat.messageList.length - this.lines;
        // }
        // for(let x=0; x<chat.messageList.length; x++) {
        //     let msg;
        //     try {
        //         msg = JSON.parse(chat.messageList[x]);
        //         ctx.fillText(msg.userid + ": " + msg.message, 100, 150 + ((x-offset)*25) + this.inputOffset + camera.y);
        //     } catch (err) {
        //         msg = chat.messageList[x];
        //         ctx.fillText(msg, 100, 150 + ((x-offset)*25) + this.inputOffset + camera.y);
        //     }
        // }
        if(chat.messageList.length > this.lines) {
            //offset = chat.messageList.length - this.lines;
        }
        if(camera.y <= 0) {
            camera.y = 0;
        }
        var counter = 0;
        for(let x=chat.messageList.length-1; x>=0; x--) {
            let msg;
            try {
                msg = JSON.parse(chat.messageList[x]);
                ctx.fillText(msg.userid + ": " + msg.message, 100, this.chatInput.y - (20) - counter*25 + camera.y);
            } catch (err) {
                msg = chat.messageList[x];
                ctx.fillText(msg, 100, this.chatInput.y - (20) - counter*25 + camera.y);
            }
            counter++;
        }
        ctx.restore();

        ctx.strokeStyle = '#000000';
        ctx.rect(400, 400, 150, 150);
        ctx.stroke();
        if(chatPen.active) {
            //console.log("drawing");
            this.ctx.fillStyle = this.drawing.color;
            this.ctx.fillRect(mouse.x-400, mouse.y-400, 5, 5);
            //this.drawing = this.ctx.getImageData(0,0,150,150);
        }
        //if(this.drawing) {
            //ctx.putImageData(this.drawing, 400, 400);
            ctx.drawImage(this.canvas, 400, 400);
        //}
    }
    changeDrawingColor(s,b) {
        this.drawing.color = b.lineColor;
    }

    clearDrawing() {
        this.ctx.clearRect(0,0,150,150);
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
