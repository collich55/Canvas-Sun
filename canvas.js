var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let pos_x = window.innerWidth/2;
let pos_y = window.innerHeight/2;

let ctx = canvas.getContext('2d');

canvas = document.querySelector('canvas');
let num_lines_el = document.querySelector('.num-lines');
let num_dot_lines_el = document.querySelector('.num-dot-lines');
let radius_el = document.querySelector('.radius');
buttons = document.querySelector('.buttons');
circle_color_el = document.querySelector('.circle-color');
circle_line_color_el = document.querySelector('.circle-line-color');
line_color_el = document.querySelector('.line-color');
dot_line_color_el = document.querySelector('.dot-line-color');
background_color_el = document.querySelector('.background-color');
let not_changed = true;

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

document.addEventListener("keypress", function (event) {
    if (event.key == 'r') {
        randomizeParams();
    }
})


document.addEventListener("keypress", function (event) {
    if (event.key == 'a') {
        // if (a_key_down) {
        new_params = returnRandomizeParams();
        startGraduallyChangeParams(60);
        // }
    }
})


radius_el.value = 40
num_lines_el.value = 1;
num_dot_lines_el.value = 6;
circle_color = circle_color_el.value
circle_line_color = circle_line_color_el.value
line_color = line_color_el.value
dot_line_color = dot_line_color_el.value
background_color = background_color_el.value
var randomColor = Math.floor(Math.random() * 16777215).toString(16);

// let radius = radius_el.value;
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

let temp_idx = 0;

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

function randomizeParams() {
    
    radius_el.value = Math.floor(Math.random() * 50) + 2;
    num_lines_el.value = Math.floor(Math.random() * 100) + 3;
    num_dot_lines_el.value = Math.floor(Math.random() * 50) + 2;

    randomColor = Math.floor(Math.random() * 16777215).toString(16);
    randomColor = '#' + randomColor;
    circle_color_el.value = randomColor;
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
    randomColor = '#' + randomColor;
    circle_line_color_el.value = randomColor;
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
    randomColor = '#' + randomColor;
    line_color_el.value = randomColor;
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
    randomColor = '#' + randomColor;
    dot_line_color_el.value = randomColor;
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
    randomColor = '#' + randomColor;
    background_color_el.value = randomColor;
}

function returnRandomizeParams() {

    new_radius = Math.floor(Math.random() * 50) + 2;
    new_num_lines = Math.floor(Math.random() * 100) + 3;
    new_num_dot_lines = Math.floor(Math.random() * 50) + 2;

    randomColor = Math.floor(Math.random() * 16777215).toString(16);
    randomColor = '#' + randomColor;
    new_circle_color = randomColor;
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
    randomColor = '#' + randomColor;
    new_circle_line_color = randomColor;
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
    randomColor = '#' + randomColor;
    new_line_color = randomColor;
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
    randomColor = '#' + randomColor;
    new_dot_line_color = randomColor;
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
    randomColor = '#' + randomColor;
    new_background_color = randomColor;
    return [new_radius, new_num_lines, new_num_dot_lines, new_circle_color, new_circle_line_color, new_line_color, new_dot_line_color, new_background_color]
}

let new_params = returnRandomizeParams();

var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;


// initialize the timer variables and start the animation

function startGraduallyChangeParams(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    graduallyChangeParams();
}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

let dif = 0

