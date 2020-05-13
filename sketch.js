// History point radius
const hpRadius = 4;
const headWidth = 7;

var slider;

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
    stroke(this.colour);
    fill(this.colour);
    for (var idx = 0; idx < this.historyPoints.length; ++idx) {
      var hp = this.historyPoints[idx];
      if (idx < this.historyPoints.length - 1 || mouseIsPressed) {
        hp.draw();
      } else {
        hp.drawHead();
      }
    }
  }
}

var track1;
var track2;

function setup() {
  createCanvas(640, 310);
  sliderPos = createVector(width / 2, height / 2);

  rectMode(CENTER);

  slider = createSlider(0, 100, 50);
  slider.position((width / 2) - 40, height / 2);
  slider.style('width', '80px');


  track1 = new Track(color(0, 255, 255), true);
  track1.addPoint(new HistoryPoint(61, 226, 10));
  track1.addPoint(new HistoryPoint(106, 214, 20));
  track1.addPoint(new HistoryPoint(150, 232, 30));
  track1.addPoint(new HistoryPoint(220, 227, 40));
  track1.addPoint(new HistoryPoint(274, 218, 50));
  track1.addPoint(new HistoryPoint(313, 236, 60));
  track1.addPoint(new HistoryPoint(383, 220, 70));

  track2 = new Track(color(255, 0, 0), false);
  track2.addPoint(new HistoryPoint(343, 240, 60));
  track2.addPoint(new HistoryPoint(424, 242, 70));
  track2.addPoint(new HistoryPoint(518, 231, 80));
  track2.addPoint(new HistoryPoint(574, 229, 90));
  track2.addPoint(new HistoryPoint(613, 218, 100));

  track3 = new Track(color(255, 255, 255));
}

function draw() {
  background(50, 50, 50);

  stroke(210);
  strokeWeight(4);

  let hp = new HistoryPoint(10, 10, 10);

  let t = slider.value();
  track1.update(t);
  track2.update(t);

  track1.draw();
  track2.draw();
}
