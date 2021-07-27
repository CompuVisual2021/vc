let image;
let theShader;
let imgPath = "/vc/docs/sketches/Pokémon.jpg";
let filSel;
let lumaSel;
let convolution= new Map();

let kernel;
let alpha;

function preload() {
 theShader = loadShader('/vc/docs/sketches/workshops/workshop2/kernel/shader.vert','/vc/docs/sketches/workshops/workshop2/kernel/kernelMask.frag');
 image = loadImage(imgPath);
 vid = createVideo([
    "/vc/docs/sketches/fingers.mov",
    "/vc/docs/sketches/fingers.webm",]);
    vid.hide(); // by default video shows up in separate dom
    vid.loop();
}


function setup() {
 createCanvas(400, 400, WEBGL);
 textureMode(NORMAL);
 noStroke();
// shader uniform setup
 shader(theShader);
 theShader.setUniform('texture',vid)
 theShader.setUniform('stepSize', [1/vid.width, 1/vid.height]);
 kernel = [[0,0,0],[0,1,0],[0,0,0]];

 convolution.set("Identity",[
    [0,0,0],
    [0,1,0],
    [0,0,0]
   ]);
 convolution.set("Gaussian blur",[
     [0.0625,0.125,0.0625],
     [0.125,0.25,0.125],
     [0.0625,0.125,0.0625]
    ]);
 convolution.set("Sharpen",[
     [0,-1,0],
     [-1,5,-1],
     [0,-1,0]]
     );
 convolution.set("edge detection",[
     [0,-1,0],
     [-1,4,-1],
     [0,-1,0]]
     );
 convolution.set("Emboss",[
     [-2,-1,0],
     [-1,1,1],
     [0,1,2]]
);

 textAlign(CENTER);
 background(200);
 filSel = createSelect();
 filSel.position(80, 15);
 filSel.option("Identity");
 filSel.option("edge detection");
 filSel.option("Sharpen");
 filSel.option("Gaussian blur"); 
 filSel.option("Emboss");

 lumaSel = createSelect();
 lumaSel.position(10, 15);
 lumaSel.option(0.0)
 lumaSel.option(0.25)
 lumaSel.option(0.5)
 lumaSel.option(0.75)
 lumaSel.option(1.0)

}

function kernelSelector() {
 kernel = convolution.get(filSel.value());
 redraw();
}

function draw() {

    filSel.changed(kernelSelector);
    alpha = lumaSel.value();
 theShader.setUniform('x1', kernel[0]);
 theShader.setUniform('x2', kernel[1]);
 theShader.setUniform('x3', kernel[2]);
 theShader.setUniform('alphaV', alpha);

 background(0);

 beginShape();
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

function mousePressed() {
    vid.loop(); // set the video to loop and start playing
  }