function graduallyChangeParams() {
    myReq = requestAnimationFrame(graduallyChangeParams);

    

    now = Date.now();
    elapsed = now - then;
    

    // new_params = returnRandomizeParams();

    if (
        radius_el.value != new_params[0] ||
        num_lines_el.value != new_params[1] ||
        num_dot_lines_el.value != new_params[2]
        // circle_color_el.value !== new_params[3]

        ) {
        myReq = requestAnimationFrame(graduallyChangeParams);
    } else {
        cancelAnimationFrame(myReq);
        // ("reached good");
        // new_params = returnRandomizeParams();
    }

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        

        if (radius_el.value > new_params[0]) {
            dif = radius_el.value - new_params[2]
            if (dif >= 4) {
                radius_el.value -= Math.floor(dif / 2);
            } else {
                radius_el.value -= 1;
            }
        } else if (radius_el.value == new_params[0]) {
            // ("radius done")
        } else {
            dif = new_params[0] - radius_el.value;
            if (dif >= 4) {
                radius_el.value++;
                radius_el.value++;
                radius_el.value++;
                radius_el.value++;
            } else {
                radius_el.value++;
            }
        }

        if (num_lines_el.value > new_params[1]) {
            dif = num_lines_el.value - new_params[1]
            if (dif >= 4) {
                num_lines_el.value -= Math.floor(dif / 2);
            } else {
                num_lines_el.value -= 1;
            }
        } else if (num_lines_el.value == new_params[1]) {
            console.log("main lines done")
        } else {
            dif = new_params[1] - num_lines_el.value;
            if (dif >= 4) {
                num_lines_el.value++;
                num_lines_el.value++;
                num_lines_el.value++;
                num_lines_el.value++;
            } else {
                num_lines_el.value++;
            }
        }

    
        if (num_dot_lines_el.value > new_params[2]) {
            dif = num_dot_lines_el.value - new_params[2]
            if (dif >= 4) {
                num_dot_lines_el.value -= Math.floor(dif / 2);
            } else {
                num_dot_lines_el.value -= 1;
            }
        } else if (num_dot_lines_el.value == new_params[2]) {
            // ("sub lines done")
        }
        else {
            dif = new_params[2] - num_dot_lines_el.value;
            if (dif >= 4) {
                num_dot_lines_el.value++;
                num_dot_lines_el.value++;
                num_dot_lines_el.value++;
                num_dot_lines_el.value++;
            } else {
                num_dot_lines_el.value++;
            }
        }

        // if (circle_color_el.value !== new_params[3]) {

        //     circle_color_num = circle_color_el.value.slice(1)
        //     new_circle_color_num = new_params[3].slice(1)

        //     circle_color_num = parseInt(circle_color_num, 16);
        //     new_circle_color_num = parseInt(new_circle_color_num, 16);

        //     console.log([
        //         circle_color_el.value,
        //         new_params[3],
        //         circle_color_num,
        //         new_circle_color_num
        //     ])

        //     if (circle_color_num < new_circle_color_num) {
        //         circle_color_num++;
        //         circle_color_num = circle_color_num.toString(16);
        //         circle_color_num = '#' + circle_color_num;
        //         circle_color_el.value = circle_color_num;
                
        //     }
            
        //     if (circle_color_num > new_circle_color_num) {
        //         dif = new_circle_color_num - circle_color_num;
        //         circle_color_num -= 1;
        //         circle_color_num = circle_color_num.toString(16);
        //         circle_color_num = '#' + circle_color_num;
        //         circle_color_el.value = circle_color_num;

        //     }
        // }

       
        // unfinished color code
        if (circle_color_el.value !== new_params[3] && circle_color_el.value.length == new_params[3].length) {

            temp_idx = 0

            not_changed = true;


            while (not_changed && temp_idx < circle_color_el.value.length) {
                if (circle_color_el.value[temp_idx] !== new_params[3][temp_idx]){
                    circle_color_el.value = setCharAt(circle_color_el.value, temp_idx, new_params[3][temp_idx]);
                    not_changed = false;
                }
                temp_idx++
            }
        }
        if (circle_line_color_el.value !== new_params[4] && circle_line_color_el.value.length == new_params[4].length) {

            temp_idx = 0

            not_changed = true;


            while (not_changed && temp_idx < circle_line_color_el.value.length) {
                if (circle_line_color_el.value[temp_idx] !== new_params[4][temp_idx]) {
                    circle_line_color_el.value = setCharAt(circle_line_color_el.value, temp_idx, new_params[4][temp_idx]);
                    not_changed = false;
                }
                temp_idx++
            }
        }
        if (line_color_el.value !== new_params[5] && line_color_el.value.length == new_params[5].length) {

            temp_idx = 0

            console.log(line_color_el.value);
            console.log(new_params[5]);
            not_changed = true;


            while (not_changed && temp_idx < line_color_el.value.length) {
                if (line_color_el.value[temp_idx] !== new_params[5][temp_idx]) {
                    line_color_el.value = setCharAt(line_color_el.value, temp_idx, new_params[5][temp_idx]);
                    not_changed = false;
                }
                temp_idx++
            }
        }
        if (dot_line_color_el.value !== new_params[6] && dot_line_color_el.value.length == new_params[6].length) {

            temp_idx = 0

            console.log(dot_line_color_el.value);
            console.log(new_params[6]);
            not_changed = true;


            while (not_changed && temp_idx < dot_line_color_el.value.length) {
                if (dot_line_color_el.value[temp_idx] !== new_params[6][temp_idx]) {
                    dot_line_color_el.value = setCharAt(dot_line_color_el.value, temp_idx, new_params[6][temp_idx]);
                    not_changed = false;
                }
                temp_idx++
            }
        }
        if (background_color_el.value !== new_params[7] && background_color_el.value.length == new_params[7].length) {

            temp_idx = 0

            console.log(background_color_el.value);
            console.log(new_params[7]);
            not_changed = true;


            while (not_changed && temp_idx < background_color_el.value.length) {
                if (background_color_el.value[temp_idx] !== new_params[7][temp_idx]) {
                    background_color_el.value = setCharAt(background_color_el.value, temp_idx, new_params[7][temp_idx]);
                    not_changed = false;
                }
                temp_idx++
            }
        }
            

    //         hex = '0123456789abcdef'

    //         // circle_color_string = circle_color_el.value.slice(1)
    //         // new_circle_color_string = new_params[3].slice(1)

    //         // circle_color_num = parseInt(circle_color_num,16);
    //         // new_circle_color_num = parseInt(new_circle_color_num, 16);

    //         // ([
    //         //     circle_color_el.value,
    //         //     new_params[3],
    //         //     circle_color_num,
    //         //     new_circle_color_num
    //         // ])

    //         for (i = 1; i < 7; i++) {

    //             cur_idx = hex.indexOf(circle_color_el.value[i])
    //             new_idx = hex.indexOf(new_params[3][i])

    //             if (cur_idx < new_idx ){
    //                 setCharAt(circle_color_el.value, cur, chr)
    //             } else if (hex.indexOf(circle_color_el.value[i]) < hex.indexOf(new_params[3][i]))
    //         }
            
    //         if (circle_color_num < new_circle_color_num) {
    //             circle_color_num++;
    //             circle_color_num = circle_color_num.toString(16);
    //             circle_color_num = '#' + circle_color_num;
    //             circle_color_el.value = circle_color_num;

    //         }

    //         if (circle_color_num > new_circle_color_num) {
    //             circle_color_num -= 1;
    //             circle_color_num = circle_color_num.toString(16);
    //             circle_color_num = '#' + circle_color_num;
    //             circle_color_el.value = circle_color_num;

    //         }
       


    } else {
        cancelAnimationFrame(myReq);
      
        
        // new_params = returnRandomizeParams();
    }

    



    // if (
    //     radius_el.value != new_params[0] ||
    //     num_lines_el.value != new_params[1] ||
    //     num_dot_lines_el.value != new_params[2]
    //     // circle_color_el.value !== new_params[3]

    // ) {
    //     new_params = returnRandomizeParams();
    // }
}

