'use strict';
var agents = [];
var agentCount = 4000;
var noiseScale = 300;
var noiseStrength = 10;
var overlayAlpha = 10;
var agentAlpha = 90;
var strokeWidth = 1;
var drawMode = 1;

function setup(){
  createCanvas(800,600);
  for (var i = 0; i < agentCount; i++) {
    agents[i] = new Agent();
  }
  background(0);
}

function draw(){
  fill(0, overlayAlpha);
  noStroke();
  rect(0, 0, width, height);

  // Draw agents
  stroke(0, agentAlpha);
  for (var i = 0; i < agentCount; i++) {
    agents[i].update(strokeWidth);
  }
}



function keyTyped() {

  if (key == ' ') {
    var newNoiseSeed = floor(random(10000));
    noiseSeed(newNoiseSeed);
  }

};


class Agent{

  constructor(){
    this.pos = createVector(random(width), random(height));
    this.posOld = this.pos.copy();
    this.stepSize = random(1, 5);
    this.isOutside = false;
    this.stepSize = 5;
    let noiseX = map(this.pos.x, 0, width, 0, 0.5);
    let noiseY = map(this.pos.y, 0, height, 0, 0.5);
    this.angle =noise(noiseX,noiseY) * this.stepSize;
  }

  update(){
   // console.log(this.angle,this.stepSize)
    this.posOld = this.pos.copy();
    let noiseX = map(this.pos.x, 0, width, 0, 2);
    let noiseY = map(this.pos.y, 0, height, 0, 2);
    this.angle = noise(noiseX,noiseY) * this.stepSize;
    this.pos.x += sin(this.angle)*this.stepSize;
    this.pos.y += cos(this.angle)*this.stepSize;
    this.isOutside = this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height;
    if (this.isOutside) {
      this.pos.set(random(width), random(height));
      this.posOld = this.pos.copy();
      //this.angle = 0;
    }
    strokeWeight(strokeWidth);
    stroke(255,10);
    line(this.posOld.x, this.posOld.y, this.pos.x, this.pos.y);
  
    this.isOutside = false;
    
  }

}
