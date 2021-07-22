# Hardware Gray

## Luma Grayscale

> :Tabs
> > :Tab title=Texture, icon=visibility
> > > :P5 sketch=/docs/sketches/workshops/workshop2/grayscale/lumaTexture1.js, width=400, height=400
>
> > :Tab title=Code, icon=code
> >
> > ```js | lumaTexture.frag
> >// texture.frag
> >precision mediump float;
> >
> >// texture is sent by the sketch
> >uniform sampler2D texture;
> >
> >// interpolated color (same name and type as in vertex shader)
> >varying vec4 vVertexColor;
> >// interpolated texcoord (same name and type as in vertex shader)
> >varying vec2 vTexCoord;
> >
> >void main() {
> >  vec4 col = texture2D(texture, vTexCoord);
> >  float gray = dot(col.rgb, vec3(0.299, 0.587, 0.114));
> >  gl_FragColor = vec4(vec3(gray), 1.0);
> >}
> > ```

## RGB Grayscale

> :Tabs
> > :Tab title=Texture, icon=visibility
> > > :P5 sketch=/docs/sketches/workshops/workshop2/grayscale/rgbTexture1.js, width=400, height=400
>
> > :Tab title=Code, icon=code
> >
> > ```js | rgbTexture.frag
> >// texture.frag
> >precision mediump float;
> >
> >// texture is sent by the sketch
> >uniform sampler2D texture;
> >// interpolated color (same name and type as in vertex shader)
> >varying vec4 vVertexColor;
> >// interpolated texcoord (same name and type as in vertex shader)
> >varying vec2 vTexCoord;
> >
> >void main() {
> >  vec4 col = texture2D(texture, vTexCoord);
> >  float gray = dot(col.xyz, vec3(0.333, 0.333, 0.333));
> >  gl_FragColor = vec4(vec3(gray), 1.0);
> >}
> > ```

## Video Luma Grayscale

> :Tabs
> > :Tab title=Texture, icon=visibility
> > > :P5 sketch=/docs/sketches/workshops/workshop2/grayscale/vidLumaTexture1.js, width=400, height=400
>
> > :Tab title=Code, icon=code
> >
> > ```js | rgbTexture.frag
> >// texture.frag
> >precision mediump float;
> >
> >// texture is sent by the sketch
> >uniform sampler2D texture;
> >// interpolated color (same name and type as in vertex shader)
> >varying vec4 vVertexColor;
> >// interpolated texcoord (same name and type as in vertex shader)
> >varying vec2 vTexCoord;
> >
> >void main() {
> >  vec4 col = texture2D(texture, vTexCoord);
> >  float gray = dot(col.xyz, vec3(0.333, 0.333, 0.333));
> >  gl_FragColor = vec4(vec3(gray), 1.0);
> >}
> > ```

## video RGB Grayscale

> :Tabs
> > :Tab title=Texture, icon=visibility
> > > :P5 sketch=/docs/sketches/workshops/workshop2/grayscale/vidRgbTexture1.js, width=400, height=400
>
> > :Tab title=Code, icon=code
> >
> > ```js | rgbTexture.frag
> >// texture.frag
> >precision mediump float;
> >
> >// texture is sent by the sketch
> >uniform sampler2D texture;
> >// interpolated color (same name and type as in vertex shader)
> >varying vec4 vVertexColor;
> >// interpolated texcoord (same name and type as in vertex shader)
> >varying vec2 vTexCoord;
> >
> >void main() {
> >  vec4 col = texture2D(texture, vTexCoord);
> >  float gray = dot(col.xyz, vec3(0.333, 0.333, 0.333));
> >  gl_FragColor = vec4(vec3(gray), 1.0);
> >}
> > ```

> :ToCPrevNext