var vision = function (p) {
  let img; // Declarar variable 'img'.
  let imgPath1 = "/vc/docs/sketches/optical-illusions/Marcel/CrossEyeView.png";
  let imgPath2 = "/vc/docs/sketches/optical-illusions/Marcel/normal.png";
  let imgPath3 = "/vc/docs/sketches/optical-illusions/Marcel/ParallelView.png";
  let imgWidth = 780;
  let imgHeight = 439;

  p.preload = () => {
    img1 = p.loadImage(imgPath1); // Cargar la imagen
    img2 = p.loadImage(imgPath2); // Cargar la imagen
    img3 = p.loadImage(imgPath3); // Cargar la imagen
  };

  p.setup = () => {
    p.createCanvas(imgWidth, imgHeight + 15);
    p.pixelDensity(1);

    p.textSize(10);
    p.text("CrossEye View", 0, imgHeight + 10);
    p.text("Normal View", imgWidth/3, imgHeight + 10);
    p.text("Parallel View", (imgWidth/3)*2, imgHeight + 10);

    p.image(img1, 0, 0, imgWidth/3, imgHeight);
    p.image(img2, imgWidth/3, 0, imgWidth/3, imgHeight);
    p.image(img3, (imgWidth/3)*2, 0, imgWidth/3, imgHeight);
  };
}; //,"originalIMG");

var switchi = new p5(vision);
