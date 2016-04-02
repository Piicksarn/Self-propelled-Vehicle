const RADIUS = 60;
var Vehicle = function(canvas) {
  this.canvas = document.getElementById(canvas);
  this.ctx = this.canvas.getContext('2d');
  this.homoMatrix = math.zeros(3,3);
  this.vecMatrix = math.zeros(3);
  this.resultMatrix = math.zeros(3,3);
};
var car_x = 0;
var car_y = 0;
var car_vector = [2, 2];
var car_angle = 0;
//a is for x and b is for y in translate, theta is degree for rotate.
function homogenous(theta, a, b) {
  var Vmatrix = math.matrix();
  var Rmatrix = math.matrix();
  var Tmatrix = math.matrix();
  var Hmatrix = math.matrix();
  var ResultMatrix = math.matrix();
  Rmatrix = [
    [Math.cos(theta), Math.sin(theta) * -1, 0],
    [Math.sin(theta), Math.cos(theta), 0 ],
    [0, 0, 1]
  ];

  Tmatrix = [
    [1, 0, a],
    [0, 1, b],
    [0, 0, 1]
  ];
  Hmatrix = math.multiply(Rmatrix, Tmatrix);
  return Hmatrix;
}
function setVector(x, y) {
  return vector = [x, y, 1];
}
function calResultMat(vactor, homo) {
  return math.multiply(homo, vactor);
}

Vehicle.prototype = {
  initial: function() {
    this.ctx.translate(60 + RADIUS + 20, 480 + 20);
  },
  drawBkg: function() {
    this.clear();
  },
  transform: function() {
    this.vecMatrix = setVector(car_x, car_y);
    this.homoMatrix = homogenous(angle_theta, 2, 2); //homogenous(angle, x, y)
    this.resultMatrix = calResultMat(this.vecMatrix, this.homoMatrix);
    car_x = this.resultMatrix[0];
    car_y = this.resultMatrix[1];
  },
  drawCar: function(ctx) {

    if(start) {
      this.transform();
      // Save the footprint in the list when draw the car
      if(footCount % 10 == 0) {
        var foot = new FootPrint(car_x, car_y);
        footprintList.push(foot);
      }
    }
    // Draw the car
    ctx.beginPath();
    ctx.fillStyle = "rgba(20, 20, 20, 0.7)";
    ctx.arc(draw_x, draw_y, RADIUS, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
  }
}
