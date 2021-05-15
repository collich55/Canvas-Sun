var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let pos_x = window.innerWidth/2;
let pos_y = window.innerHeight/2;

let ctx = canvas.getContext('2d');

canvas = document.querySelector('canvas');
num_lines_el = document.querySelector('.num-lines');
num_dot_lines_el = document.querySelector('.num-dot-lines');
radius_el = document.querySelector('.radius');
buttons = document.querySelector('.buttons');
circle_color_el = document.querySelector('.circle-color');
circle_line_color_el = document.querySelector('.circle-line-color');
line_color_el = document.querySelector('.line-color');
dot_line_color_el = document.querySelector('.dot-line-color');

buttons_opacity = true;

document.addEventListener("keypress", function (event) {
    if (event.key == 'h') {
        if (buttons_opacity) {
            buttons.style = "opacity: 0;"
            buttons_opacity = false;
        } else {
            buttons.style = "opacity: 1;"
            buttons_opacity = true;
        }
    }
})

radius_el.value = 40
num_lines_el.value = 3;
num_dot_lines_el.value = 6;
circle_color = circle_color_el.value
circle_line_color = circle_line_color_el.value
line_color = line_color_el.value
dot_line_color = dot_line_color_el.value

let radius = radius_el.value;
let num_lines = num_lines_el.value;
let num_dot_lines = num_dot_lines_el.value;

let total = 2 * Math.PI;
let dot_total = 2 *Math.PI;

let each_line_degree = total/num_lines;
let each_dot_line_degree = dot_total / num_dot_lines;

let start_line_x = 0;
let start_line_y = 0;
let end_line_x = 0;
let end_line_y = 0;

function calcXandY(pos_x, pos_y, radius, radians) {
    let arc_x = (Math.sin(radians) * radius) + pos_x;
    let arc_y = (Math.cos(radians) * radius) + pos_y;
    let arc_x_end = (Math.sin(radians) * 10000) + pos_x;
    let arc_y_end = (Math.cos(radians) * 10000) + pos_y;

    return [arc_x, arc_y, arc_x_end, arc_y_end]
}

function calcXandYLite(pos_x, pos_y, radius, radians) {
    let arc_x = (Math.sin(radians) * radius) + pos_x;
    let arc_y = (Math.cos(radians) * radius) + pos_y;

    return [arc_x, arc_y]
}

function calcDotXandY(pos_x, pos_y, radius, radians) {
    let arc_x = (Math.sin(radians) * radius) + pos_x;
    let arc_y = (Math.cos(radians) * radius) + pos_y;
    let arc_x_end = (Math.sin(radians) * 10000) + pos_x;
    let arc_y_end = (Math.cos(radians) * 10000) + pos_y;

    return [arc_x, arc_y, arc_x_end, arc_y_end]
}


let i = 0;
let j = 0;
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    // num_lines += 1;
    num_lines = num_lines_el.value;
    num_dot_lines = num_dot_lines_el.value;
    radius = radius_el.value;
    circle_color = circle_color_el.value
    circle_line_color = circle_line_color_el.value
    line_color = line_color_el.value
    dot_line_color = dot_line_color_el.value

    each_line_degree = total/num_lines;
    each_dot_line_degree = (dot_total / num_dot_lines)/2;

    
    while (i < num_lines) {
        line_radians = i * each_line_degree;
        pos_info = calcXandYLite(pos_x, pos_y, radius, line_radians);
        start_line_x = pos_info[0];
        start_line_y = pos_info[1];
    
        while (j <= num_dot_lines) {
            line_dot_radians = (j * (each_dot_line_degree)) + line_radians - (Math.PI/2);
            dot_pos_info = calcDotXandY(start_line_x, start_line_y, radius, line_dot_radians);
            end_line_x = dot_pos_info[2];
            end_line_y = dot_pos_info[3];
            ctx.strokeStyle = dot_line_color;
            if (line_radians != line_dot_radians) {
                ctx.beginPath();
                ctx.moveTo(start_line_x, start_line_y);
                ctx.lineTo(end_line_x, end_line_y);
                ctx.stroke();
            }
            j += 1;
        }
        j = 0;
        i += 1;
    }
    i = 0;
    while (i < num_lines) {
        line_radians = i * each_line_degree;
        pos_info = calcXandY(pos_x, pos_y, radius, line_radians);
        start_line_x = pos_info[0];
        start_line_y = pos_info[1];
        end_line_x = pos_info[2];
        end_line_y = pos_info[3];
        ctx.strokeStyle = line_color;
        ctx.beginPath();
        ctx.moveTo(start_line_x, start_line_y);
        ctx.lineTo(end_line_x, end_line_y);
        ctx.stroke();  
        i += 1;
    }
    ctx.strokeStyle = circle_line_color;
    ctx.fillStyle = circle_color;
    ctx.beginPath();
    ctx.arc(pos_x, pos_y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    i = 0
}

animate();