let fingers;
let imgWidth = 780;
let imgHeight = 439;

function setup() {
  createCanvas(imgWidth, imgHeight);
  // specify multiple formats for different browsers
  fingers1 = createVideo([
    "/vc/docs/sketches/fingers.mov",
    "/vc/docs/sketches/fingers.webm",
  ]);
  fingers1.hide(); // by default video shows up in separate dom
  fingers1.loop();
  // element. hide it and draw it to the canvas
  // instead
  fingers2 = createVideo([
    "/vc/docs/sketches/fingers.mov",
    "/vc/docs/sketches/fingers.webm",
  ]);
  fingers2.hide(); // by default video shows up in separate dom
  fingers2.loop();
  fingers3 = createVideo([
    "/vc/docs/sketches/fingers.mov",
    "/vc/docs/sketches/fingers.webm",
  ]);
  fingers3.hide(); // by default video shows up in separate dom
  fingers3.loop();
  fingers4 = createVideo([
    "/vc/docs/sketches/fingers.mov",
    "/vc/docs/sketches/fingers.webm",
  ]);
  fingers4.hide(); // by default video shows up in separate dom
  fingers4.loop();
}

function draw() {
  image(fingers1, 0, 0, width / 2, height / 2); // draw the video frame to canvas
  //filter(GRAY);
  lumaGray(fingers2);
  image(fingers2, width / 2, 0, width / 2, height / 2); // draw a second copy to canvas
  averageGray(fingers3);
  image(fingers3, 0, height / 2, width / 2, height / 2); // draw a second copy to canvas
  weightedGray(fingers4);
  image(fingers4, width / 2, height / 2, width / 2, height / 2); // draw a second copy to canvas
}

function mousePressed() {
  fingers1.loop(); // set the video to loop and start playing
  fingers2.loop(); // set the video to loop and start playing
  fingers3.loop(); // set the video to loop and start playing
  fingers4.loop(); // set the video to loop and start playing
}

function lumaGray(img) {
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      // Calculate the 1D location from a 2D grid
      let loc = (x + y * img.width) * 4;
      // Get the R,G,B values from image
      let r, g, b;
      r = img.pixels[loc];
      g = img.pixels[loc + 1];
      b = img.pixels[loc + 2];
      //Constrain RGB to make sure they are within 0-255 color range
      r = constrain(r, 0, 255);
      g = constrain(g, 0, 255);
      b = constrain(b, 0, 255);
      // Make a new color and set pixel in the window
      let pixloc = (y * img.width + x) * 4;
      let gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      img.pixels[pixloc] = gray;
      img.pixels[pixloc + 1] = gray;
      img.pixels[pixloc + 2] = gray;
      img.pixels[pixloc + 3] = 255; // Always have to set alpha
    }
  }
  img.updatePixels();
}

function averageGray(img) {
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      // Calculate the 1D location from a 2D grid
      let loc = (x + y * img.width) * 4;
      // Get the R,G,B values from image
      let r, g, b;
      r = img.pixels[loc];
      g = img.pixels[loc + 1];
      b = img.pixels[loc + 2];
      //Constrain RGB to make sure they are within 0-255 color range
      r = constrain(r, 0, 255);
      g = constrain(g, 0, 255);
      b = constrain(b, 0, 255);
      // Make a new color and set pixel in the window
      let pixloc = (y * img.width + x) * 4;
      let gray = (r + g + b) / 3;
      img.pixels[pixloc] = gray;
      img.pixels[pixloc + 1] = gray;
      img.pixels[pixloc + 2] = gray;
      img.pixels[pixloc + 3] = 255; // Always have to set alpha
    }
  }
  img.updatePixels();
}

function weightedGray(img) {
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      // Calculate the 1D location from a 2D grid
      let loc = (x + y * img.width) * 4;
      // Get the R,G,B values from image
      let r, g, b;
      r = img.pixels[loc];
      g = img.pixels[loc + 1];
      b = img.pixels[loc + 2];
      //Constrain RGB to make sure they are within 0-255 color range
      r = constrain(r, 0, 255);
      g = constrain(g, 0, 255);
      b = constrain(b, 0, 255);
      // Make a new color and set pixel in the window
      let pixloc = (y * img.width + x) * 4;
      let gray = r * 0.299 + g * 0.587 + b * 0.114;
      img.pixels[pixloc] = gray;
      img.pixels[pixloc + 1] = gray;
      img.pixels[pixloc + 2] = gray;
      img.pixels[pixloc + 3] = 255; // Always have to set alpha
    }
  }
  img.updatePixels();
}
