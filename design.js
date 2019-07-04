
function vis(x, y, applicantInfo, publicationInfo){

  applicant = applicantInfo;
  pubArray = publicationInfo;

  translate(x, y);
  textSize(14);
  fill(0);
  textStyle(BOLD);
  noStroke();
  text(applicant.Name, xStart - 130, yPosition-30);

  textStyle(ITALIC);
  textSize(9);
  for (var i = 0; i < applicant.Research.length; i++) {
    text(applicant.Research[i], xStart - 130, yPosition-15+i*10 );
  }

  // draw axiså
  strokeWeight(1);
  axis(applicant.Mobility);


  //Draw the element
  rectMode(CENTER);

  var yPos;
  var xPos;
  var initialCircleSize = 8;
  var lineGraph_xPos = 1400;
  var lineGraph_yPos = yPosition;

  for (var y = 0; y < pubArray.length; y++) {

    for (var m = 0; m < pubArray[y].length; m++) {

      var lastCircleSize = 15;
      var independentRate = 0;

      for (var i = 0; i < pubArray[y][m].length; i++) {

        var circleSize = initialCircleSize;


        var lineHeight =  map(pubArray[y][m][i].Citation, 0, 50, 0, 40);

        rectMode(CENTER);
        if (pubArray[y][m][i]) {

          //draw circlesize: Conference Level
          if (pubArray[y][m][i].Rating == 'A*') {
            circleSize = circleSize*2;
          }else if (pubArray[y][m][i].Rating == 'A') {
            circleSize = circleSize*1,7;
          }else if (pubArray[y][m][i].Rating == 'B') {
            circleSize = circleSize*1.3;
          }else if (pubArray[y][m][i].Rating == 'C') {
            circleSize = circleSize*1.1;
          }else {
            circleSize = circleSize;
          }

          var xPos = xStart+m*intersect/12+intersect/24+y*intersect;
          var yPos = yPosition-12-((lastCircleSize+circleSize)/2+5)*i;

          citationCircle(pubArray[y][m][i], xPos, yPos);

          let c=checkColor_independence(pubArray[y][m][i]);

          if (pubArray[y][m][i].Type == "Paper") {
            pubCircle(pubArray[y][m][i], xPos, yPos, circleSize, c);
          }else {
            noStroke();
            rect(xPos, yPos, circleSize*0.93, circleSize*0.93);
          }
          lastCircleSize = circleSize;
        }
      }

      strokeCap(SQUARE);
    }
  }
}

function gotData(data){
  applicantData = data;

  for (var i = 0; i < applicantData.length; i++) {

    //For each candidate:
    //(1)Create 2 demension array to store publication information
    var pubArray =  new Array(10);

    for(var k = 0;k < pubArray.length; k++){
      pubArray[k] = new Array(12);
      for (var l = 0; l < pubArray[k].length; l++) {
        pubArray[k][l] = new Array();
      }
    }

    for (var j = 0; j < applicantData[i].Publication.length; j++) {

      var index_year;
      var index_month;

      index_year = applicantData[i].Publication[j].Year - 2012;
      index_month = applicantData[i].Publication[j].Month-1;

      pubArray[index_year][index_month].push(applicantData[i].Publication[j]);
      pubArray[index_year][index_month].sort(compare('Citation')); ////Sort by Citation
    }

    vis(0, 100, applicantData[i], pubArray);
  }
  // lengendC(50, 100);

}
