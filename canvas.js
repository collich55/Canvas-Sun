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
    num_lines -= 1;
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