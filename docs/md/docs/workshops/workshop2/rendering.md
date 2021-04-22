# Rendering

> :Tabs
> > :Tab title=Texture, icon=visibility
> > > :P5 sketch=/docs/sketches/workshops/workshop2/texture1.js, width=400, height=400
>
> > :Tab title=Code, icon=code
> >
> > ```js | texture1.js
> > let img;
> > let imgPath = "/vc/docs/sketches/Pokémon.jpg";
> > 
> > function preload() {
> >   img = loadImage(imgPath);
> > }
> > 
> > 
> > function setup() {
> >   createCanvas(400, 400, WEBGL);
> >   ortho(-width/2, width/2, -height/2, height/2);
> >   textureMode(NORMAL);
> > }
> > 
> > function draw() {
> >   background(200);
> >   //scale(0.4); // Scaled to make model fit into canvas
> >   //rotateX(frameCount * 0.01);
> >   //rotateY(frameCount * 0.01);
> >   //fill(color("red"));
> >   texture(img);
> >   cover(true);
> >   //box(200,200,200);
> >   orbitControl();
> > }
> > 
> > function cover(texture = false) {
> >   beginShape();
> >   if (texture) {
> >     vertex(-width / 2, -height / 2, 0, 0, 0);
> >     vertex(width / 2, -height / 2, 0, 1, 0);
> >     vertex(width / 2, height / 2, 0, 1, 1);
> >     vertex(-width / 2, height / 2, 0, 0, 1);
> >   } else {
> >     vertex(-width / 2, -height / 2, 0);
> >     vertex(width / 2, -height / 2, 0);
> >     vertex(width / 2, height / 2, 0);
> >     vertex(-width / 2, height / 2, 0);
> >   }
> >   endShape(CLOSE);
> > }
> > ```

> :ToCPrevNext