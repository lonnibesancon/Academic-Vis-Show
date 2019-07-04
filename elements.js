//Element drawing package------------------

function pubCircle(obj, xPos, yPos, circleSize, color){

  var authorNum = obj.AuthorCount;
  // var order = obj.Authors.indexOf('P Dragicevic');
  var order = obj.Order;

  if (authorNum == 1) {
    noStroke();
    checkColor_independence(obj);
    ellipse(xPos,yPos, circleSize, circleSize);

  } else if (authorNum == 2) {

    if (order == 0) {
      strokeWeight(circleSize/2.3);
      checkColor_independence(obj);
      fill(color);
      ellipse(xPos, yPos, circleSize, circleSize);
      noStroke();

    }else {
      strokeWeight(0.5);
      checkColor_independence(obj);
      fill(color);
      ellipse(xPos, yPos, circleSize, circleSize);
      checkColor_independence(obj);
      ellipse(xPos, yPos, circleSize/2, circleSize/2);
    }

  } else {
    if (order == 1) {
      strokeWeight(circleSize/4);
      checkColor_independence(obj);
      fill(color);
      ellipse(xPos, yPos, circleSize, circleSize);
      strokeWeight(0.5);
      noFill();
      ellipse(xPos, yPos, circleSize/3, circleSize/3);
      noStroke();

    } else if (order == authorNum) {

      strokeWeight(0.5);
      checkColor_independence(obj);
      fill(color);
      ellipse(xPos, yPos, circleSize, circleSize);
      checkColor_independence(obj);
      ellipse(xPos, yPos, circleSize/3, circleSize/3);

    } else {
      strokeWeight(0.5);
      checkColor_independence(obj);
      fill(color);
      ellipse(xPos, yPos, circleSize, circleSize);
      checkColor_independence(obj);
      noFill();
      strokeWeight(circleSize/4)
      ellipse(xPos, yPos, circleSize*2/5, circleSize*2/5);

    }
  }
}

function citationCircle(obj, xPos, yPos){


  var stevensExponent = 0.82; //or 1.0
  var exponent = 0.5/stevensExponent;
  var max_radius = 130;

  var backCircleSize = map(Math.pow(obj.Citation, exponent), 0, Math.pow(50, exponent), 4, max_radius);

  fill('rgba(97, 163, 163, 0.2)');
  noStroke();
  ellipse(xPos, yPos, backCircleSize, backCircleSize);

}

// function to draw the axis

function axis(mobiObj){
  //Draw Education background
  var padding = 10;

  for (var i = 0; i < mobiObj.length; i++) {

    var positionName = mobiObj[i].Position;
    var institute = mobiObj[i].Institute;
    var startDate = mobiObj[i].StartDate;
    var endDate = mobiObj[i].EndDate;

    var startDate_year = moment(startDate, "MM/YYYY").get('year');
    var startDate_month = moment(startDate, "MM/YYYY").get('month');
    var endDate_year = moment(endDate, "MM/YYYY").get('year');
    var endDate_month = moment(endDate, "MM/YYYY").get('month');

    //calculate the period start point and duration
    var startLocation = xStart + (startDate_year-2012)*intersect + (startDate_month-1)*intersect/12;
    var duration = (endDate_year - startDate_year)*intersect + (endDate_month - startDate_month)*intersect/12;

    var c;
    if (positionName == "PhD") {
      c = 200;
    } else {
      c = 60;
    }
    mobilityBg(startLocation, yPosition, duration, 4, c);

    fill(0);
    textSize(10);
    textStyle(BOLDITALIC);
    text(positionName+"-"+institute, startLocation, yPosition+16);
    // textStyle(ITALIC);
    // text(institute, startLocation+padding+40, yPosition+13);
  }

  //Draw Axis
  stroke(140);
  strokeWeight(0.5);
  line(xStart, yPosition, axisWidth, yPosition);

  //Draw Axis section and year
  fill(0);
  for (var i = 0; i < 8; i++) {
    stroke(255);
    strokeWeight(1);
    line(xStart+i*intersect, yPosition, xStart+i*intersect, yPosition+4);
    stroke(50);
    strokeWeight(0.5);
    line(xStart+i*intersect, yPosition-3, xStart+i*intersect, yPosition);
    noStroke();
    textStyle(NORMAL);
    textSize(9);
    text(2012+i, xStart+intersect/2-10+i*intersect, yPosition+30);

    //draw the line
    stroke(200);
    strokeWeight(0.5);
    line(xStart+i*intersect, yPosition, xStart+i*intersect, yPosition-40);
  }
}

function mobilityBg(x, y , width, height, c){

  rectMode(CORNER);
  fill(c);
  rect(x, y, width, height);

}


//Function package------------------

//Function of Sorting
function compare(property){
  return function(a,b){
    var value1 = a[property];
    var value2 = b[property];
    return value2 - value1;
  }
}

//Function of check color（For Design C）
function checkColor_independence(obj){
  let color_i = color('rgba(0, 158, 222, 0.9)');
  let color_d = color('rgba(228, 23, 109, 0.9)');
  // if (obj.Type == "Paper") {
    if (obj.WithAdvisor == 'No') {
      fill(color_i);
      stroke(color_i);
      return color('rgba(52, 204, 255, 0.9)');
    } else {
      fill(color_d);
      stroke(color_d);
      return color('rgba(255, 112, 162, 0.9)');
    }
  // }else {
  //   fill('rgba(152, 168, 191, 0.9)');
  //   stroke('rgba(152, 168, 191, 0.9)');
  //   return color('rgba(152, 168, 191, 0.9)');
  // }
}


//Legend
function lengendC(x, y){

  translate(x, y);
  rectMode(CENTER);

  var yStart = 10;
  var xStart = 10;
  var marginX = 130;
  var marginY = 20;
  var padding = 16;
  var size = 12;

  textSize(9);
  textStyle(NORMAL);

  //1. Shape
  noFill();
  stroke(0);
  strokeWeight(1.5);
  ellipse(xStart, yStart, size, size);
  rect(xStart, yStart+marginY, size, size);
  fill(0);
  noStroke();
  text("Full Paper", xStart+padding, yStart+3);
  text("Other Publication", xStart+padding, yStart+marginY+3);

  //2. Color
  noStroke();
  fill("#E4176D");
  ellipse(xStart+marginX, yStart, size, size);
  fill("#009EDE");
  ellipse(xStart+marginX, yStart+marginY, size, size);
  fill(0);
  text("With Advisor", xStart+marginX+padding, yStart+3);
  text("Without Advisor", xStart+marginX+padding, yStart+marginY+3);

  //3.size-Level
  noStroke();
  fill("#E4176D");
  ellipse(xStart+marginX*2, yStart, size-3, size-3);
  ellipse(xStart+marginX*2, yStart+marginY, size+5, size+5);
  fill(0);
  text("Low Rating J/C", xStart+marginX*2+padding, yStart+3);
  text("High Rating J/C", xStart+marginX*2+padding, yStart+marginY+3);

  //4.size-Citation
  noStroke();
  fill("#A1C8C8");
  ellipse(xStart+marginX*3, yStart, size-3, size-3);
  ellipse(xStart+marginX*3, yStart+marginY, size+5, size+5);
  fill(0);
  text("Low Citation", xStart+marginX*3+padding, yStart+3);
  text("High Citation", xStart+marginX*3+padding, yStart+marginY+3);

}
