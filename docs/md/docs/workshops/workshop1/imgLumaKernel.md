## Grayscales

Adapted from [here](https://p5js.org/es/examples/image-brightness.html).

> :Tabs
> > :Tab title=Image Grayscale, icon=visibility
> > > :P5 sketch=/docs/sketches/workshops/imaging/imgLuma.js, width=770, height=455
> >
> > Original(supIzq), luma(supDer), average(infIzq), weighted(infDer).
>
> > :Tab title=Code, icon=code
> >
> > ```js | imgLuma.js
> > let img; // Declarar variable 'img'.
> > let imgPath = "/vc/docs/sketches/Fire_breathing_2_Luc_Viatour.jpg";//Pokémon.jpg";
> > let imgWidth = 780;
> > let imgHeight = 439;
> > 
> > function preload() {
> >   srcimg = loadImage(imgPath); // Cargar la imagen
> >   dstimg = loadImage(imgPath); // Cargar la imagen
> > }
> > 
> > function setup() {
> >   createCanvas(imgWidth, imgHeight + 15);
> >   pixelDensity(1);
> >   image(dstimg, 0, 0, imgWidth / 2, imgHeight / 2);
> >   lumaGray(dstimg,srcimg);
> >   image(dstimg, width / 2, 0, imgWidth / 2, imgHeight / 2);
> >   averageGray(dstimg,srcimg);
> >   image(dstimg, 0, imgHeight / 2, imgWidth / 2, imgHeight / 2);
> >   weightedGray(dstimg,srcimg);
> >   image(dstimg, width / 2, imgHeight / 2, imgWidth / 2, imgHeight / 2);
> > }
> > 
> > function lumaGray(dstimg,srcimg) {
> >   srcimg.loadPixels();
> >   dstimg.loadPixels();
> >   for (let x = 0; x < srcimg.width; x++) {
> >     for (let y = 0; y < srcimg.height; y++) {
> >       // Calculate the 1D location from a 2D grid
> >       let loc = (x + y * srcimg.width) * 4;
> >       // Get the R,G,B values from image
> >       let r, g, b;
> >       r = srcimg.pixels[loc];
> >       g = srcimg.pixels[loc + 1];
> >       b = srcimg.pixels[loc + 2];
> >       //Constrain RGB to make sure they are within 0-255 color range
> >       r = constrain(r, 0, 255);
> >       g = constrain(g, 0, 255);
> >       b = constrain(b, 0, 255);
> >       // Make a new color and set pixel in the window
> >       let pixloc = (y * srcimg.width + x) * 4;
> >       let gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
> >       dstimg.pixels[pixloc] = gray;
> >       dstimg.pixels[pixloc + 1] = gray;
> >       dstimg.pixels[pixloc + 2] = gray;
> >       dstimg.pixels[pixloc + 3] = 255; // Always have to set alpha
> >     }
> >   }
> >   dstimg.updatePixels();
> > }
> > 
> > function averageGray(dstimg,srcimg) {
> >   srcimg.loadPixels();
> >   dstimg.loadPixels();
> >   for (let x = 0; x < srcimg.width; x++) {
> >     for (let y = 0; y < srcimg.height; y++) {
> >       // Calculate the 1D location from a 2D grid
> >       let loc = (x + y * srcimg.width) * 4;
> >       // Get the R,G,B values from image
> >       let r, g, b;
> >       r = srcimg.pixels[loc];
> >       g = srcimg.pixels[loc + 1];
> >       b = srcimg.pixels[loc + 2];
> >       //Constrain RGB to make sure they are within 0-255 color range
> >       r = constrain(r, 0, 255);
> >       g = constrain(g, 0, 255);
> >       b = constrain(b, 0, 255);
> >       // Make a new color and set pixel in the window
> >       let pixloc = (y * srcimg.width + x) * 4;
> >       let gray = (r + g + b) / 3;
> >       dstimg.pixels[pixloc] = gray;
> >       dstimg.pixels[pixloc + 1] = gray;
> >       dstimg.pixels[pixloc + 2] = gray;
> >       dstimg.pixels[pixloc + 3] = 255; // Always have to set alpha
> >     }
> >   }
> >   dstimg.updatePixels();
> > }
> > 
> > function weightedGray(dstimg,srcimg) {
> >   srcimg.loadPixels();
> >   dstimg.loadPixels();
> >   for (let x = 0; x < srcimg.width; x++) {
> >     for (let y = 0; y < srcimg.height; y++) {
> >       // Calculate the 1D location from a 2D grid
> >       let loc = (x + y * srcimg.width) * 4;
> >       // Get the R,G,B values from image
> >       let r, g, b;
> >       r = srcimg.pixels[loc];
> >       g = srcimg.pixels[loc + 1];
> >       b = srcimg.pixels[loc + 2];
> >       //Constrain RGB to make sure they are within 0-255 color range
> >       r = constrain(r, 0, 255);
> >       g = constrain(g, 0, 255);
> >       b = constrain(b, 0, 255);
> >       // Make a new color and set pixel in the window
> >       let pixloc = (y * srcimg.width + x) * 4;
> >       let gray = r * 0.299 + g * 0.587 + b * 0.114;
> >       dstimg.pixels[pixloc] = gray;
> >       dstimg.pixels[pixloc + 1] = gray;
> >       dstimg.pixels[pixloc + 2] = gray;
> >       dstimg.pixels[pixloc + 3] = 255; // Always have to set alpha
> >     }
> >   }
> >   dstimg.updatePixels();
> > }
> > ```
>
> > :Tab title=document, icon=description
> >
> > >Para cambiar la imagen a tonalidades de gris se tiene en cuenta la eficacia luminosa, esta es la medida de que tan bien una fuente de luz produce luz visible por el ojo humano para esto se crea una función de luminosidad que describe la sensibilidad promedio del ojo humano al brillo, esta se basa en juicios subjetivos que tienen que ver con cómo percibimos el color a través de los bastones, por lo tanto podríamos decir que cada ecuación que usamos es una función de luminosidad con diferentes parámetros. 
> > >
> > >Luma weighted gray = [\{R * 0.299 + G * 0.587 + B * 0.114}](:Formula) from matlab
> > >
> > >Esta se basa en la función rgb2gray de matlab Estos son los mismos pesos utilizados por la función rgb2ntsc para calcular el componente Y .
Los coeficientes utilizados para calcular los valores de escala de grises en rgb2gray son idénticos a los utilizados para calcular la luminancia (E'y) en REC. UIT-R BT. 601-7 después de redondearse a 3 posiciones decimales.
Rec. UIT-R BT. 601-7 calcula E'y utilizando la siguiente fórmula:
[\{R * 0.299 + G * 0.587 + B * 0.114}](:Formula)
> > >
> > >Luma Gray = [\{0.2126 * R + 0.7152 * G + 0.0722 * B}](:Formula)
> > >
> > >Esta es la misma fórmula que se utiliza en la conversión de Rec. 709 RGB a YCbCr para encontrar el componente Y, esta solo puede ser usada en espacios RBG 
> > >
> > >Average gray = [\{(R + G + B) / 3}](:Formula)
> > >
> > >Este se basa en el promedio de todos los canales de color RGB es el menos eficiente de los 3 ya que se pierde definicion en la imagen 
> > >


## Kernel Mask

Adapted from [here](https://idmnyu.github.io/p5.js-image/index.html);

> :Tabs
> > :Tab title=Kernel Mask, icon=visibility
> > > :P5 sketch=/docs/sketches/workshops/imaging/imgKernel.js, width=770, height=455
> >
> > Original(supIzq), edges original(supDer), edges soft(infIzq), edges grayscale(infDer).
>
> > :Tab title=Code, icon=code
> >
> > ```js | imgKernel.js
> > //https://idmnyu.github.io/p5.js-image/index.html
> > let srcimg, dstimg;
> > let imgPath = "/vc/docs/sketches/Pokémon.jpg";//lenna.png";budapest.jpg";
> > let imgWidth = 780;
> > let imgHeight = 439;
> > 
> > var blur = [
> >   [1, 1, 1],
> >   [1, 1, 1],
> >   [1, 1, 1],
> > ];
> > // Y-Direction Kernel
> > var edges0 = [
> >   [-1, -2, -1],
> >   [0, 0, 0],
> >   [1, 2, 1],
> > ];
> > // X-Direction Kernel
> > var edges1 = [
> >   [-1, 0, 1],
> >   [-2, 0, 2],
> >   [-1, 0, 1],
> > ];
> > var edges2 = [
> >   [-1, -1, -1],
> >   [-1, 9, -1],
> >   [-1, -1, -1],
> > ];
> > var boxBlur = [
> >   [1 / 9, 1 / 9, 1 / 9],
> >   [1 / 9, 1 / 9, 1 / 9],
> >   [1 / 9, 1 / 9, 1 / 9],
> > ];
> > var edges3 = [
> >   [-1, -1, -1],
> >   [-1, 8, -1],
> >   [-1, -1, -1],
> > ];
> > var sharpen = [
> >   [0, -1, 0],
> >   [-1, 5, -1],
> >   [0, -1, 0],
> > ];
> > 
> > function preload() {
> >   srcimg = loadImage(imgPath);
> >   dstimg = loadImage(imgPath);
> > }
> > 
> > function setup() {
> >   createCanvas(imgWidth, imgHeight);
> >   pixelDensity(1);
> >   image(dstimg, 0, 0, imgWidth / 2, imgHeight / 2);
> >   kernel1(srcimg, dstimg, edges1);
> >   image(dstimg, width / 2, 0, imgWidth / 2, imgHeight / 2);
> >   kernel1(srcimg, dstimg, edges2);
> >   image(dstimg, 0, height / 2, imgWidth / 2, imgHeight / 2);
> >   kernel2(srcimg, dstimg, edges1);
> >   image(dstimg, width / 2, height / 2, imgWidth / 2, imgHeight / 2);
> > }
> > 
> > function kernel1(srcimg, dstimg, k1) {
> >   srcimg.loadPixels();
> >   dstimg.loadPixels();
> >   var w = srcimg.width;
> >   var h = srcimg.height;
> >   for (var x = 0; x < w; x++) {
> >     for (var y = 0; y < h; y++) {
> >       // INDEX POSITION IN PIXEL LIST
> >       var ul = (((x - 1 + w) % w) + w * ((y - 1 + h) % h)) * 4; // location of the UPPER LEFT
> >       var uc = (((x - 0 + w) % w) + w * ((y - 1 + h) % h)) * 4; // location of the UPPER MID
> >       var ur = (((x + 1 + w) % w) + w * ((y - 1 + h) % h)) * 4; // location of the UPPER RIGHT
> >       var ml = (((x - 1 + w) % w) + w * ((y + 0 + h) % h)) * 4; // location of the LEFT
> >       var mc = (((x - 0 + w) % w) + w * ((y + 0 + h) % h)) * 4; // location of the CENTER PIXEL
> >       var mr = (((x + 1 + w) % w) + w * ((y + 0 + h) % h)) * 4; // location of the RIGHT
> >       var ll = (((x - 1 + w) % w) + w * ((y + 1 + h) % h)) * 4; // location of the LOWER LEFT
> >       var lc = (((x - 0 + w) % w) + w * ((y + 1 + h) % h)) * 4; // location of the LOWER MID
> >       var lr = (((x + 1 + w) % w) + w * ((y + 1 + h) % h)) * 4; // location of the LOWER RIGHT
> >       // red channel only
> >       var p0 = srcimg.pixels[ul] * k1[0][0]; // upper left
> >       var p1 = srcimg.pixels[uc] * k1[0][1]; // upper mid
> >       var p2 = srcimg.pixels[ur] * k1[0][2]; // upper right
> >       var p3 = srcimg.pixels[ml] * k1[1][0]; // left
> >       var p4 = srcimg.pixels[mc] * k1[1][1]; // center pixel
> >       var p5 = srcimg.pixels[mr] * k1[1][2]; // right
> >       var p6 = srcimg.pixels[ll] * k1[2][0]; // lower left
> >       var p7 = srcimg.pixels[lc] * k1[2][1]; // lower mid
> >       var p8 = srcimg.pixels[lr] * k1[2][2]; // lower right
> >       var r0 = p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
> >       // green channel only
> >       var p0 = srcimg.pixels[ul + 1] * k1[0][0]; // upper left
> >       var p1 = srcimg.pixels[uc + 1] * k1[0][1]; // upper mid
> >       var p2 = srcimg.pixels[ur + 1] * k1[0][2]; // upper right
> >       var p3 = srcimg.pixels[ml + 1] * k1[1][0]; // left
> >       var p4 = srcimg.pixels[mc + 1] * k1[1][1]; // center pixel
> >       var p5 = srcimg.pixels[mr + 1] * k1[1][2]; // right
> >       var p6 = srcimg.pixels[ll + 1] * k1[2][0]; // lower left
> >       var p7 = srcimg.pixels[lc + 1] * k1[2][1]; // lower mid
> >       var p8 = srcimg.pixels[lr + 1] * k1[2][2]; // lower right
> >       var r1 = p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
> >       // blue channel only
> >       var p0 = srcimg.pixels[ul + 2] * k1[0][0]; // upper left
> >       var p1 = srcimg.pixels[uc + 2] * k1[0][1]; // upper mid
> >       var p2 = srcimg.pixels[ur + 2] * k1[0][2]; // upper right
> >       var p3 = srcimg.pixels[ml + 2] * k1[1][0]; // left
> >       var p4 = srcimg.pixels[mc + 2] * k1[1][1]; // center pixel
> >       var p5 = srcimg.pixels[mr + 2] * k1[1][2]; // right
> >       var p6 = srcimg.pixels[ll + 2] * k1[2][0]; // lower left
> >       var p7 = srcimg.pixels[lc + 2] * k1[2][1]; // lower mid
> >       var p8 = srcimg.pixels[lr + 2] * k1[2][2]; // lower right
> >       var r2 = p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
> > 
> >       // constrein 0 to 255
> >       var resultR = constrain(r0, 0, 255);
> >       var resultG = constrain(r1, 0, 255);
> >       var resultB = constrain(r2, 0, 255);
> >       // write pixels into destination image:
> >       dstimg.pixels[mc] = resultR;
> >       dstimg.pixels[mc + 1] = resultG;
> >       dstimg.pixels[mc + 2] = resultB;
> >       dstimg.pixels[mc + 3] = 255;
> >     }
> >   }
> >   // update and display the pixel buffer
> >   dstimg.updatePixels();
> >   //image(dstimg, 0, 0, dstimg.width, dstimg.height);
> > }
> > 
> > function kernel2(srcimg, dstimg, k1) {
> >   srcimg.loadPixels();
> >   dstimg.loadPixels();
> >   var w = srcimg.width;
> >   var h = srcimg.height;
> >   for (var x = 0; x < w; x++) {
> >     for (var y = 0; y < h; y++) {
> >       // INDEX POSITION IN PIXEL LIST
> >       var ul = (((x - 1 + w) % w) + w * ((y - 1 + h) % h)) * 4; // location of the UPPER LEFT
> >       var uc = (((x - 0 + w) % w) + w * ((y - 1 + h) % h)) * 4; // location of the UPPER MID
> >       var ur = (((x + 1 + w) % w) + w * ((y - 1 + h) % h)) * 4; // location of the UPPER RIGHT
> >       var ml = (((x - 1 + w) % w) + w * ((y + 0 + h) % h)) * 4; // location of the LEFT
> >       var mc = (((x - 0 + w) % w) + w * ((y + 0 + h) % h)) * 4; // location of the CENTER PIXEL
> >       var mr = (((x + 1 + w) % w) + w * ((y + 0 + h) % h)) * 4; // location of the RIGHT
> >       var ll = (((x - 1 + w) % w) + w * ((y + 1 + h) % h)) * 4; // location of the LOWER LEFT
> >       var lc = (((x - 0 + w) % w) + w * ((y + 1 + h) % h)) * 4; // location of the LOWER MID
> >       var lr = (((x + 1 + w) % w) + w * ((y + 1 + h) % h)) * 4; // location of the LOWER RIGHT
> >       // red channel only
> >       var p0 = srcimg.pixels[ul] * k1[0][0]; // upper left
> >       var p1 = srcimg.pixels[uc] * k1[0][1]; // upper mid
> >       var p2 = srcimg.pixels[ur] * k1[0][2]; // upper right
> >       var p3 = srcimg.pixels[ml] * k1[1][0]; // left
> >       var p4 = srcimg.pixels[mc] * k1[1][1]; // center pixel
> >       var p5 = srcimg.pixels[mr] * k1[1][2]; // right
> >       var p6 = srcimg.pixels[ll] * k1[2][0]; // lower left
> >       var p7 = srcimg.pixels[lc] * k1[2][1]; // lower mid
> >       var p8 = srcimg.pixels[lr] * k1[2][2]; // lower right
> >       var r0 = p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
> >       // green channel only
> >       var p0 = srcimg.pixels[ul + 1] * k1[0][0]; // upper left
> >       var p1 = srcimg.pixels[uc + 1] * k1[0][1]; // upper mid
> >       var p2 = srcimg.pixels[ur + 1] * k1[0][2]; // upper right
> >       var p3 = srcimg.pixels[ml + 1] * k1[1][0]; // left
> >       var p4 = srcimg.pixels[mc + 1] * k1[1][1]; // center pixel
> >       var p5 = srcimg.pixels[mr + 1] * k1[1][2]; // right
> >       var p6 = srcimg.pixels[ll + 1] * k1[2][0]; // lower left
> >       var p7 = srcimg.pixels[lc + 1] * k1[2][1]; // lower mid
> >       var p8 = srcimg.pixels[lr + 1] * k1[2][2]; // lower right
> >       var r1 = p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
> >       // blue channel only
> >       var p0 = srcimg.pixels[ul + 2] * k1[0][0]; // upper left
> >       var p1 = srcimg.pixels[uc + 2] * k1[0][1]; // upper mid
> >       var p2 = srcimg.pixels[ur + 2] * k1[0][2]; // upper right
> >       var p3 = srcimg.pixels[ml + 2] * k1[1][0]; // left
> >       var p4 = srcimg.pixels[mc + 2] * k1[1][1]; // center pixel
> >       var p5 = srcimg.pixels[mr + 2] * k1[1][2]; // right
> >       var p6 = srcimg.pixels[ll + 2] * k1[2][0]; // lower left
> >       var p7 = srcimg.pixels[lc + 2] * k1[2][1]; // lower mid
> >       var p8 = srcimg.pixels[lr + 2] * k1[2][2]; // lower right
> >       var r2 = p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
> > 
> >       // -1000 is the minimum value the sum could result in and 1000 is the maximum
> >       var resultR = map(r0, -1000, 1000, 0, 255);
> >       var resultG = map(r1, -1000, 1000, 0, 255);
> >       var resultB = map(r2, -1000, 1000, 0, 255);
> >       // constrein 0 to 255
> >       //var resultR = constrain(r0, 0, 255);
> >       //var resultG = constrain(r1, 0, 255);
> >       //var resultB = constrain(r2, 0, 255);
> >       // write pixels into destination image:
> >       let gray = 0.2126 * resultR + 0.7152 * resultG + 0.0722 * resultB;
> >       dstimg.pixels[mc] = gray;
> >       dstimg.pixels[mc + 1] = gray;
> >       dstimg.pixels[mc + 2] = gray;
> >       dstimg.pixels[mc + 3] = 255;
> >     }
> >   }
> >   // update and display the pixel buffer
> >   dstimg.updatePixels();
> >   //image(dstimg, 0, 0, dstimg.width, dstimg.height);
> > }
> > ```
>
> > :Tab title=document, icon=description
> >
> > >Se implementó una técnica de detección de bordes con una implementación de kernel convolution, esto se hace comparando los cambios bruscos en el brillo de la imagen es decir comparando el valor de cada pixel del lado derecho e izquierdo (dirección x) y del lado superior e inferior (dirección y) y usamos un kernel de 3x3 para cada dirección. estos cambios de intensidad de luz es la gradiente del borde que se pueden medir mediante la siguiente fórmula: [\{|G| = sqrt((Gx*Gx) + (Gy*Gy))}](:Formula)  
donde Gx es el gradiente en la dirección x y Gy el gradiente en la dirección y.
> > > 
> > >El kernel de dirección x calcula los borde en posición vertical por esto lleva números negativos al lado izquierdo y positivos al derecho, así mismo el kernel en dirección y calcula   los bordes en posición horizontal y lleva número negativos arriba y positivos abajo
> > > 



## Instance mode

> :Tabs
> > :Tab title=Instance Mode, icon=visibility
> >
> > Original, negative, weighted graysacle. Clik on the image to switch it.
> >
> > > :P5 sketch=/docs/sketches/workshops/imaging/imgInstanceMode.js, width=770, height=455
>
> > :Tab title=Code, icon=code
> >
> > ```js | imgInstanceMode.js
> > //var original = new p5((p)=>{
> > var original = function(p){
> >   let img; // Declarar variable 'img'.
> >   let imgPath = "/vc/docs/sketches/Pokémon.jpg";
> >   let imgWidth = 780;
> >   let imgHeight = 439;
> > 
> >   p.preload = () => {
> >     img = p.loadImage(imgPath); // Cargar la imagen
> >   };
> > 
> >   p.setup = () => {
> >     p.createCanvas(imgWidth, imgHeight+15);
> >     p.pixelDensity(1);
> > 
> >     p.textSize(10);
> >     p.text('Original', 0, imgHeight+10);
> > 
> >     p.image(img, 0, 0, imgWidth, imgHeight);
> >     // Only need to load the pixels[] array once, because we're only
> >     // manipulating pixels[] inside draw(), not drawing shapes.
> >     p.loadPixels();
> >     // We must also call loadPixels() on the PImage since we are going to read its pixels.
> >     //img.loadPixels();
> >     for (let x = 0; x < img.width; x++) {
> >       for (let y = 0; y < img.height; y++) {
> >         // Calculate the 1D location from a 2D grid
> >         let loc = (x + y * img.width) * 4;
> >         // Get the R,G,B values from image
> >         let r, g, b;
> >         r = p.pixels[loc];
> >         g = p.pixels[loc + 1];
> >         b = p.pixels[loc + 2];
> >         //Constrain RGB to make sure they are within 0-255 color range
> >         r = p.constrain(r, 0, 255);
> >         g = p.constrain(g, 0, 255);
> >         b = p.constrain(b, 0, 255);
> >         // Make a new color and set pixel in the window
> >         //mathlab grises Y = R*0.3+G*0.59+B*0.11
> >         let pixloc = (y * img.width + x) * 4;
> >         p.pixels[pixloc] = r;
> >         p.pixels[pixloc + 1] = g;
> >         p.pixels[pixloc + 2] = b;
> >         p.pixels[pixloc + 3] = 255; // Always have to set alpha transparencias
> >       }
> >     }
> >     p.updatePixels(0,0,imgWidth, imgHeight);
> >   }
> >   p.mouseReleased = function() {
> >     switchi.remove();
> >     switchi = new p5(negativo);    
> >   }
> > }//,"originalIMG");
> > 
> > //var negativo = new p5((p)=>{
> > var negativo = function(p){
> >   let img; // Declarar variable 'img'.
> >   let imgPath = "/vc/docs/sketches/Pokémon.jpg";
> >   let imgWidth = 780;
> >   let imgHeight = 439;
> > 
> >   p.preload = () => {
> >     img = p.loadImage(imgPath); // Cargar la imagen
> >   };
> > 
> >   p.setup = () => {
> >     p.createCanvas(imgWidth, imgHeight+15);
> >     p.pixelDensity(1);
> > 
> >     p.textSize(10);
> >     p.text('Negative', 0, imgHeight+10);
> > 
> >     p.image(img, 0, 0, imgWidth, imgHeight);
> >     // Only need to load the pixels[] array once, because we're only
> >     // manipulating pixels[] inside draw(), not drawing shapes.
> >     p.loadPixels();
> >     // We must also call loadPixels() on the PImage since we are going to read its pixels.
> >     //img.loadPixels();
> >     for (let x = 0; x < img.width; x++) {
> >       for (let y = 0; y < img.height; y++) {
> >         // Calculate the 1D location from a 2D grid
> >         let loc = (x + y * img.width) * 4;
> >         // Get the R,G,B values from image
> >         let r, g, b;
> >         r = p.pixels[loc];
> >         g = p.pixels[loc + 1];
> >         b = p.pixels[loc + 2];
> >         //Constrain RGB to make sure they are within 0-255 color range
> >         r = p.constrain(r, 0, 255);
> >         g = p.constrain(g, 0, 255);
> >         b = p.constrain(b, 0, 255);
> >         // Make a new color and set pixel in the window
> >         //mathlab grises Y = R*0.3+G*0.59+B*0.11
> >         let pixloc = (y * img.width + x) * 4;
> >         p.pixels[pixloc] = 255-r;
> >         p.pixels[pixloc + 1] = 255-g;
> >         p.pixels[pixloc + 2] = 255-b;
> >         p.pixels[pixloc + 3] = 255; // Always have to set alpha
> >       }
> >     }
> >     p.updatePixels(0,0,imgWidth, imgHeight);
> >   }
> >   p.mouseReleased = function() {
> >     switchi.remove();
> >     switchi = new p5(blackAndWhite);    
> >   }
> > }//,"originalIMG");
> > 
> > //var blackAndWhite = new p5((p)=>{
> > var blackAndWhite = function(p){
> >   let img; // Declarar variable 'img'.
> >   let imgPath = "/vc/docs/sketches/Pokémon.jpg";
> >   let imgWidth = 780;
> >   let imgHeight = 439;
> > 
> >   p.preload = () => {
> >     img = p.loadImage(imgPath); // Cargar la imagen
> >   };
> > 
> >   p.setup = () => {
> >     p.createCanvas(imgWidth, imgHeight+15);
> >     p.pixelDensity(1);
> > 
> >     p.textSize(10);
> >     p.text('Gray scale', 0, imgHeight+10);
> > 
> >     p.image(img, 0, 0, imgWidth, imgHeight);
> >     // Only need to load the pixels[] array once, because we're only
> >     // manipulating pixels[] inside draw(), not drawing shapes.
> >     p.loadPixels();
> >     // We must also call loadPixels() on the PImage since we are going to read its pixels.
> >     //img.loadPixels();
> >     for (let x = 0; x < img.width; x++) {
> >       for (let y = 0; y < img.height; y++) {
> >         // Calculate the 1D location from a 2D grid
> >         let loc = (x + y * img.width) * 4;
> >         // Get the R,G,B values from image
> >         let r, g, b;
> >         r = p.pixels[loc];
> >         g = p.pixels[loc + 1];
> >         b = p.pixels[loc + 2];
> >         //Constrain RGB to make sure they are within 0-255 color range
> >         r = p.constrain(r, 0, 255);
> >         g = p.constrain(g, 0, 255);
> >         b = p.constrain(b, 0, 255);
> >         // Make a new color and set pixel in the window
> >         //mathlab grises Y = R*0.3+G*0.59+B*0.11
> >         let pixloc = (y * img.width + x) * 4;
> >         let gray = r*0.299+g*0.587+b*0.114;
> >         p.pixels[pixloc] = gray;
> >         p.pixels[pixloc + 1] = gray;
> >         p.pixels[pixloc + 2] = gray;
> >         p.pixels[pixloc + 3] = 255; // Always have to set alpha
> >       }
> >     }
> >     p.updatePixels(0,0,imgWidth, imgHeight);
> >   }
> >   p.mouseReleased = function() {
> >     switchi.remove();
> >     switchi = new p5(original);    
> >   }
> > }//,"originalIMG");
> > 
> > var switchi = new p5(original);
> > ```

> :ToCPrevNext