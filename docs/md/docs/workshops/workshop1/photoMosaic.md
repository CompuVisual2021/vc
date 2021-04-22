## Photographic Mosaic

> :Tabs
> > :Tab title=Photographic Mosaic, icon=visibility
> > > :P5 sketch=/docs/sketches/workshops/imaging/imgPhotoMosaic.js, width=770, height=455
>
> > :Tab title=Code, icon=code
> >
> > ```js | imgPhotoMosaic.js
> > var MODE = 'PROD'
> > // Pictures
> > let pics = [[], [], []];
> > let averages = [];
> > let picLocRegex = '/vc/docs/sketches/workshops/imaging/palette&/?.png';
> > let bigPictureLoc = '/vc/docs/sketches/workshops/imaging/bigpicture.jpg';
> > var paletteSize = 16;
> > // Controls
> > var palSel;
> > var palette = 0;
> > var tilSel;
> > var tileSize = 100;
> > var checkbox;
> > var showAvg = false;
> > 
> > function preload() {
> >   if (MODE == 'LOCAL') {
> >     bigPictureLoc = './image-mosaic/bigpicture.jpg';
> >     picLocRegex = './image-mosaic/palette&/?.png';
> >   }
> >   
> >   bigPicture = loadImage(bigPictureLoc);
> >   for(i = 0; i < 3; i++) {
> >     // load palettes
> >     let folder = picLocRegex.replace('&', i);
> >     for (j = 0; j < paletteSize; j++) {
> >       // load picture from each palette
> >       pic = loadImage(folder.replace('?', j));
> >       pics[i].push(pic);
> >     }
> >   }
> > }
> > 
> > function setup() {
> >   noLoop();
> >   addCheckbox();
> >   addPaletteSelector();
> >   addTileSizeSelector();
> > 
> > }
> > 
> > function draw() {
> >   createCanvas(bigPicture.width, bigPicture.height);
> >   bigPicture.resize(1000, 1000);
> > 
> >   let beg = performance.now()
> >   storePics();
> >   showMosaic();
> >   let end = performance.now()
> >   console.log(end - beg);
> > }
> > 
> > function showMosaic() {
> >   for (let y = 0; y < bigPicture.height; y = y + tileSize) {
> >     for (let x = 0; x < bigPicture.width; x = x + tileSize) {
> >       let tile = bigPicture.get(x, y, tileSize - 1, tileSize - 1);
> >       [r, g, b] = getAverageColor(tile);
> >       let i = getSimilarColor(r, g, b);
> >       if (showAvg) {
> >         let c = color(r, g, b);
> >         fill(c)
> >         square(x, y, tileSize);  
> >       } else {
> >         image(pics[palette][i], x, y);
> >       }
> >     }
> >   }
> > }
> > 
> > function getSimilarColor(r, g, b) {
> >   let w1 = [0.30, 0.59, 0.11];
> >   let w2 = [0.00, 0.00, 0.99];
> >   let w3 = [0.30, 0.70, 0.00];
> >   let idx = 0;
> >   let ans = -1;
> >   let min = Math.min();
> >   for (avg of averages) {
> >     let d =  (avg[0] - r)*(avg[0] - r)
> >            + (avg[1] - g)*(avg[1] - g)
> >            + (avg[2] - b)*(avg[2] - b);
> >     if (d < min) {
> >       min = d;
> >       ans = idx;
> >     }
> >     idx++;
> >   }
> >   return ans;
> > }
> > 
> > function storePics() {
> >   averages = []
> >   for (pic of pics[palette]) {
> >     pic.resize(tileSize, tileSize);
> >     averages.push(getAverageColor(pic))
> >   }
> > }
> > 
> > function getAverageColor(pic) {
> >   pic.loadPixels()
> >   let r = 0;
> >   let g = 0;
> >   let b = 0;
> >   let n = 0;
> >   for (let y = 0; y < pic.height; y++) {
> >     for (let x = 0; x < pic.width; x++) {
> >       let i = (x + y * pic.width)*4;
> >       r += pic.pixels[i + 0];
> >       g += pic.pixels[i + 1];
> >       b += pic.pixels[i + 2];
> >       n++;
> >     }
> >   }
> >   return [r/n, g/n, b/n];
> > }
> > 
> > function addCheckbox() {
> >   checkbox = createCheckbox('show average');
> >   checkbox.position(10, 10);
> >   checkbox.changed(() => {
> >     showAvg = !showAvg;
> >     redraw();
> >   });
> > }
> > 
> > function addPaletteSelector() {
> >   palSel = createSelect();
> >   palSel.position(40, 10);
> >   palSel.option('nature', 0);
> >   palSel.option('chips', 1);
> >   palSel.option('color', 2);
> >   palSel.selected('nature');
> >   palSel.changed(() => {
> >     showAvg = false;
> >     palette = palSel.value();
> >     redraw();
> >   })
> > }
> > 
> > function addTileSizeSelector() {
> >   tilSel = createSelect();
> >   tilSel.position(120, 10);
> >   tilSel.option(5);
> >   tilSel.option(10);
> >   tilSel.option(20);
> >   tilSel.option(30);
> >   tilSel.option(40);
> >   tilSel.option(50);
> >   tilSel.option(80);
> >   tilSel.option(100);
> >   tilSel.selected(100);
> >   tilSel.changed(() => {
> >     tileSize = Number(tilSel.value());
> >     redraw();
> >   })
> > }
> > ```
>
> > :Tab title= Document, icon=description
>> 
>>  ***Photographic Mosaic*** 
>> 
>> un mosaico fotográfico, también conocido con el término Fotomosaico (un acrónimo de foto y mosaico), es una imagen (generalmente una fotografía) que se ha dividido en secciones de 
>> mosaicos (generalmente de igual tamaño), cada una de las cuales se reemplaza con otra fotografía que coincide con la foto de original. Cuando se ve con aumentos bajos, los píxeles 
>> individuales aparecen como la imagen principal, mientras que un examen más detenido revela que la imagen está compuesta de muchos cientos o miles de imágenes más pequeñas. La mayoría de 
>> las veces son un tipo de montaje creado por computadora.
>> 
>> Hay dos tipos de mosaicos, dependiendo de cómo se haga la combinación. En el tipo más simple, cada parte de la imagen de destino se promedia hasta un solo color. Cada una de las 
>> imágenes de la biblioteca también se reduce a un solo color. Luego, cada parte de la imagen de destino se reemplaza por una de la biblioteca donde estos colores son lo más similares 
>> posible. En efecto, la resolución de la imagen de destino se reduce (reduciendo la resolución), y luego cada uno de los píxeles resultantes se reemplaza con una imagen cuyo color 
>> promedio coincide con ese píxel.
>> 
>> En el tipo más avanzado de mosaico fotográfico, no se reduce la resolución de la imagen de destino y la coincidencia se realiza comparando cada píxel del rectángulo con el píxel 
>> correspondiente de cada imagen de la biblioteca. El rectángulo en el objetivo luego se reemplaza con la imagen de la biblioteca que minimiza la diferencia total. Esto requiere mucho más 
>> cálculo que el tipo simple, pero los resultados pueden ser mucho mejores ya que la coincidencia píxel por píxel puede preservar la resolución de la imagen de destino.
>> 
>> para el caso de estudio propuesto se usó la aproximación de del promedio rgb frente a las tres paletas disponibles en el ejercicio (colores e imágenes de la naturaleza ), además de 
>> incluirse una variación en el tamaño de los elementos que componen el mosaico
>
## Conclusions

> :Tabs
> > :Tab title=conclusions, icon=description
> > >- Con el uso de ascii art y Photographic Mosaic se motiva al estudiante para profundizar en el manejo de la composición de píxeles y la búsqueda de elementos que la reemplacen obteniendo un resultado lo más parecido al original.
> > > 
> > >- En el ejercicio del mosaico fotográfico se puede observar como diferentes bases de datos de imágenes pueden dar resultados muy parecidos haciendo uso del mismo algoritmo.
> > >

> :ToCPrevNext