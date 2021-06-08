// Precision seems mandatory in webgl
precision highp float;

// 1. Attributes and uniforms sent by p5.js

// Vertex attributes and some uniforms are sent by
// p5.js following these naming conventions:
// https://github.com/processing/p5.js/blob/main/contributor_docs/webgl_mode_architecture.md

// 1.1. Attributes
// vertex position attribute
// este atributo es uno de los tres tipo de variable: attribute, varying, uniform
// este atributo se emite con el comando vertex(...)
attribute vec3 aPosition;

// vertex texture coordinate attribute
// 'aTexCoord' es el nombre de la variable que es emitida por p5 en un vector de dos
// posiciones. Lo que se hace es en el varying con el mismo nombre. 
attribute vec2 aTexCoord;

// vertex color attribute
// esta variable la emite p5 automaticamente
attribute vec4 aVertexColor;

// 1.2. Matrix uniforms

// The vertex shader should project the vertex position into clip space:
// vertex_clipspace = vertex * projection * view * model (see the gl_Position below)
// Details here: http://visualcomputing.github.io/Transformations

// Either a perspective or an orthographic projection
uniform mat4 uProjectionMatrix;

// modelview = view * model
uniform mat4 uModelViewMatrix;

// B. varying variable names are defined by the shader programmer:
// vertex color
// necesitamos las coordenadas en el fragment shader para poder leer y asociar a nivel
// de pixel la informacion del espacio de textura. Este mecanismo de traslado es el tipo
// de variable varying.
// La variable varying va interpolar a nivel de atributo lo que hallamos asociado para 
// el vertice y de esa manera la informacion va a ser consistente en el fragmento. 
varying vec4 vVertexColor;

// vertex texcoord
varying vec2 vTexCoord;

void main() {
  // copy / interpolate color
  vVertexColor = aVertexColor;
  // copy / interpolate texcoords
  // aquí le paso este vector al fragement shader
  // interpole el atributo emitido por p5 al varying que se va a transmitir al fragmento,
  // usando el algoritmo de coordenadas varicentricas.
  // Ver archivo .frag en [+++]
  vTexCoord = aTexCoord;
  // vertex projection into clipspace
  // esta linea no se puede obviar, siempre debe ir es la proyeccion del vertice 
  // a la pantalla
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
