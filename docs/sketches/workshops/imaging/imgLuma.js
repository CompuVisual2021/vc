let img; // Declarar variable 'img'.
let imgPath = "/vc/docs/sketches/Fire_breathing_2_Luc_Viatour.jpg";//Pokémon.jpg";
let imgWidth = 780;
let imgHeight = 439;

function preload() {
  srcimg = loadImage(imgPath); // Cargar la imagen
  dstimg = loadImage(imgPath); // Cargar la imagen
}

function setup() {
  createCanvas(imgWidth, imgHeight + 15);
  pixelDensity(1);
  //textSize(10);
  //text("Gray scale: original(supIzq), luma(supDer), average(infIzq), weighted(infDer)", 0, imgHeight + 10);
  image(dstimg, 0, 0, imgWidth / 2, imgHeight / 2);
  lumaGray(dstimg,srcimg);
  image(dstimg, width / 2, 0, imgWidth / 2, imgHeight / 2);
  averageGray(dstimg,srcimg);
  image(dstimg, 0, imgHeight / 2, imgWidth / 2, imgHeight / 2);
  weightedGray(dstimg,srcimg);
  image(dstimg, width / 2, imgHeight / 2, imgWidth / 2, imgHeight / 2);
}

function lumaGray(dstimg,srcimg) {
  srcimg.loadPixels();
  dstimg.loadPixels();
  for (let x = 0; x < srcimg.width; x++) {
    for (let y = 0; y < srcimg.height; y++) {
      // Calculate the 1D location from a 2D grid
      let loc = (x + y * srcimg.width) * 4;
      // Get the R,G,B values from image
      let r, g, b;
      r = srcimg.pixels[loc];
      g = srcimg.pixels[loc + 1];
      b = srcimg.pixels[loc + 2];
      //Constrain RGB to make sure they are within 0-255 color range
      r = constrain(r, 0, 255);
      g = constrain(g, 0, 255);
      b = constrain(b, 0, 255);
      // Make a new color and set pixel in the window
      let pixloc = (y * srcimg.width + x) * 4;
      let gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      dstimg.pixels[pixloc] = gray;
      dstimg.pixels[pixloc + 1] = gray;
      dstimg.pixels[pixloc + 2] = gray;
      dstimg.pixels[pixloc + 3] = 255; // Always have to set alpha
    }
  }
  dstimg.updatePixels();
}

function averageGray(dstimg,srcimg) {
  srcimg.loadPixels();
  dstimg.loadPixels();
  for (let x = 0; x < srcimg.width; x++) {
    for (let y = 0; y < srcimg.height; y++) {
      // Calculate the 1D location from a 2D grid
      let loc = (x + y * srcimg.width) * 4;
      // Get the R,G,B values from image
      let r, g, b;
      r = srcimg.pixels[loc];
      g = srcimg.pixels[loc + 1];
      b = srcimg.pixels[loc + 2];
      //Constrain RGB to make sure they are within 0-255 color range
      r = constrain(r, 0, 255);
      g = constrain(g, 0, 255);
      b = constrain(b, 0, 255);
      // Make a new color and set pixel in the window
      let pixloc = (y * srcimg.width + x) * 4;
      let gray = (r + g + b) / 3;
      dstimg.pixels[pixloc] = gray;
      dstimg.pixels[pixloc + 1] = gray;
      dstimg.pixels[pixloc + 2] = gray;
      dstimg.pixels[pixloc + 3] = 255; // Always have to set alpha
    }
  }
  dstimg.updatePixels();
}

function weightedGray(dstimg,srcimg) {
  srcimg.loadPixels();
  dstimg.loadPixels();
  for (let x = 0; x < srcimg.width; x++) {
    for (let y = 0; y < srcimg.height; y++) {
      // Calculate the 1D location from a 2D grid
      let loc = (x + y * srcimg.width) * 4;
      // Get the R,G,B values from image
      let r, g, b;
      r = srcimg.pixels[loc];
      g = srcimg.pixels[loc + 1];
      b = srcimg.pixels[loc + 2];
      //Constrain RGB to make sure they are within 0-255 color range
      r = constrain(r, 0, 255);
      g = constrain(g, 0, 255);
      b = constrain(b, 0, 255);
      // Make a new color and set pixel in the window
      let pixloc = (y * srcimg.width + x) * 4;
      let gray = r * 0.299 + g * 0.587 + b * 0.114;
      dstimg.pixels[pixloc] = gray;
      dstimg.pixels[pixloc + 1] = gray;
      dstimg.pixels[pixloc + 2] = gray;
      dstimg.pixels[pixloc + 3] = 255; // Always have to set alpha
    }
  }
  dstimg.updatePixels();
}
