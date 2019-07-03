class Item {

    constructor(data) {
        for(let x=0; x<Object.keys(data).length; x++) {
            name = Object.keys(data)[x];// (data[x]).value;
            //console.log(data[name]);
            this[name] = data[name];
        }

        this.dk = "ace";
    }


    useItem(quantity) {
        if(this.quantity > 0) {
            let group = this.group;
            this.quantity --;

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

    
}