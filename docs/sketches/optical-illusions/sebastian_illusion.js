let pic
let defWidth = 800
let defHeight = 600

function preload() {
    let picLocation = '/vc/docs/sketches/optical-illusions/ilusion-de-Zollner.jpg';
    pic = loadImage(picLocation);
}

function setup() {
    createCanvas(defWidth, defHeight);
    pic.resize(defWidth, defHeight)
}

function draw() {
    image(pic, 0, 0);
}