class Item {

    constructor(data) {
        for(let x=0; x<Object.keys(data).length; x++) {
            name = Object.keys(data)[x];// (data[x]).value;
            //console.log(data[name]);
            this[name] = data[name];
        }

        if(this.group == "chest") {
            this.method = "open";
        }

        this.w = 320;
        this.h = 50;

    }


    useItem(quantity, itemButton) {
        console.log("using = " + itemButton.name);
        if(this.quantity > 0) {
            let group = this.group;
            this.quantity --;
            if(this.quantity == 0) {    //all gone, remove from the list, and remove button
                for(let x=itemList.length-1; x>=0; x--) {
                    if(itemList[x] == this) {
                        console.log("found one to delete");
                        console.log("ready to delete " + x);
                        //return;
                        //let tb = itemList.bu
                        itemList.splice(x, 1);
                        for(let y=itemScreen.buttons.length-1; y>=0; y--){
                            if(itemScreen.buttons[y] == itemButton) {
                                console.log("FOUND A BUTTON TO DELTEEEEEEE");
                                itemScreen.buttons.splice(y, 1);
                            }
                        }
                        //todo: remove button as well
                        //TODO: button needs to be on the item???
                    }
                }
            }

            if(group == "resources") {
                this.useResourceItem();
            }
            if(this.method == "open") {
                this.useChestItem();
            }
            if(group == "speedup") {
                this.useSpeedItem();
            }
            // if zero quantity then need to then remove this item from the list if none left
        }
    }

    useResourceItem() {
        console.log("using " + this.group);
        for(let x=0; x<this.contents.length; x++) {
            let c = this.contents[x];
            let rss = Object.keys(c)[0];
            let amount = c[rss];
            console.log("using " + amount + " " + rss);
            resources[rss].amount += amount;
        }
        saveGame2();
    }

    useSpeedItem() {
        console.log("using " + this.name);
        for(let x=0; x<this.contents.length; x++) {
            let c = this.contents[x];
            let s = Object.keys(c)[0];
            let amount = c[s];
            console.log("speeding " + amount + " " + s);
            //resources[rss].amount += amount;
        }
        saveGame2();
    }

    useChestItem() {
        console.log("open chest");
        for(let x=0; x<this.contents.length; x++) {
            let itemData = this.contents[x];
            let type = itemData.type;
            let level = itemData.level;
            let quantity = itemData.quantity;
            console.log("using " + this.name + " - type " + type + " - Level " + level + " - qty " + quantity);
            itemManager.addItem(itemData);
        }
        saveGame2();
    }

    /**
     * Draw Item
     * @param {int} x 
     * @param {int} y 
     * @param {int} size 
     */
    draw(x, y, size) {
        this.x = x;
        this.y = y;
        let textOffsetY = Math.round(this.h / 2);

        ctx.drawImage(itemHolderImages[0], x, y, itemHolderImages[0].width, this.h);       //left
        ctx.drawImage(itemHolderImages[2], x + itemHolderImages[0].width, y, this.w, this.h);       //middle
        ctx.drawImage(itemHolderImages[1], x + this.w + itemHolderImages[0].width, y, itemHolderImages[1].width, this.h);       //right

        ctx.textBaseline = "middle";
        ctx.fillStyle = '#eeeeee';
        ctx.font = this.h/2 + "px Georgia";
        ctx.fillText(this.name, x + 10, y + textOffsetY);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.quantity, x + this.w, y + textOffsetY);
    }
    
}