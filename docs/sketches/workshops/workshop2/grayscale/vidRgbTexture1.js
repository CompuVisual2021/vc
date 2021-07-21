let img;
let theShader;
let imgPath = "/vc/docs/sketches/Pokémon.jpg";

function preload() {
  theShader = loadShader('/vc/docs/sketches/workshops/workshop2/grayscale/shader.vert','/vc/docs/sketches/workshops/workshop2/grayscale/rgbTexture.frag');
   img = loadImage(imgPath);
   vid = createVideo([
    "/vc/docs/sketches/fingers.mov",
    "/vc/docs/sketches/fingers.webm",]);
    vid.hide(); // by default video shows up in separate dom
    vid.loop();
}

function setup() {
  createCanvas(400, 400, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(theShader);
  theShader.setUniform('texture',vid);
}

function draw() {
  background(0);
  beginShape();
  //fill(color("red"));
  vertex(-width / 2, -height / 2, 0, 0, 0);
  //fill(color("blue"));
  vertex(width / 2, -height / 2, 0, 1, 0);
  //fill(color("green"));
  vertex(width / 2, height / 2, 0, 1, 1);
  //fill(color("cyan"));
  vertex(-width / 2, height / 2, 0, 0, 1);
  endShape(CLOSE);
  orbitControl();
}

function cover(texture = false) {
  beginShape();
  if (texture) {
    vertex(-width / 2, -height / 2, 0, 0, 0);
    vertex(width / 2, -height / 2, 0, 1, 0);
    vertex(width / 2, height / 2, 0, 1, 1);
    vertex(-width / 2, height / 2, 0, 0, 1);
  } else {
    vertex(-width / 2, -height / 2, 0);
    vertex(width / 2, -height / 2, 0);
    vertex(width / 2, height / 2, 0);
    vertex(-width / 2, height / 2, 0);
  }
  endShape(CLOSE);
}

function mousePressed() {
  vid.loop(); // set the video to loop and start playing
}