# Photo Mosaic

> :Tabs
> > :Tab title=Texture, icon=visibility
> > > :P5 sketch=/docs/sketches/workshops/workshop2/photomosaic/main.js, width=600, height=600
>
> > :Tab title=Fragment Shader, icon=code
> >
> > ```js | asciiart.md
> >precision mediump float;
> >
> >uniform sampler2D image;
> >uniform sampler2D symbol0;
> >uniform sampler2D symbol1;
> >uniform sampler2D symbol2;
> >uniform sampler2D symbol3;
> >uniform sampler2D symbol4;
> >uniform sampler2D symbol5;
> >uniform sampler2D symbol6;
> >uniform sampler2D symbol7;
> >
> >uniform vec3 avgcol0;
> >uniform vec3 avgcol1;
> >uniform vec3 avgcol2;
> >uniform vec3 avgcol3;
> >uniform vec3 avgcol4;
> >uniform vec3 avgcol5;
> >uniform vec3 avgcol6;
> >uniform vec3 avgcol7;
> >
> >uniform bool debug;
> >uniform float resolution;
> >uniform int channel;
> >
> >varying vec4 vVertexColor;
> >varying vec2 vTexCoord;
> >
> >/**
> > * Calcula la diferencia entre el color de la cuadricula actual y el color promedio 
> > * de alguna de las imagenes disponibles para componer el mosaico
> > */
> >float squared_distance(vec4 index, vec3 avg) {
> >    return (index.x - avg.x)*(index.x - avg.x) 
> >         + (index.y - avg.y)*(index.y - avg.y) 
> >         + (index.z - avg.z)*(index.z - avg.z);
> >}
> >
> >void main() {
> >    vec2 symbolCoord = vTexCoord*resolution;
> >    vec2 imageCoord = floor(symbolCoord);
> >    symbolCoord = symbolCoord - imageCoord;
> >    imageCoord = imageCoord*vec2(1.0)/vec2(resolution);
> >    vec4 index = texture2D(image, imageCoord)*vec4(255.0);
> >    // float criteria = floor(length(vec3(index.x, index.y, index.z))/16.0);
> >    // float d = squared_distance(index, avgcol0);
> >    // gl_FragColor = index/vec4(255.0);
> >    
> >    float min_d = 999999999999.0;
> >    int i = 0;
> >
> >    float d = squared_distance(index, avgcol0);
> >    if (d < min_d) {
> >        min_d = d;
> >        i = 0;
> >    }    
> >    d = squared_distance(index, avgcol1);
> >    if (d < min_d) {
> >        min_d = d;
> >        i = 1;
> >    }
> >    d = squared_distance(index, avgcol2);
> >    if (d < min_d) {
> >        min_d = d;
> >        i = 2;
> >    }
> >    d = squared_distance(index, avgcol3);
> >    if (d < min_d) {
> >        min_d = d;
> >        i = 3;
> >    }
> >    d = squared_distance(index, avgcol4);
> >    if (d < min_d) {
> >        min_d = d;
> >        i = 4;
> >    }
> >    d = squared_distance(index, avgcol5);
> >    if (d < min_d) {
> >        min_d = d;
> >        i = 5;
> >    }
> >    d = squared_distance(index, avgcol6);
> >    if (d < min_d) {
> >        min_d = d;
> >        i = 6;
> >    }
> >    d = squared_distance(index, avgcol7);
> >    if (d < min_d) {
> >        min_d = d;
> >        i = 7;
> >    }
> >
> >    if (i == 0)
> >        gl_FragColor = texture2D(symbol0, symbolCoord)*vVertexColor;
> >    else if (i == 1)
> >        gl_FragColor = texture2D(symbol1, symbolCoord)*vVertexColor;
> >    else if (i == 2)
> >        gl_FragColor = texture2D(symbol2, symbolCoord)*vVertexColor;
> >    else if (i == 3)
> >        gl_FragColor = texture2D(symbol3, symbolCoord)*vVertexColor;
> >    else if (i == 4)
> >        gl_FragColor = texture2D(symbol4, symbolCoord)*vVertexColor;
> >    else if (i == 5)
> >        gl_FragColor = texture2D(symbol5, symbolCoord)*vVertexColor;
> >    else 
> >        gl_FragColor = texture2D(symbol6, symbolCoord)*vVertexColor;
> >
> >    if (debug)
> >        gl_FragColor = index/vec4(255.0);
> >        
> >}
> >
> >
> > ```

> :ToCPrevNext