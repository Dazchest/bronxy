class Item {

    constructor(data) {
        for(let x=0; x<Object.keys(data).length; x++) {
            name = Object.keys(data)[x];// (data[x]).value;
            //console.log(data[name]);
            this[name] = data[name];
        }
    }


    useItem(quantity, itemButton) {
        console.log("using = " + itemButton.name);
        if(this.quantity > 0) {
            let group = this.group;
            this.quantity --;
            if(this.quantity == 0) {
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
                    }
                }
            }

            if(group == "resources") {
                this.useResourceItem();
            }
            if(group == "chest") {
                this.useChestItem();
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
    }

    useChestItem() {
        console.log("using " + this.group);
        console.log(this.contents.length);
        for(let x=0; x<this.contents.length; x++) {
            let itemData = this.contents[x];
            let type = itemData.type;
            let level = itemData.level;
            let quantity = itemData.quantity;
            console.log("using type " + type + " - Level " + level + " - qty " + quantity);
            itemManager.addItem(itemData);
        }

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
        ctx.fillStyle = '#448833';
        ctx.fillRect(x, y, 100, 30);
        ctx.fillStyle = '#442233';
        ctx.fillRect(x + 100, y, 40, 30);

        ctx.fillStyle = '#000000';
        ctx.font = "15px Georgia";
        ctx.fillText(this.name, x + 5, y + 20);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.quantity, x + 5 + 100, y +20);

    }
    
}