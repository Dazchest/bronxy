class ItemManager {



    constructor() {
        //this.itemList = [];
    }

    addItems(contents) {
        console.log("adding an item");
        //console.log(itemData);

        for(let c=0; c<contents.length; c++) {
            let newItem = true;
            for(let x=0; x<items.length; x++) {
                let oldItem, itemData = contents[c];
                //let oldItem;
                if(items[x].type == itemData.type) {    //check to make sure its a proper item
                    // need to check if alreay in itemsList, and just add quantity, else new item
                    for(let p=0; p<itemList.length; p++) {
                        if(itemList[p].type == itemData.type && itemList[p].level == itemData.level) {
                            newItem = false;
                            oldItem = p;
                        }
                    }
                    if(newItem == false) {
                        console.log("adding to an existing item");   
                        itemList[oldItem].quantity += itemData.quantity;
                        continue;   // goto the next item in contents
                    } else {
                        console.log("adding a new item");   
                        let newItemData = {};
                        newItemData = items[x];
                        newItemData.name = items[x].levels[itemData.level].name;
                        newItemData.contents = items[x].levels[itemData.level].contents;
                        newItemData.level = itemData.level;
                        newItemData.quantity = itemData.quantity;
                        itemList.push(new Item(newItemData));

                        let nb = new Button({"active": true, "drawButton": false, "x": 50, "y": 200 + ((itemList.length-1) * 35), "w": 100, "h": 30, "text": "",  "action":  itemScreen.showItem});
                        itemList.slice(-1)[0].button = nb;  // add button to last item added
                        continue;   // goto the next item in contents
                    }

                }
            }
        }

        saveList("itemList", false);
    }

    //-----------------------------------

    addItem(itemData) {
        console.log("adding an item");
        //console.log(itemData);

        for(let x=0; x<items.length; x++) {
            //console.log(items[x].type);
            //console.log(itemData.type);
            if(items[x].type == itemData.type) {    //check to make sure its a proper item
                // need to check if alreay in itemsList, and just add quantity, else new item
                for(let p=0; p<itemList.length; p++) {
                    if(itemList[p].type == itemData.type && itemList[p].level == itemData.level) {
                        itemList[p].quantity += itemData.quantity;
                        console.log("adding to an existing item");   
                        saveList("itemList", false);
                        return;
                    }
                }
                console.log("adding a new item");   
                let newItemData = {};
                newItemData = items[x];
                newItemData.name = items[x].levels[itemData.level].name;
                newItemData.contents = items[x].levels[itemData.level].contents;
                newItemData.level = itemData.level;
                newItemData.quantity = itemData.quantity;
                itemList.push(new Item(newItemData));

                // let nb = new Button({"item": itemList.slice(-1)[0] , "active": true, "drawButton": false, "x": 50, "y": 200 + ((itemList.length-1) * 35), "w": 100, "h": 30, "text": "",  "action":  itemScreen.showItem});
                // itemList.slice(-1)[0].button = nb

                // if(screenManager.screen = itemScreen) { // add a new button for the new item
                //     itemScreen.buttons.push(nb);
                // }

                let nb = new Button({"active": true, "drawButton": false, "x": 50, "y": 200 + ((itemList.length-1) * 35), "w": 100, "h": 30, "text": "",  "action":  itemScreen.showItem});
                itemList.slice(-1)[0].button = nb;  // add button to last item added

            }
        }
        //{"type": 2, "level": 0, "group": "resources",  "name": "rssbox", "quantity": 5, "contents": [{"food": 1000}]},

    }

    removeItem() {
        
    }

    getSpeeds() {
        let speedList = [];
        for(let x=0; x<itemList.length; x++) {
                if(itemList[x].type == 40) {
                    console.log("speed found");
                    speedList.push(itemList[x]);
                }
        }

        return speedList;
    }

    displaySpeeds(fromScreen) {

    }



}