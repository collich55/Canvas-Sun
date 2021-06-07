# Sun Canvas
When I was younger I was trying to imagine exactly how distance from the sun affected the concentration of light rays. I started drawing it in 2D on paper and came up with basically the pattern in this project, but didn't have the patience to draw hundreds of perfect straight lines to complete the image. Thought of this again randomly and realized I could translate it into html canvas. 

This project convinced me that html canvas is perhaps the most fun use of trigonometry possible, and should be introduced to every highschool curriculumn.

link: https://collich55.github.io/Canvas-Sun/

<img width="1440" alt="preview-photo" src="https://user-images.githubusercontent.com/62472030/118384815-35caa080-b5d7-11eb-9019-b24cc1a0248b.png">

Trigonometry Code Snippet:

The trickiest mathematics of this project was getting the sub lines radiating evenly and always perpendicular to the tangent of the sun circle. In the snippet below you can see that we calculate the radians of the main line, which is simple enough, but every subline both needs to be be relative to the start of the main line, and spaced appropiately from the other sublines.

``` javascript
let pos_x = window.innerWidth/2;
let pos_y = window.innerHeight/2;
let radius = radius_el.value;
let each_line_radian_difference = (2 * Math.PI) / num_lines_el.value;
let each_sub_line_radian_difference = ((2 * Math.PI) / num_sub_lines_el.value) / 2; // dividing the difference in sub line radians by 2

function animate() {
  while (i < num_lines) {
     line_radians = i * each_line_radian_difference;
     main_line_start_and_end = calcLineStartAndEnd(pos_x, pos_y, radius, line_radians);
     while (j <= num_dot_lines) {
        sub_line_radians = (j * (each_sub_line_radian_difference)) - (Math.PI/2) + line_radians; // !*sub line formula*!
        sub_line_start_and_end = calcLineStartAndEnd(pos_x, pos_y, radius, sub_line_radians);
        // draw sub line with sub_line_start_and_end
        j += 1
      }
     // draw main line with main_line_start_and_end
     i += 1
   }
}

function calcLineStartAndEnd(pos_x, pos_y, radius, radians) {
    let arc_x = (Math.sin(radians) * radius) + pos_x;
    let arc_y = (Math.cos(radians) * radius) + pos_y;
    let arc_x_end = (Math.sin(radians) * 10000) + pos_x;
    let arc_y_end = (Math.cos(radians) * 10000) + pos_y;

    return [arc_x, arc_y, arc_x_end, arc_y_end]
}
```

I achieved this by first dividing the difference in sub line radians by 2, ensuring that the lines will always be concentrated to only 180 degrees, or Pi radians. We now have the ray pattern we are looking for, the rays are 90 degrees off relative to the tangent of the sun circle.

<img width="1440" alt="Screen Shot 2021-05-17 at 1 43 44 PM" src="https://user-images.githubusercontent.com/62472030/118533623-49c8ec00-b716-11eb-8bc5-a25b786b4c93.png">

We can correct this by adding (Math.PI / 2). When we add another main line, however, it is oriented exactly the same as with the first main line, despite being on difference points of the circumference of the sun cirle.

<img width="1440" alt="Screen Shot 2021-05-17 at 1 52 49 PM" src="https://user-images.githubusercontent.com/62472030/118534427-3702e700-b717-11eb-8313-1d5068239f37.png">

We can correct his adding the main line radian value to every sub line radian value to ensure it is properly oriented relative to any main line position.

<img width="1440" alt="Screen Shot 2021-05-17 at 1 57 49 PM" src="https://user-images.githubusercontent.com/62472030/118534993-e8098180-b717-11eb-8a06-44f29dd58901.png">









 


