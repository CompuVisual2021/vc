var sideBySide = function (p) {
  let img; // Declarar variable 'img'.
  let imgPath = "/vc/docs/sketches/optical-illusions/Marcel/stereopsis.jpg";
  let imgWidth = 780;
  let imgHeight = 439;

  p.preload = () => {
    img = p.loadImage(imgPath); // Cargar la imagen
  };

  p.setup = () => {
    p.createCanvas(imgWidth, imgHeight + 15);
    p.pixelDensity(1);

    p.textSize(10);
    p.text("Side By Side (CrossEye View)", 0, imgHeight + 10);

    p.image(img, 0, 0, imgWidth, imgHeight);
  };
  p.mouseReleased = function () {
    switchi.remove();
    switchi = new p5(wallpaper);
  };
}; //,"originalIMG");

var wallpaper = function (p) {
  let img; // Declarar variable 'img'.
  let imgPath =
    "/vc/docs/sketches/optical-illusions/Marcel/autostereogramMarisopla.png";
  let imgWidth = 780;
  let imgHeight = 439;

  p.preload = () => {
    img = p.loadImage(imgPath); // Cargar la imagen
  };

  p.setup = () => {
    p.createCanvas(imgWidth, imgHeight + 15);
    p.pixelDensity(1);

    p.textSize(10);
    p.text("Wallpaper (Parallel View), ", 0, imgHeight + 10);

    p.image(img, 0, 0, imgWidth, imgHeight);
  };
  p.mouseReleased = function () {
    switchi.remove();
    switchi = new p5(wallpaperSolved);
  };
}; //,"originalIMG");

var wallpaperSolved = function (p) {
  let img; // Declarar variable 'img'.
  let imgPath =
    "/vc/docs/sketches/optical-illusions/Marcel/autostereogramMarisoplasolved.png";
  let imgWidth = 780;
  let imgHeight = 439;

  p.preload = () => {
    img = p.loadImage(imgPath); // Cargar la imagen
  };

  p.setup = () => {
    p.createCanvas(imgWidth, imgHeight + 15);
    p.pixelDensity(1);

    p.textSize(10);
    p.text("Wallpaper solved (Parallel View), ", 0, imgHeight + 10);

    p.image(img, 0, 0, imgWidth, imgHeight);
  };
  p.mouseReleased = function () {
    switchi.remove();
    switchi = new p5(randomDot);
  };
}; //,"originalIMG");

var randomDot = function (p) {
  let img; // Declarar variable 'img'.
  let imgPath =
    "/vc/docs/sketches/optical-illusions/Marcel/Stereogram_Tut_Random_Dot_Shark.png";
  let imgWidth = 780;
  let imgHeight = 439;

  p.preload = () => {
    img = p.loadImage(imgPath); // Cargar la imagen
  };

  p.setup = () => {
    p.createCanvas(imgWidth, imgHeight + 15);
    p.pixelDensity(1);

    p.textSize(10);
    p.text("Random Dot (Parallel View)", 0, imgHeight + 10);

    p.image(img, 0, 0, imgWidth, imgHeight);
  };
  p.mouseReleased = function () {
    switchi.remove();
    switchi = new p5(randomDotSolved);
  };
}; //,"originalIMG");

var randomDotSolved = function (p) {
  let img; // Declarar variable 'img'.
  let imgPath =
    "/vc/docs/sketches/optical-illusions/Marcel/Stereogram_Tut_Random_Dot_SharkSolved.png";
  let imgWidth = 780;
  let imgHeight = 439;

  p.preload = () => {
    img = p.loadImage(imgPath); // Cargar la imagen
  };

  p.setup = () => {
    p.createCanvas(imgWidth, imgHeight + 15);
    p.pixelDensity(1);

    p.textSize(10);
    p.text("Random Dot solved (Parallel View)", 0, imgHeight + 10);

    p.image(img, 0, 0, imgWidth, imgHeight);
  };
  p.mouseReleased = function () {
    switchi.remove();
    switchi = new p5(otros);
  };
}; //,"originalIMG");

var otros = function (p) {
  let img; // Declarar variable 'img'.
  let imgPath = "/vc/docs/sketches/optical-illusions/Marcel/aladin.jpg";
  let imgWidth = 780;
  let imgHeight = 439;

  p.preload = () => {
    img = p.loadImage(imgPath); // Cargar la imagen
  };

  p.setup = () => {
    p.createCanvas(imgWidth, imgHeight + 15);
    p.pixelDensity(1);

    p.textSize(10);
    p.text("(Parallel View)", 0, imgHeight + 10);

    p.image(img, 0, 0, imgWidth, imgHeight);
  };
  p.mouseReleased = function () {
    switchi.remove();
    switchi = new p5(otrosSolved);
  };
}; //,"originalIMG");

var otrosSolved = function (p) {
  let img; // Declarar variable 'img'.
  let imgPath = "/vc/docs/sketches/optical-illusions/Marcel/aladinsolved.jpg";
  let imgWidth = 780;
  let imgHeight = 439;

  p.preload = () => {
    img = p.loadImage(imgPath); // Cargar la imagen
  };

  p.setup = () => {
    p.createCanvas(imgWidth, imgHeight + 15);
    p.pixelDensity(1);

    p.textSize(10);
    p.text("solved (Parallel View)", 0, imgHeight + 10);

    p.image(img, 0, 0, imgWidth, imgHeight);
  };
  p.mouseReleased = function () {
    switchi.remove();
    switchi = new p5(sideBySide);
  };
}; //,"originalIMG");

var switchi = new p5(sideBySide);
