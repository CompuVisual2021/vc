let fingers;
let imgWidth = 780;
let imgHeight = 439;

var blur = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
];
// Y-Direction Kernel
var edges0 = [
  [-1, -2, -1],
  [0, 0, 0],
  [1, 2, 1],
];
// X-Direction Kernel
var edges1 = [
  [-1, 0, 1],
  [-2, 0, 2],
  [-1, 0, 1],
];
var edges2 = [
  [-1, -1, -1],
  [-1, 9, -1],
  [-1, -1, -1],
];
var boxBlur = [
  [1 / 9, 1 / 9, 1 / 9],
  [1 / 9, 1 / 9, 1 / 9],
  [1 / 9, 1 / 9, 1 / 9],
];
var edges3 = [
  [-1, -1, -1],
  [-1, 8, -1],
  [-1, -1, -1],
];
var sharpen = [
  [0, -1, 0],
  [-1, 5, -1],
  [0, -1, 0],
];

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
  /*capture = createCapture(VIDEO); // this opens the digitizer
  capture.size(640, 480);
  capture.hide();*/
  //themask = createImage(imgWidth, imgHeight);
}

function draw() {
  //capimg = capture.get();
  capimg = fingers1.get();
  themask = createImage(capimg.width, capimg.height);
  image(fingers1, 0, 0, width / 2, height / 2); // draw the video frame to canvas
  kernel1(fingers2, themask, edges1);
  image(themask, width / 2, 0, width / 2, height / 2);
  kernel1(fingers3, themask, edges2);
  image(themask, 0, height / 2, width / 2, height / 2);
  kernel2(fingers4,themask,edges1);
  image(themask, width/2,height/2, width/2,height/2);
}

function mousePressed() {
  fingers1.loop(); // set the video to loop and start playing
  fingers2.loop();
  fingers3.loop();
  fingers4.loop();
}

function kernel1(srcimg, dstimg, k1) {
  srcimg.loadPixels();
  dstimg.loadPixels();
  var w = srcimg.width;
  var h = srcimg.height;
  for (var x = 0; x < w; x++) {
    for (var y = 0; y < h; y++) {
      // INDEX POSITION IN PIXEL LIST
      var ul = (((x - 1 + w) % w) + w * ((y - 1 + h) % h)) * 4; // location of the UPPER LEFT
      var uc = (((x - 0 + w) % w) + w * ((y - 1 + h) % h)) * 4; // location of the UPPER MID
      var ur = (((x + 1 + w) % w) + w * ((y - 1 + h) % h)) * 4; // location of the UPPER RIGHT
      var ml = (((x - 1 + w) % w) + w * ((y + 0 + h) % h)) * 4; // location of the LEFT
      var mc = (((x - 0 + w) % w) + w * ((y + 0 + h) % h)) * 4; // location of the CENTER PIXEL
      var mr = (((x + 1 + w) % w) + w * ((y + 0 + h) % h)) * 4; // location of the RIGHT
      var ll = (((x - 1 + w) % w) + w * ((y + 1 + h) % h)) * 4; // location of the LOWER LEFT
      var lc = (((x - 0 + w) % w) + w * ((y + 1 + h) % h)) * 4; // location of the LOWER MID
      var lr = (((x + 1 + w) % w) + w * ((y + 1 + h) % h)) * 4; // location of the LOWER RIGHT
      // red channel only
      var p0 = srcimg.pixels[ul] * k1[0][0]; // upper left
      var p1 = srcimg.pixels[uc] * k1[0][1]; // upper mid
      var p2 = srcimg.pixels[ur] * k1[0][2]; // upper right
      var p3 = srcimg.pixels[ml] * k1[1][0]; // left
      var p4 = srcimg.pixels[mc] * k1[1][1]; // center pixel
      var p5 = srcimg.pixels[mr] * k1[1][2]; // right
      var p6 = srcimg.pixels[ll] * k1[2][0]; // lower left
      var p7 = srcimg.pixels[lc] * k1[2][1]; // lower mid
      var p8 = srcimg.pixels[lr] * k1[2][2]; // lower right
      var r0 = p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
      // green channel only
      var p0 = srcimg.pixels[ul + 1] * k1[0][0]; // upper left
      var p1 = srcimg.pixels[uc + 1] * k1[0][1]; // upper mid
      var p2 = srcimg.pixels[ur + 1] * k1[0][2]; // upper right
      var p3 = srcimg.pixels[ml + 1] * k1[1][0]; // left
      var p4 = srcimg.pixels[mc + 1] * k1[1][1]; // center pixel
      var p5 = srcimg.pixels[mr + 1] * k1[1][2]; // right
      var p6 = srcimg.pixels[ll + 1] * k1[2][0]; // lower left
      var p7 = srcimg.pixels[lc + 1] * k1[2][1]; // lower mid
      var p8 = srcimg.pixels[lr + 1] * k1[2][2]; // lower right
      var r1 = p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
      // blue channel only
      var p0 = srcimg.pixels[ul + 2] * k1[0][0]; // upper left
      var p1 = srcimg.pixels[uc + 2] * k1[0][1]; // upper mid
      var p2 = srcimg.pixels[ur + 2] * k1[0][2]; // upper right
      var p3 = srcimg.pixels[ml + 2] * k1[1][0]; // left
      var p4 = srcimg.pixels[mc + 2] * k1[1][1]; // center pixel
      var p5 = srcimg.pixels[mr + 2] * k1[1][2]; // right
      var p6 = srcimg.pixels[ll + 2] * k1[2][0]; // lower left
      var p7 = srcimg.pixels[lc + 2] * k1[2][1]; // lower mid
      var p8 = srcimg.pixels[lr + 2] * k1[2][2]; // lower right
      var r2 = p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;

      // constrein 0 to 255
      var resultR = constrain(r0, 0, 255);
      var resultG = constrain(r1, 0, 255);
      var resultB = constrain(r2, 0, 255);
      // write pixels into destination image:
      dstimg.pixels[mc] = resultR;
      dstimg.pixels[mc + 1] = resultG;
      dstimg.pixels[mc + 2] = resultB;
      dstimg.pixels[mc + 3] = 255;
    }
  }
  // update and display the pixel buffer
  dstimg.updatePixels();
  //image(dstimg, 0, 0, dstimg.width, dstimg.height);
}

