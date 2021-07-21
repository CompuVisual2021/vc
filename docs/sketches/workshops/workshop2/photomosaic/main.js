// shader ascii art....
let mosaic;
let image;
let symbols = [[], [], []];
let averages = [];
let debug = false;
let palette = 0;
let filePathPrefix = '/vc/docs/sketches/workshops/workshop2/photomosaic/';

function preload() {
    image = loadImage(filePathPrefix + 'bigpicture.jpg');
    for (let j = 0; j < 3; j++)
        for (let i = 0; i < 8; i++)
            symbols[j].push(loadImage((filePathPrefix + 'palette!/?.png').replace('!', j).replace('?', i)));
    mosaic = loadShader(filePathPrefix + 'shader.vert', filePathPrefix + 'photomosaic.frag');
}

function setup() {
    // canvas setup
    createCanvas(600, 600, WEBGL);
    addCheckbox();
    addTileSizeSelector();
    addPaletteSelector();
    textureMode(NORMAL);
    noStroke();
    // tile avg comp.
    computeTileAverageColor();
    // shader uniform setup
    shader(mosaic);
    mosaic.setUniform('image', image);
    for (let i = 0; i < 8; i++) {
        mosaic.setUniform('symbol' + i, symbols[palette][i]);
        mosaic.setUniform('avgcol' + i, averages[i]);
    }
    mosaic.setUniform('resolution', 100);
    mosaic.setUniform('debug', debug);
}

function draw() {
    background(33);
    cover(true);
    for (let i = 0; i < 8; i++) {
        mosaic.setUniform('symbol' + i, symbols[palette][i]);
        mosaic.setUniform('avgcol' + i, averages[i]);
    }
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

function computeTileAverageColor() {
    for (pic of symbols[palette]) {
        pic.loadPixels()
        let r = 0;
        let g = 0;
        let b = 0;
        let n = 0;
        for (let y = 0; y < pic.height; y++) {
            for (let x = 0; x < pic.width; x++) {
                let i = (x + y * pic.width)*4;
                r += pic.pixels[i + 0];
                g += pic.pixels[i + 1];
                b += pic.pixels[i + 2];
                n++;
            }
        }
        averages.push([r/n, g/n, b/n]);
    }
  }

function addPaletteSelector() {
    filSel = createSelect();
    filSel.position(40, 10);
    filSel.option('nature', 0);
    filSel.option('subpic', 1);
    filSel.option('colors', 2);
    filSel.changed(() => {
        palette = filSel.value();
        redraw()
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
