precision mediump float;

// texture is sent by the sketch
uniform sampler2D texture;
uniform vec2 stepSize;
// convolution mask is sent by the sketch
 uniform float alphaV;
uniform vec3 x1;
uniform vec3 x2;
uniform vec3 x3;
uniform vec2 position;
uniform vec2 resolution;

// interpolated color (same name and type as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name and type as in vertex shader)
varying vec2 vTexCoord;

void main() {

   vec2 step = gl_FragCoord.xy/resolution;
   float y = position.y * step.y;
   float x = step.x * position.x;
  
// INDEX POSITION IN PIXEL LIST
    // location of the UPPER LEFT
   vec2 ul = vTexCoord + vec2(-stepSize.x, -stepSize.y); 
   vec4 p0 = texture2D(texture, ul);
   // location of the UPPER MID
   vec2 uc = vTexCoord + vec2(0.0, -stepSize.y);      
   vec4 p1 = texture2D(texture, uc);
   // location of the UPPER RIGHT
   vec2 ur = vTexCoord + vec2(+stepSize.x, -stepSize.y); 
   vec4 p2 = texture2D(texture, ur);
   // location of the LEFT
   vec2 ml = vTexCoord + vec2(-stepSize.x, 0.0);
   vec4 p3 = texture2D(texture, ml);      
   // location of the CENTER PIXEL
   vec2 mc = vTexCoord + vec2(0.0, 0.0);     
   vec4 p4 = texture2D(texture, mc); 
   // location of the RIGHT     
   vec2 mr = vTexCoord + vec2(+stepSize.x, 0.0);   
   vec4 p5 = texture2D(texture, mr);
   // location of the LOWER LEFT   
   vec2 ll = vTexCoord + vec2(-stepSize.x, +stepSize.y); 
   vec4 p6 = texture2D(texture, ll);
   // location of the LOWER MID
   vec2 lc = vTexCoord + vec2(0.0, +stepSize.y);   
   vec4 p7 = texture2D(texture, lc);   
   // location of the LOWER RIGHT
   vec2 lr = vTexCoord + vec2(+stepSize.x, +stepSize.y); 
   vec4 p8 = texture2D(texture, lr);

   //adding each element of the image to its local neighbors
   vec4 sumX1 = vec4(x1.x*p6) + vec4(x1.y*p7) + vec4(x1.z*p8);
   vec4 sumX2 = vec4(x2.x*p3) + vec4(x2.y*p4) + vec4(x2.z*p5);
   vec4 sumX3 = vec4(x3.x*p0) + vec4(x3.y*p1) + vec4(x3.z*p2);
   vec4 r0 = vec4(sumX1) + vec4(sumX2) + vec4(sumX3);
   r0.w = alphaV;


   gl_FragColor = vec4(r0) * vVertexColor;
}