function kernel2(srcimg, dstimg, k1) {
  srcimg.loadPixels();
  dstimg.loadPixels();
  var w = srcimg.width;
  var h = srcimg.height;
  for (var x = 0; x < w; x++) {
    for (var y = 0; y < h; y++) {
      // INDEX POSITION IN PIXEL LIST
      var ul = (((x - 1 + w) % w) + w * ((y - 1 + h) % h)) * 4; // location of the UPPER LEFT
      var uc = (((x - 0 + w) % w) + w * ((y - 1 + h) % h)) * 4; // location of the UPPER MID
      var ur = (((x + 1 + w) % w) + w * ((y - 1 + h) % h)) * 4; // location of the UPPER RIGHT
      var ml = (((x - 1 + w) % w) + w * ((y + 0 + h) % h)) * 4; // location of the LEFT
      var mc = (((x - 0 + w) % w) + w * ((y + 0 + h) % h)) * 4; // location of the CENTER PIXEL
      var mr = (((x + 1 + w) % w) + w * ((y + 0 + h) % h)) * 4; // location of the RIGHT
      var ll = (((x - 1 + w) % w) + w * ((y + 1 + h) % h)) * 4; // location of the LOWER LEFT
      var lc = (((x - 0 + w) % w) + w * ((y + 1 + h) % h)) * 4; // location of the LOWER MID
      var lr = (((x + 1 + w) % w) + w * ((y + 1 + h) % h)) * 4; // location of the LOWER RIGHT
      // red channel only
      var p0 = srcimg.pixels[ul] * k1[0][0]; // upper left
      var p1 = srcimg.pixels[uc] * k1[0][1]; // upper mid
      var p2 = srcimg.pixels[ur] * k1[0][2]; // upper right
      var p3 = srcimg.pixels[ml] * k1[1][0]; // left
      var p4 = srcimg.pixels[mc] * k1[1][1]; // center pixel
      var p5 = srcimg.pixels[mr] * k1[1][2]; // right
      var p6 = srcimg.pixels[ll] * k1[2][0]; // lower left
      var p7 = srcimg.pixels[lc] * k1[2][1]; // lower mid
      var p8 = srcimg.pixels[lr] * k1[2][2]; // lower right
      var r0 = p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
      // green channel only
      var p0 = srcimg.pixels[ul + 1] * k1[0][0]; // upper left
      var p1 = srcimg.pixels[uc + 1] * k1[0][1]; // upper mid
      var p2 = srcimg.pixels[ur + 1] * k1[0][2]; // upper right
      var p3 = srcimg.pixels[ml + 1] * k1[1][0]; // left
      var p4 = srcimg.pixels[mc + 1] * k1[1][1]; // center pixel
      var p5 = srcimg.pixels[mr + 1] * k1[1][2]; // right
      var p6 = srcimg.pixels[ll + 1] * k1[2][0]; // lower left
      var p7 = srcimg.pixels[lc + 1] * k1[2][1]; // lower mid
      var p8 = srcimg.pixels[lr + 1] * k1[2][2]; // lower right
      var r1 = p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
      // blue channel only
      var p0 = srcimg.pixels[ul + 2] * k1[0][0]; // upper left
      var p1 = srcimg.pixels[uc + 2] * k1[0][1]; // upper mid
      var p2 = srcimg.pixels[ur + 2] * k1[0][2]; // upper right
      var p3 = srcimg.pixels[ml + 2] * k1[1][0]; // left
      var p4 = srcimg.pixels[mc + 2] * k1[1][1]; // center pixel
      var p5 = srcimg.pixels[mr + 2] * k1[1][2]; // right
      var p6 = srcimg.pixels[ll + 2] * k1[2][0]; // lower left
      var p7 = srcimg.pixels[lc + 2] * k1[2][1]; // lower mid
      var p8 = srcimg.pixels[lr + 2] * k1[2][2]; // lower right
      var r2 = p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;

      // -1000 is the minimum value the sum could result in and 1000 is the maximum
      var resultR = map(r0, -1000, 1000, 0, 255);
      var resultG = map(r1, -1000, 1000, 0, 255);
      var resultB = map(r2, -1000, 1000, 0, 255);
      // constrein 0 to 255
      //var resultR = constrain(r0, 0, 255);
      //var resultG = constrain(r1, 0, 255);
      //var resultB = constrain(r2, 0, 255);
      // write pixels into destination image:
      let gray = 0.2126 * resultR + 0.7152 * resultG + 0.0722 * resultB;
      dstimg.pixels[mc] = gray;
      dstimg.pixels[mc + 1] = gray;
      dstimg.pixels[mc + 2] = gray;
      dstimg.pixels[mc + 3] = 255;
    }
  }
  // update and display the pixel buffer
  dstimg.updatePixels();
  //image(dstimg, 0, 0, dstimg.width, dstimg.height);
}
