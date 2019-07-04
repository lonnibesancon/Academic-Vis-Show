var applicantData;
var yPosition = 0;
var axisWidth = 1300;
var xStart = 180;
var intersect = 150;


function setup() {
  var canvas = createCanvas(1500, 1000);
  canvas.parent('design');
  textFont('Times New Roman');
  background(255);
  loadJSON("data/realData.json", gotData);
}

function draw() {

}
