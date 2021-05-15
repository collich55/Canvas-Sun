var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let pos_x = window.innerWidth/2;
let pos_y = window.innerHeight/2;
let radius = 50

let ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.arc(pos_x, pos_y, radius, 0, 2 * Math.PI);
ctx.stroke();

let num_lines = 10;

let total = 2 * Math.PI;

let each_line_degree = total/num_lines;

let start_line_x = 0;
let start_line_y = 0;
let end_line_x = 0;
let end_line_y = 0;



function calcXandY(pos_x, pos_y, radius, radians) {
    let arc_x = (Math.sin(radians) * radius) + pos_x;
    let arc_y = (Math.cos(radians) * radius) + pos_y;
    let arc_x_end = (Math.sin(radians) * 1000) + pos_x;
    let arc_y_end = (Math.cos(radians) * 1000) + pos_y;

    return [arc_x, arc_y, arc_x_end, arc_y_end]
}

function addLine() {
    num_lines += 1;
}

function subtractLine() {
    if (num_lines > 0) {
        num_lines -= 1;
    }
}




// ########

let item = document.querySelector(".add-line");

    let timerID;
    let counter = 0;

    let pressHoldEvent = new CustomEvent("pressHold");

    // Increase or decreae value to adjust how long
    // one should keep pressing down before the pressHold
    // event fires
    let pressHoldDuration = 50;

    // Listening for the mouse and touch events    
    item.addEventListener("mousedown", pressingDown, false);
    item.addEventListener("mouseup", notPressingDown, false);
    item.addEventListener("mouseleave", notPressingDown, false);

    item.addEventListener("touchstart", pressingDown, false);
    item.addEventListener("touchend", notPressingDown, false);

    // Listening for our custom pressHold event
    // item.addEventListener("pressHold", doSomething, false);

    function pressingDown(e) {
      // Start the timer
        requestAnimationFrame(timer);

        e.preventDefault();

        console.log("Pressing!");
    }

    function notPressingDown(e) {
      // Stop the timer
        cancelAnimationFrame(timerID);
        counter = 0;

        console.log("Not pressing!");
    }

    //
    // Runs at 60fps when you are pressing down
    //
    function timer() {
        console.log("Timer tick!");

        timerID = requestAnimationFrame(timer);
        counter++;
        if (counter > pressHoldDuration) {  
            num_lines++
        }
    }

    

    // function doSomething(e) {
    //   console.log("pressHold event fired!");
    //   num_lines++
    // }

// ########

// ########

let item2 = document.querySelector(".subtract-line");

let timerID2;
let counter2 = 0;

let pressHoldEvent2 = new CustomEvent("pressHold2");

// Increase or decreae value to adjust how long
// one should keep pressing down before the pressHold
// event fires
let pressHoldDuration2 = 50;

// Listening for the mouse and touch events    
item2.addEventListener("mousedown", pressingDown2, false);
item2.addEventListener("mouseup", notPressingDown2, false);
item2.addEventListener("mouseleave", notPressingDown2, false);

item2.addEventListener("touchstart", pressingDown2, false);
item2.addEventListener("touchend", notPressingDown2, false);

// Listening for our custom pressHold event
// item2.addEventListener("pressHold2", doSomething2, false);

function pressingDown2(e) {
    // Start the timer
    requestAnimationFrame(timer2);

    e.preventDefault();

    console.log("Pressing!");
}

function notPressingDown2(e) {
    // Stop the timer
    cancelAnimationFrame(timerID2);
    counter2 = 0;

    console.log("Not pressing!");
}

//
// Runs at 60fps when you are pressing down
//
function timer2() {
    console.log("Timer tick!");

    timerID2 = requestAnimationFrame(timer2);
    counter2++;
    if (counter2 > pressHoldDuration2 && num_lines > 0) {
        num_lines--
    }
}

let i = 0

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    // num_lines += 1;
    each_line_degree = total/num_lines;
    
    while (i < num_lines) {
        line_radians = i * each_line_degree;
        pos_info = calcXandY(pos_x, pos_y, radius, line_radians);
        start_line_x = pos_info[0];
        start_line_y = pos_info[1];
        end_line_x = pos_info[2];
        end_line_y = pos_info[3];
        ctx.beginPath();
        ctx.moveTo(start_line_x, start_line_y);
        ctx.lineTo(end_line_x, end_line_y);
        ctx.stroke();
        i += 1;
    }
    ctx.beginPath();
    ctx.arc(pos_x, pos_y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    i = 0
}

animate();