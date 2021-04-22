## Ascii Art

> :Tabs
> > :Tab title=Ascii Art, icon=visibility
> > > :P5 sketch=/docs/sketches/workshops/imaging/imgAscii.js, width=770, height=455
>
> > :Tab title=Code, icon=code
> >
> > ```js | imgAscii.js
> > var MODE = 'PROD'
> > let pic;
> > let picLocation = '/vc/docs/sketches/lenna.png';
> > let asciiResults;
> > let filters = [
> >   (r, g, b, a) => r,                                 // red
> >   (r, g, b, a) => g,                                 // green
> >   (r, g, b, a) => b,                                 // blue
> >   (r, g, b, a) => a,                                 // gamma
> >   (r, g, b, a) => (r + g + b)/3,                     // gray
> >   (r, g, b, a) => (0.2989*r + 0.5870*g + 0.1140*b)/3 // luma
> > ]
> > // http://paulbourke.net/dataformats/asciiart/
> > let palettes = [
> >   [' ', '.', ':', '-', '=', '+', '*', '#'],
> >   ['$','@','B','%','8','&','W','#','*','o','a','h','k','b','d','p','m','Z','O','0','Q','L','C','J',> > 'U','Y','X','z','c','v','u','n','r','j','f','t','/','|','(',')','1','{','}','[',']','?','-','_','> > +','~','<','>','i','!','l',';',':',',','"','^','`','\'','.',' '].reverse()
> > ]
> > // Controls
> > let filSel;
> > let filter   = 0;
> > let palSel;
> > let palette  = 0;
> > let bucketsz = 32;
> > 
> > function preload() {
> >   if (MODE == 'LOCAL')
> >     picLocation = './image-ascii/lenna.png'
> >   pic = loadImage(picLocation);
> > }
> > 
> > function setup() {
> >   noLoop();
> >   addPaletteSelector();
> >   addChannelSelector();
> > }
> > 
> > function draw() {
> >   createCanvas(5000, 5000);
> >   textFont('monospace');
> >   applyAsciiFilter(pic);
> > }
> > 
> > function asciifilter(r, g, b, a) {
> >   // let avg = Math.floor((r + g + b)/3);
> >   let avg = filters[filter](r, g, b, a);
> >   let idx = Math.floor(avg/bucketsz);
> >   return palettes[palette][idx];
> > }
> > 
> > /**
> >  * Print to the global the given image converted to ascii art.
> >  * @param {Image} img 
> >  * @returns 
> >  */
> > function applyAsciiFilter(img) {
> >   img.loadPixels()
> >   pixY = 10;
> >   for (let y = 0; y < img.height; y++) {
> >     let out = ''
> >     for (let x = 0; x < img.width; x++) {
> >       let i = (x + y * img.width)*4;
> >       let char = asciifilter(img.pixels[i + 0], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i > > + 3]);
> >       out += char;
> >     }
> >     text(out, 10, pixY);
> >     pixY += 10;
> >   }
> > }
> > 
> > 
> > function addChannelSelector() {
> >   filSel = createSelect();
> >   filSel.position(100, 10);
> >   filSel.option('red',    0);
> >   filSel.option('green',  1);
> >   filSel.option('blue',   2);
> >   filSel.option('gamma',  3);
> >   filSel.option('grayavg',4);
> >   filSel.option('luma',   5);
> >   filSel.selected('red');
> >   filSel.changed(() => {
> >     filter = Number(filSel.value());
> >     redraw();
> >   })
> > }
> > 
> > function addPaletteSelector() {
> >   palSel = createSelect();
> >   palSel.position(40, 10);
> >   palSel.option('8bit',   0);
> >   palSel.option('64bit', 1);
> >   palSel.selected('8bit');
> >   palSel.changed(() => {
> >     palette = Number(palSel.value());
> >     if (palettes[palette].length == 8)
> >       bucketsz = 32;
> >     else 
> >       bucketsz = 4;
> >     redraw();
> >   })
> > }
> > ```
>
> > :Tab title= Document, icon=description
>> 
>>  ***Ascii Art*** 
>> 
>> El arte ASCII es una técnica de diseño gráfico que utiliza computadoras, este tuvo un auge bastante alto cuando se interactuaba con las terminal de los primeros sistemas operativos,
>> para la presentación y consta de imágenes ensambladas a partir de los 95 caracteres imprimibles definidos por el estándar ASCII de 1963 y conjuntos de caracteres compatibles con ASCII 
>> con caracteres extendidos patentados (más allá de los 128 caracteres de ASCII estándar de 7 bits). El término también se usa libremente para referirse al arte visual basado en texto en 
>> general. El arte ASCII se puede crear con cualquier editor de texto y, a menudo, se usa con lenguajes de forma libre. La mayoría de los ejemplos de arte ASCII requieren una fuente 
>> monoespaciada.
>>
>> El arte ASCII se inventó, en gran parte, porque las primeras impresoras a menudo carecían de capacidad gráfica y, por lo tanto, se usaban caracteres en lugar de marcas gráficas, para
>> marcar divisiones entre diferentes trabajos de impresión, haciendo que la división sea más fácil de detectar para que los resultados puedan ser separados más fácilmente por un operador 
>> de computadora o un empleado. El arte ASCII también se utilizó en los primeros correos electrónicos cuando las imágenes no se podían incrustar.
>>
>> El arte ASCII también es un descendiente de la poesía concreta y virtual y el llamado arte de la máquina de escribir: una técnica previa a la computadora para crear imágenes a partir de 
>> caracteres disponibles en máquinas de escribir (la primera pieza conocida de arte de máquina de escribir: una imagen de una mariposa compuesta de corchetes, guiones , barras y un 
>> asterisco, realizado por Flora Stacey, una secretaria británica, en 1898). Cualquier imagen puede ser analizada para convertirse en ascii art, en la mayoría de los ejemplos su uso es 
>> lúdico para conseguir las mejores combinaciones de caracteres y algoritmos para obtener un resultado de alta calidad.
>>
>> para el ejercicio desarrollado en el taller se utilizaron diferentes transformaciones (gamma, luma y promedio de grises), junto con promedios de cada uno de los canales RGB antes de 
>> hacer la conversión a ascii, además como reemplazo para crear él ascii art se usaron dos arreglos uno de 8 caracteres y otro de 64 caracteres.
>
## Conclusions

> :Tabs
> > :Tab title=conclusions, icon=description
> > >- Con el uso de ascii art y Photographic Mosaic se motiva al estudiante para profundizar en el manejo de la composición de píxeles y la búsqueda de elementos que la reemplacen obteniendo un resultado lo más parecido al original.
> > > 
> > >- en él ejerció de ascii art, observamos que tomando como base diferentes canales y variando la paleta de caracteres ,los resultados variaron notablemente.
> > >

> :ToCPrevNext