//Define Global Variable
var applicantData;
var pubArray = new Array();
var yPosition = 0;
var axisWidth = 1300;
var xStart = 180;
var intersect = 150;
var pubCircleList = new Array();
var pubCircle_index = 0;


function setup() {
  var canvas = createCanvas(1400, 320);
  canvas.parent('design_Evanthia');
  textFont('Times New Roman');
  background(255);
  loadJSON("../data/realData.json", gotData);

}

function draw() {
  background(255);
  if (applicantData) {
      vis(0, 100, applicantData[3], pubArray[3]);
      mouseOver();
    }
  }

function mouseOver() {
  for (var i = 0; i < pubCircleList.length; i++) {
      pubCircleList[i].hover(mouseX, mouseY);
    }
  }
