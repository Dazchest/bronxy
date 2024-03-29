class AllianceScreen extends ScreenView {

    constructor() {
        super();
        
        this.buttons = [];
        this.name = "Alliance";
        this.create = false;
        this.join = false;
        this.allianceName = "";

        console.log("this is Alliance Screen constructor"); 
        this.buttons.push(new Button({"active": true, "style": "circle", "radius": 50, "x": 550, "y": 100, "w": 100, "h": 30, "text": "Exit", "screen": this, "action":  this.exitScreen}));
        
        this.buttons.push(new Button({"active": true, drawButton: false, "x": 100, "y": 200, "w": 100, "h": 30, "text": "Create New Alliance", "screen": this, "action":  this.showCreateAlliance.bind(this)}));
        this.buttons.push(new Button({"active": true, drawButton: false, "x": 100, "y": 250, "w": 100, "h": 30, "text": "Join an Alliance", "screen": this, "action":  this.showJoinAlliance.bind(this)}));
        this.buttons.push(new Button({"active": true, drawButton: true, "x": 100, "y": 600, "w": 100, "h": 30, "text": "Leave Alliance", "screen": this, "action":  this.leaveAlliance.bind(this)}));

        this.createButton = new Button({"active": false, drawButton: true, "x": 260, "y": 400, "w": 100, "h": 30, "text": "Create Alliance", "screen": this, "action":  this.createAlliance.bind(this)});

        this.joinButtons = [];
        //this.listBox = new ListBox(100, 150, 400, 400, true, false);

        let i = {};
        i.id = 'allianceNameInput';
        i.name = 'allianceNameInput[]';
        i.type = 'text';
        i.value = "";
        let iData = {x: 200, y: 375};
        this.allianceNameInput = new NewInput(i, iData);


        // load the games alliance list
        firebase.database().ref("allianceList").once('value', function(data) {
            let al = data.val();
            console.log(data.val());
            console.log(al["hello"]);
            console.log(Object.keys(al).length);
            allianceList = [];

            // for(var key of Object.keys(al)) {
            //     console.log(key);
            //     allianceList.push(Object.keys(al)[key]);
            // }
            // for(let x=0; x<Object.keys(al).length; x++) {
            //     console.log("getting here???", al[x]);
            //     allianceList.push(al[x]);
            // }
            for(let x=0; x<Object.keys(al).length; x++) {
                name = Object.keys(al)[x];
                console.log(al[name]);
                let name2 = {};
                name2[name] = al[name];    
                let a = new Alliance(al[name]);  
                allianceList.push(a);
            }
            console.log(allianceList);
            });
        //----------------

        if(alliance) {  // are we in an alliance
            alliance.members = [];
            firebase.database().ref("users/" + user.id.toString() + "/alliance" ).once('value', function(allydata) {
                if(allydata.val()) {        // check we have an alliance to look through
                    let allianceID = allydata.val().id
                    //firebase.database().ref("allianceList/" + allianceID.toString() + "/members").once('value', function(data) {
                    firebase.database().ref("allianceList/" + allianceID.toString()).once('value', function(data) {
                        //alliance.name = data.val().name;
                        let al = data.val().members;
                        for(let x=0; x<Object.keys(al).length; x++) {
                            name = Object.keys(al)[x];
                            //let m = al[x];
                            console.log("getting memebers ");
                            console.log(al[name]);
                            console.log(name);
                            alliance.members.push(al[name]);
                        }
                    });
                }
            })
        }
        
        cities[currentCity].active = false;
        cityScreen.active = false;
        buildingHandler.highlightGrid = false;
        
    }

    draw() {
        if(this.active) {
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#ffbbdd";
            ctx.fillRect(this.x, this.y, canvas.width, canvas.height);

            ctx.fillStyle = '#000000';
            ctx.font = "20px Georgia";
            if(alliance) {
            ctx.fillText(this.name + " - " + alliance.name, 20, 130);
            } else {
                ctx.fillText(this.name, 20, 130);
            }
    
            this.drawButtons();
            this.checkButtons();

            if(alliance) {
                this.showAllianceMembers();
            } else {
                this.showAllianceOptions();
                if(this.create) {
                    this.showCreateAlliance();
                }
                if(this.join) {
                    this.showJoinAlliance();
                }
            }
        }
    }

    showAllianceMembers() {
        ctx.fillText("MEMBERS", 100, 200);
        for(let x=0; x<alliance.members.length; x++) {
            ctx.fillText(alliance.members[x].name, 100, 250 + (x*35));
        }   
    }

    showAllianceOptions() {
        this.buttons[1].drawButton = true;
        this.buttons[2].drawButton = true;

    }

    showCreateAlliance() {
        this.create = true;
        ctx.fillText("Please enter your new Alliance name:", 100, 350);
        this.allianceNameInput.x = 100;
        this.allianceNameInput.y = 400;
        this.allianceNameInput.button.x = 100;
        this.allianceNameInput.button.y = 400;
        this.allianceNameInput.draw();
        this.allianceNameInput.button.check();
        this.allianceName = this.allianceNameInput.i.value;
        if(this.allianceName) {
            this.createButton.active = true;
            this.createButton.draw();
            this.createButton.check();
        } else {
            this.createButton.active = false;
        }

    }

    showJoinAlliance() {
        this.join = true;
        this.joinButtons = [];
        for(let x=0; x<allianceList.length; x++) {
            ctx.fillText(allianceList[x].name, 100, 400 + (x * 35));
            this.joinButtons.push(new Button({"active": true, allianceID: allianceList[x].id, drawButton: true, "x": 250, "y": 400 + (x * 35), "w": 100, "h": 30, "text": "Join", "screen": this, "action":  this.joinAlliance.bind(this)}));


            this.joinButtons[x].draw();
            this.joinButtons[x].check();
        }


    }
    joinAlliance(self, b) {
        console.log(self);
        console.log(b);
        console.log("trying to join " + b.allianceID);

        console.log("updating user with alliance data", b.allianceID);
        firebase.database().ref("allianceList/" + b.allianceID.toString()).once('value', function(data) {
            alliance = new Alliance(data.val());
            alliance.members = null;
            firebase.database().ref("users" + "/" + user.id.toString() + "/alliance").set(alliance);
            firebase.database().ref("allianceList/" + b.allianceID.toString() + "/members/" + user.id.toString()).update(user);
        });

        this.exitScreen(this);
    }

    createAlliance() {
        if(this.allianceName) {
            let newAlliance = {};
            newAlliance.id = Date.now();
            newAlliance.name = this.allianceName;
            
            //newAlliance.members = [{id: user.id, name: user.name}]; 
            alliance = new Alliance(newAlliance);

            console.log("adding alliance with id ", alliance.id);
            firebase.database().ref("allianceList" + "/" + alliance.id.toString()).set(alliance);
            firebase.database().ref("allianceList" + "/" + alliance.id.toString() + "/members/" + user.id.toString()).set(user);

            console.log("updating user with alliance id ", alliance.id);
            firebase.database().ref("users" + "/" + user.id.toString() + "/alliance").set(alliance);
            //firebase.database().ref("users" + "/" + user.id.toString() + "/alliance/members/" + user.id.toString()).set(alliance.members);

            this.exitScreen(this);
        }
    }

    leaveAlliance() {
        console.log("leaving alliance");
        firebase.database().ref("users" + "/" + user.id.toString() + "/alliance").remove();
        firebase.database().ref("allianceList" + "/" + alliance.id.toString() + "/members/" + user.id.toString()).remove();
        alliance = null;
        this.exitScreen(this);
    }


}


class Alliance {

    constructor(data) {            
        for(let x=0; x<Object.keys(data).length; x++) {
            name = Object.keys(data)[x];
            this[name] = data[name];    
        }
    }

    save() {
        //firebase.database().ref("allianceList").set(allianceList);
    }
}

