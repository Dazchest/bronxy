function convertMouseXYtoGridXY() {
    let x = Math.floor((mouse.x - camera.x)/ gridSize.x);
    let y = Math.floor((mouse.y - camera.y)/ gridSize.y);
    return {"x": x, "y": y};
}


function setButtonActive(buttons, type) {
    for(let x=0; x< buttons.length; x++) {
        if(buttons[x].type == type) {
            buttons[x].active = true;
        }
    }
}
function setButtonState(buttons, name, state) {
    if(Array.isArray(buttons)) {    // we have a list/array of buttons to check through
        for(let x=0; x< buttons.length; x++) {
            if(buttons[x].name == name) {
                buttons[x].active = state;
            }
        }
    } else {    // just 1 button to change
        //buttons[typeCheck].active = state;
    }
}

function getInput(e) {
    console.log(e.keyCode);
}
function checkInput() {
    //console.log("key = " + e.keyCode);
    if(document.getElementById('quantityInput').value < 0) {
        document.getElementById('quantityInput').value = 1;
    }
}