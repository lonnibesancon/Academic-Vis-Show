class PubCircle {

  constructor(obj, xPos, yPos, circleSize, color){
    this.obj = obj;
    this.xPos = xPos;
    this.yPos = yPos;
    this.circleSize = circleSize;
    this.color = color;
  }

  display(){
    if (this.obj.Type == "Paper") {
      pubCircle(this.obj, this.xPos, this.yPos, this.circleSize, this.color);
    }else {
      noStroke();
      rect(this.xPos, this.yPos, this.circleSize*0.93, this.circleSize*0.93);
    }
  }

  hover(x, y){
    // translate(0, 100);
    let d = dist(x, y, this.xPos, this.yPos);

    if (d < this.circleSize) {
      createTooltip(this.xPos+10, this.yPos+10, this.obj);
      let c = color('rgba(255, 220, 37, 0.9)');
      // stroke(c);
      fill(c);
      noStroke();
      // strokeWeight(1);
      if (this.obj.Type == "Paper") {
        ellipse(this.xPos, this.yPos, this.circleSize, this.circleSize);
      }else {
        rectMode(CENTER);
        rect(this.xPos, this.yPos, this.circleSize*0.93, this.circleSize*0.93);
      }

    }
  }
}
