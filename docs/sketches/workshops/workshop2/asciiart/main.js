// shader ascii art....
let mosaic;
let image;
let symbols = [];
let debug = false;
let filePathPrefix = '/vc/docs/sketches/workshops/workshop2/asciiart/';

function preload() {

    image = loadImage(filePathPrefix + 'lenna.png');
    for (let i = 0; i < 8; i++)
        symbols.push(loadImage((filePathPrefix + 'palette2/?.png').replace('?', i)));
    mosaic = loadShader(filePathPrefix + 'shader.vert', filePathPrefix + 'photomosaic.frag');
}

function setup() {
    createCanvas(600, 600, WEBGL);
    addCheckbox();
    addTileSizeSelector();
    addChannelSelector();
    textureMode(NORMAL);
    noStroke();
    shader(mosaic);
    mosaic.setUniform('image', image);
    for (let i = 0; i < 8; i++)
        mosaic.setUniform('symbol' + i, symbols[i]);
    mosaic.setUniform('resolution', 100);
    mosaic.setUniform('debug', debug);
}

function draw() {
    background(33);
    cover(true);
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

function keyPressed() {
    if (key === 'd') {
        debug = !debug;
        mosaic.setUniform('debug', debug);
    }
}

function addChannelSelector() {
    filSel = createSelect();
    filSel.position(40, 10);
    filSel.option('red', 0);
    filSel.option('green', 1);
    filSel.option('blue', 2);
    filSel.option('gamma', 3);
    filSel.option('grayavg', 4);
    filSel.option('luma', 5);
    filSel.selected('red');
    filSel.changed(() => {
        mosaic.setUniform('channel', filSel.value());
    })
}

function addTileSizeSelector() {
    tilSel = createSelect();
    tilSel.position(120, 10);
    tilSel.option(5);
    tilSel.option(10);
    tilSel.option(50);
    tilSel.option(100);
    tilSel.option(150);
    tilSel.option(200);
    tilSel.option(300);
    tilSel.selected(50);
    tilSel.changed(() => {
        mosaic.setUniform('resolution', tilSel.value());
    })
}

function addCheckbox() {
    checkbox = createCheckbox('');
    checkbox.position(10, 10);
    checkbox.changed(() => {
      debug = !debug;
      mosaic.setUniform('debug', debug);
    });
  }