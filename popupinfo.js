var popups = [];
class Popupinfo {


    
    draw() {
        ctx.strokeStyle = '#000000';
        ctx.rect(10,10,10,10);
    }
}


function popup(t, x, y) {
    ctx.strokeStyle = '#';
    ctx.rect(10,10,10,10);

    ctx.fillStyle = '#ffffff';
    ctx.font = "20px Georgia";
    ctx.fillText(t, x, y);

}