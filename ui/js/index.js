const transitionSpeed = 1000;

var canvas = document.getElementById('main_image'),
  ctx = canvas.getContext('2d'),
  mouseX = 0,
  mouseY = 0,
  width = 280,
  height = 280,
  colour = 'hotpink',
  mousedown = false;

canvas.width = width;
canvas.height = height;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

console.log("width: "+width);
console.log("height: "+height);

var stroke_color = "black",
  stroke_width = 15;


canvas.addEventListener('mousemove', function (event) {
  if (event.offsetX) {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
  } else {
    mouseX = event.pageX - event.target.offsetLeft;
    mouseY = event.pageY - event.target.offsetTop;
  }
  // call the draw function
  draw();
}, false);

canvas.addEventListener('mousedown', function (event) {
  mousedown = true;
}, false);
canvas.addEventListener('mouseup', function (event) {
  mousedown = false;
}, false);

function draw() {
  if (mousedown) {
    // set the colour
    ctx.fillStyle = stroke_color;
    // start a path and paint a circle of 20 pixels at the mouse position
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, stroke_width, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
}

function showMainContent() {
  content = $('#content');
  introduction = $('#introduction');
  continue_button = $('#continue-button');

  continue_button.animate({
      'height':'0',
      'font-size':'0'
    },{
      duration: transitionSpeed,
      complete: function(){
        introduction.animate({
          'left':'-500vw'
        },{
          duration: transitionSpeed,
          complete: function(){
            content.show();
            content.animate({
              'opacity':'1'
            },{
              duration: transitionSpeed,
              complete: function(){
                content.show();
              }
            });
          }
      });
    }
  });
}

function erase() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.getElementById('interpretation').innerHTML= "";
}

function analyze() {
  document.getElementById("main_image").style.border = "2px solid";
  var dataURL = canvas.toDataURL();
  console.log(dataURL);
  //Fire request to API with data URL
  $.post( "http://127.0.0.1:5000/processimg",{'data':dataURL}, function( data ) {
    api_response = data;
    console.log(data);
    document.getElementById('interpretation').innerHTML= api_response;
  });
}