// function animate() {

//     // request another frame

//     requestAnimationFrame(animate);

//     // calc elapsed time since last loop

//     now = Date.now();
//     elapsed = now - then;

//     // if enough time has elapsed, draw the next frame

//     if (elapsed > fpsInterval) {

//         // Get ready for next frame by setting then=now, but also adjust for your
//         // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
//         then = now - (elapsed % fpsInterval);

//         // Put your drawing code here

//     }
// }

function drawLine() {
    ctx.beginPath();
    ctx.moveTo(start_line_x, start_line_y);
    ctx.lineTo(end_line_x, end_line_y);
    ctx.stroke();
}

function drawCircle() {
    ctx.strokeStyle = circle_line_color;
    ctx.fillStyle = circle_color;
    ctx.beginPath();
    ctx.arc(pos_x, pos_y, radius_el.value, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}


let i = 0;
let j = 0;
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    background_color = background_color_el.value
    ctx.fillStyle = background_color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    num_lines = num_lines_el.value;
    num_dot_lines = num_dot_lines_el.value;
    // radius = radius_el.value;
    circle_color = circle_color_el.value
    circle_line_color = circle_line_color_el.value
    line_color = line_color_el.value
    dot_line_color = dot_line_color_el.value
    

    each_line_degree = total/num_lines;
    each_dot_line_degree = (dot_total / num_dot_lines)/2;

    
    while (i < num_lines) {
        line_radians = i * each_line_degree;
        pos_info = calcXandYLite(pos_x, pos_y, radius_el.value, line_radians);
        start_line_x = pos_info[0];
        start_line_y = pos_info[1];
    
        while (j <= num_dot_lines) {
            line_dot_radians = (j * (each_dot_line_degree)) + line_radians - (Math.PI/2);
            dot_pos_info = calcDotXandY(start_line_x, start_line_y, radius_el.value, line_dot_radians);
            end_line_x = dot_pos_info[2];
            end_line_y = dot_pos_info[3];
            ctx.strokeStyle = dot_line_color;
            if (line_radians != line_dot_radians) {
                drawLine();
            }
            j += 1;
        }
        j = 0;
        i += 1;
    }
    i = 0;
    while (i < num_lines) {
        line_radians = i * each_line_degree;
        pos_info = calcXandY(pos_x, pos_y, radius_el.value, line_radians);
        start_line_x = pos_info[0];
        start_line_y = pos_info[1];
        end_line_x = pos_info[2];
        end_line_y = pos_info[3];
        ctx.strokeStyle = line_color;
        drawLine();
        i += 1;
    }
    drawCircle();
    i = 0
}

animate();