class ItemManager {



    constructor() {
        //this.itemList = [];
    }

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
                        return;
                    }
                }
                console.log("adding a new item");   
                let newItemData = {};
                newItemData.type = items[x].type;
                newItemData.group = items[x].group;
                newItemData.name = items[x].levels[itemData.level].name;
                newItemData.level = itemData.level;
                newItemData.quantity = itemData.quantity;
                newItemData.contents = items[x].levels[itemData.level].contents;
                itemList.push(new Item(newItemData));

                let nb = new Button({"item": itemList.slice(-1)[0] , "active": true, "drawButton": false, "x": 50, "y": 200 + ((itemList.length-1) * 35), "w": 100, "h": 30, "text": "", "screen": this, "action":  itemScreen.showItem});
                itemList.slice(-1)[0].button = nb

                if(screenManager.screen = itemScreen) { // add a new button for the new item
                    itemScreen.buttons.push(nb);
                }
            }
        }
        //{"type": 2, "level": 0, "group": "resources",  "name": "rssbox", "quantity": 5, "contents": [{"food": 1000}]},

    }

    removeItem() {
        
    }


}