// History point radius
const hpRadius = 10;
const headWidth = 15;

var slider;
var mouseLastPressedX = 0;
var mouseLastPressedY = 0;

function isSliderPressed() {
  return mouseIsPressed &&
         abs(mouseLastPressedX - (width / 2)) <= 40 &&
         abs(mouseLastPressedY - (height / 2)) <= 10;
}

class HistoryPoint {
  constructor(x, y, t) {
    this.x = x;
    this.y = y;
    this.t = t;
  }

  // Custom method for drawing the object
  draw() {
    strokeWeight(hpRadius);
    point(this.x, this.y);
  }

  drawHead() {
    noFill();
    strokeWeight(2);

    rect(this.x, this.y, headWidth, headWidth);
  }
}

class Track {
  constructor(colour, oldTrack) {
    this.colour = colour;
    this.oldTrack = oldTrack;
    this.historyPoints = new Array();
  }

  addPoint(hp) {
    this.historyPoints.push(hp);
  }

  update(t) {
    this.t = t;
  }

  draw() {
    var points = new Array();
    stroke(this.colour);
    fill(this.colour);
    for (var idx = 0; idx < this.historyPoints.length; ++idx) {
      var hp = this.historyPoints[idx];

      if (this.oldTrack && isSliderPressed() && hp.t > this.t) {
        continue;
      }

      if (!this.oldTrack && isSliderPressed() && hp.t <= this.t) {
        continue;
      }

      if (idx < this.historyPoints.length - 1 || (isSliderPressed() && this.oldTrack)) {
        hp.draw();
      } else {
        hp.drawHead();
      }

      points.push(hp);
    }

    return points;
  }
}

var track1;
var track2;

function setup() {
  createCanvas(640, 310);
  sliderPos = createVector(width / 2, height / 2);

  rectMode(CENTER);

  slider = createSlider(11, 99, 50);
  slider.position((width / 2) - 40, height / 2);
  slider.style('width', '80px');


  track1 = new Track(color("#d7191c"), true);
  track1.addPoint(new HistoryPoint(61, 226, 10));
  track1.addPoint(new HistoryPoint(106, 214, 20));
  track1.addPoint(new HistoryPoint(150, 232, 30));
  track1.addPoint(new HistoryPoint(220, 227, 40));
  track1.addPoint(new HistoryPoint(274, 218, 50));
  track1.addPoint(new HistoryPoint(314, 214, 60));
  track1.addPoint(new HistoryPoint(383, 220, 70));

  track2 = new Track(color("#2c7bb6"), false);
  track2.addPoint(new HistoryPoint(290, 234, 51));
  track2.addPoint(new HistoryPoint(343, 240, 61));
  track2.addPoint(new HistoryPoint(424, 242, 71));
  track2.addPoint(new HistoryPoint(518, 231, 81));
  track2.addPoint(new HistoryPoint(574, 229, 91));
  track2.addPoint(new HistoryPoint(613, 218, 100));

  track3 = new Track(color(255, 255, 255));
}

function drawLine(points) {
  strokeWeight(1);
  stroke("#ffff00");
  for (var idx = 0; idx < points.length - 1; ++idx) {
    var p1 = points[idx];
    var p2 = points[idx + 1];

    line(p1.x, p1.y, p2.x, p2.y);
  }
}

function draw() {
  background(50, 50, 50);

  stroke(210);
  strokeWeight(4);

  let hp = new HistoryPoint(10, 10, 10);

  let t = slider.value();
  track1.update(t);
  track2.update(t);

  var points1 = track1.draw();
  var points2 = track2.draw();

  if (isSliderPressed()) {
    drawLine(points1.concat(points2));
  }
  else {
    drawLine(points1);
    drawLine(points2);
  }
}

function mouseClicked() {
  console.log(mouseX, mouseY);
}

function mousePressed() {
  mouseLastPressedX = mouseX;
  mouseLastPressedY = mouseY;
}