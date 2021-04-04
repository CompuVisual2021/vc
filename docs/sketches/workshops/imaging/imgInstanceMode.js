//var original = new p5((p)=>{
var original = function(p){
  let img; // Declarar variable 'img'.
  let imgPath = "/vc/docs/sketches/Pokémon.jpg";
  let imgWidth = 780;
  let imgHeight = 439;

  p.preload = () => {
    img = p.loadImage(imgPath); // Cargar la imagen
  };

  p.setup = () => {
    p.createCanvas(imgWidth, imgHeight+15);
    p.pixelDensity(1);

    p.textSize(10);
    p.text('Original', 0, imgHeight+10);

    p.image(img, 0, 0, imgWidth, imgHeight);
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
        g = p.pixels[loc + 1];
        b = p.pixels[loc + 2];
        //Constrain RGB to make sure they are within 0-255 color range
        r = p.constrain(r, 0, 255);
        g = p.constrain(g, 0, 255);
        b = p.constrain(b, 0, 255);
        // Make a new color and set pixel in the window
        //mathlab grises Y = R*0.3+G*0.59+B*0.11
        let pixloc = (y * img.width + x) * 4;
        p.pixels[pixloc] = r;
        p.pixels[pixloc + 1] = g;
        p.pixels[pixloc + 2] = b;
        p.pixels[pixloc + 3] = 255; // Always have to set alpha transparencias
      }
    }
    p.updatePixels(0,0,imgWidth, imgHeight);
  }
  p.mouseReleased = function() {
    switchi.remove();
    switchi = new p5(negativo);    
  }
}//,"originalIMG");

//var negativo = new p5((p)=>{
var negativo = function(p){
  let img; // Declarar variable 'img'.
  let imgPath = "/vc/docs/sketches/Pokémon.jpg";
  let imgWidth = 780;
  let imgHeight = 439;

  p.preload = () => {
    img = p.loadImage(imgPath); // Cargar la imagen
  };

  p.setup = () => {
    p.createCanvas(imgWidth, imgHeight+15);
    p.pixelDensity(1);

    p.textSize(10);
    p.text('Negative', 0, imgHeight+10);

    p.image(img, 0, 0, imgWidth, imgHeight);
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
        g = p.pixels[loc + 1];
        b = p.pixels[loc + 2];
        //Constrain RGB to make sure they are within 0-255 color range
        r = p.constrain(r, 0, 255);
        g = p.constrain(g, 0, 255);
        b = p.constrain(b, 0, 255);
        // Make a new color and set pixel in the window
        //mathlab grises Y = R*0.3+G*0.59+B*0.11
        let pixloc = (y * img.width + x) * 4;
        p.pixels[pixloc] = 255-r;
        p.pixels[pixloc + 1] = 255-g;
        p.pixels[pixloc + 2] = 255-b;
        p.pixels[pixloc + 3] = 255; // Always have to set alpha
      }
    }
    p.updatePixels(0,0,imgWidth, imgHeight);
  }
  p.mouseReleased = function() {
    switchi.remove();
    switchi = new p5(blackAndWhite);    
  }
}//,"originalIMG");

//var blackAndWhite = new p5((p)=>{
var blackAndWhite = function(p){
  let img; // Declarar variable 'img'.
  let imgPath = "/vc/docs/sketches/Pokémon.jpg";
  let imgWidth = 780;
  let imgHeight = 439;

  p.preload = () => {
    img = p.loadImage(imgPath); // Cargar la imagen
  };

  p.setup = () => {
    p.createCanvas(imgWidth, imgHeight+15);
    p.pixelDensity(1);

    p.textSize(10);
    p.text('Gray scale', 0, imgHeight+10);

    p.image(img, 0, 0, imgWidth, imgHeight);
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
        g = p.pixels[loc + 1];
        b = p.pixels[loc + 2];
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
    p.updatePixels(0,0,imgWidth, imgHeight);
  }
  p.mouseReleased = function() {
    switchi.remove();
    switchi = new p5(original);    
  }
}//,"originalIMG");

var switchi = new p5(original);
