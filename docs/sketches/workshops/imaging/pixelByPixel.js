//var original = new p5((p)=>{
var original = function(p){
  let img; // Declarar variable 'img'.
  let imgPath = "/vc/docs/sketches/lenna.png";
  let imgWidth = 512;
  let imgHeight = 512;

  p.preload = () => {
    img = p.loadImage(imgPath);// Cargar la imagen
  }

  p.setup = () => {
    p.createCanvas(imgWidth, imgHeight);
    p.pixelDensity(1);

    p.image(img,0,0,imgWidth,imgHeight);
    // Only need to load the pixels[] array once, because we're only
    // manipulating pixels[] inside draw(), not drawing shapes.
    p.loadPixels();
    // We must also call loadPixels() on the PImage since we are going to read its pixels.
    //img.loadPixels();
    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        // Calculate the 1D location from a 2D grid
        let loc = (x + y * img.width) * 4;
        // Get the R,G,B values from image
        let r, g, b;
        r = p.pixels[loc];
        g = p.pixels[loc+1];
        b = p.pixels[loc+2];
        //Constrain RGB to make sure they are within 0-255 color range
        r = p.constrain(r, 0, 255);
        g = p.constrain(g, 0, 255);
        b = p.constrain(b, 0, 255);
        // Make a new color and set pixel in the window
        let pixloc = (y * img.width + x) * 4;
        p.pixels[pixloc] = r;
        p.pixels[pixloc + 1] = g;
        p.pixels[pixloc + 2] = b;
        p.pixels[pixloc + 3] = 255; // Always have to set alpha transparencias
      }
    }
    p.updatePixels();
  }
  p.mouseReleased = function() {
    switchi.remove();
    switchi = new p5(negativo);    
  }
}//,"originalIMG");

//var negativo = new p5((p)=>{
var negativo = function(p){
  let img; // Declarar variable 'img'.
  let imgPath = "/vc/docs/sketches/lenna.png";
  let imgWidth = 512;
  let imgHeight = 512;

  p.preload = () => {
    img = p.loadImage(imgPath);// Cargar la imagen
  }

  p.setup = () => {
    p.createCanvas(imgWidth, imgHeight);
    p.pixelDensity(1);

    p.image(img,0,0,imgWidth,imgHeight);
    // Only need to load the pixels[] array once, because we're only
    // manipulating pixels[] inside draw(), not drawing shapes.
    p.loadPixels();
    // We must also call loadPixels() on the PImage since we are going to read its pixels.
    //img.loadPixels();
    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        // Calculate the 1D location from a 2D grid
        let loc = (x + y * img.width) * 4;
        // Get the R,G,B values from image
        let r, g, b;
        r = p.pixels[loc];
        g = p.pixels[loc+1];
        b = p.pixels[loc+2];
        //Constrain RGB to make sure they are within 0-255 color range
        r = p.constrain(r, 0, 255);
        g = p.constrain(g, 0, 255);
        b = p.constrain(b, 0, 255);
        // Make a new color and set pixel in the window
        let pixloc = (y * img.width + x) * 4;
        p.pixels[pixloc] = 255-r;
        p.pixels[pixloc + 1] = 255-g;
        p.pixels[pixloc + 2] = 255-b;
        p.pixels[pixloc + 3] = 255; // Always have to set alpha
      }
    }
    p.updatePixels();
  }
  p.mouseReleased = function() {
    switchi.remove();
    switchi = new p5(blackAndWhite);    
  }
}//,"originalIMG");

//var blackAndWhite = new p5((p)=>{
var blackAndWhite = function(p){
  let img; // Declarar variable 'img'.
  let imgPath = "/vc/docs/sketches/lenna.png";
  let imgWidth = 512;
  let imgHeight = 512;

  p.preload = () => {
    img = p.loadImage(imgPath);// Cargar la imagen
  }

  p.setup = () => {
    p.createCanvas(imgWidth, imgHeight);
    p.pixelDensity(1);

    p.image(img,0,0,imgWidth,imgHeight);
    // Only need to load the pixels[] array once, because we're only
    // manipulating pixels[] inside draw(), not drawing shapes.
    p.loadPixels();
    // We must also call loadPixels() on the PImage since we are going to read its pixels.
    //img.loadPixels();
    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        // Calculate the 1D location from a 2D grid
        let loc = (x + y * img.width) * 4;
        // Get the R,G,B values from image
        let r, g, b;
        r = p.pixels[loc];
        g = p.pixels[loc+1];
        b = p.pixels[loc+2];
        //Constrain RGB to make sure they are within 0-255 color range
        r = p.constrain(r, 0, 255);
        g = p.constrain(g, 0, 255);
        b = p.constrain(b, 0, 255);
        // Make a new color and set pixel in the window
        //mathlab grises Y = R*0.3+G*0.59+B*0.11
        let pixloc = (y * img.width + x) * 4;
        let gray = r*0.299+g*0.587+b*0.114;
        p.pixels[pixloc] = gray;
        p.pixels[pixloc + 1] = gray;
        p.pixels[pixloc + 2] = gray;
        p.pixels[pixloc + 3] = 255; // Always have to set alpha
      }
    }
    p.updatePixels();
  }
  p.mouseReleased = function() {
    switchi.remove();
    switchi = new p5(original);    
  }
}//,"originalIMG");

var switchi = new p5(original);

/*let img; // Declarar variable 'img'.
let imgPath = "/vc/docs/sketches/lenna.png";
let imgWidth = 512;
let imgHeight = 512;

function preload() {
  // load the original image
  img = loadImage(imgPath);// Cargar la imagen
}

function setup() {
  createCanvas(512, 512);
  pixelDensity(1); 

  image(img,0,0,imgWidth,imgHeight); 
  // Only need to load the pixels[] array once, because we're only
  // manipulating pixels[] inside draw(), not drawing shapes.
  loadPixels();
  // We must also call loadPixels() on the PImage since we are going to read its pixels.
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      // Calculate the 1D location from a 2D grid
      let loc = (x + y * img.width) * 4;
      // Get the R,G,B values from image
      let r, g, b;
      r = pixels[loc];
      g = pixels[loc+1];
      b = pixels[loc+2];
      //Constrain RGB to make sure they are within 0-255 color range
      r = constrain(r, 0, 255);
      g = constrain(g, 0, 255);
      b = constrain(b, 0, 255);
      // Make a new color and set pixel in the window
      let pixloc = (y * img.width + x) * 4;
      pixels[pixloc] = r;
      pixels[pixloc + 1] = g;
      pixels[pixloc + 2] = b;
      pixels[pixloc + 3] = 255; // Always have to set alpha
    }
  }
  updatePixels();
  // otra alternativa que no funviono en instance mode
   //filter(GRAY);
   //filter(INVERT);
   //filter(BLUR);
}*/
