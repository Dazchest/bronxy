function easeInOutQuad(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};
aseOutQuad = function (t, b, c, d) {
	t /= d;
	return -c * t*(t-2) + b;
};
//b = camera.y
let l;
let t=0;
let start = -300;
let end = -500
let change = end - start;
for(let x=0; x<1000; x++) {
    l = aseOutQuad(t, -300, -200, 2);
    console.log(l);
    t += .1;
    if(t>=2) {
        break;
    }
}
console.log("change = ", change);

