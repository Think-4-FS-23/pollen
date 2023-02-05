'use strict';
var agents = [];
var agentCount = 4000;
var noiseScale = 300;
var noiseStrength = 10;
var overlayAlpha = 10;
var agentAlpha = 90;
var strokeWidth = 0.3;
var drawMode = 1;

function setup(){
  createCanvas(800,600);
  for (var i = 0; i < agentCount; i++) {
    agents[i] = new Agent();
  }
  background(255);
}

function draw(){
  fill(255, overlayAlpha);
  noStroke();
  rect(0, 0, width, height);

  // Draw agents
  stroke(0, agentAlpha);
  for (var i = 0; i < agentCount; i++) {

    // if (drawMode == 1) agents[i].update1(noiseScale, noiseStrength, strokeWidth);
    // else agents[i].update2(noiseScale, noiseStrength, strokeWidth);
    agents[i].update(strokeWidth);
  }
}



function keyTyped() {
  if (key == '1') drawMode = 1;
  if (key == '2') drawMode = 2;
  if (key == ' ') {
    var newNoiseSeed = floor(random(10000));
    noiseSeed(newNoiseSeed);
  }
  if (keyCode == p.DELETE || keyCode == p.BACKSPACE) {
    background(255);
  }
};


class Agent{

  constructor(){
    this.pos = createVector(random(width), random(height));
    this.posOld = this.pos.copy();
    this.stepSize = random(1, 5);
    this.isOutside = false;
    this.angle =0;
  }

  update(){
    console.log(this.angle,this.stepSize)
    this.pos.x += sin(this.angle)*this.stepSize;
    this.pos.y += cos(this.angle)*this.stepSize;
    let noiseX = map(this.pos.x, 0, width, 0, 1);
    let noiseY = map(this.pos.y, 0, height, 0, 1);
    this.angle = noise(noiseX,noiseY) * 10;
    this.isOutside = this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height;
    if (this.isOutside) {
      this.pos.set(random(width), random(height));
      this.posOld = this.pos.copy();
      this.angle = 0;
    }
    strokeWeight(strokeWidth * this.stepSize);
    line(this.posOld.x, this.posOld.y, this.pos.x, this.pos.y);
    this.posOld = this.pos.copy();
    this.isOutside = false;
    
  }

}
