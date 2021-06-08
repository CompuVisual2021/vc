precision mediump float;

uniform sampler2D image;
uniform sampler2D symbol0;
uniform sampler2D symbol1;
uniform sampler2D symbol2;
uniform sampler2D symbol3;
uniform sampler2D symbol4;
uniform sampler2D symbol5;
uniform sampler2D symbol6;
uniform sampler2D symbol7;

uniform bool debug;
uniform float resolution;
uniform int channel;

varying vec4 vVertexColor;
varying vec2 vTexCoord;

void main() {
    vec2 symbolCoord = vTexCoord*resolution;
    vec2 imageCoord = floor(symbolCoord);
    symbolCoord = symbolCoord - imageCoord;
    imageCoord = imageCoord*vec2(1.0)/vec2(resolution);
    vec4 index = texture2D(image, imageCoord)*vec4(255.0);
    // float criteria = floor(length(vec3(index.x, index.y, index.z))/16.0);
    float luma; 
    if (channel == 0) // red
        luma = index.x;
    else if (channel == 1) // green
        luma = index.y;
    else if (channel == 2) // blue
        luma = index.z;
    else if (channel == 3) // gamma
        luma = index.a;
    else if (channel == 4) // grayaverage
        luma = (index.x + index.y + index.z)/3.0;
    else // luma
        luma = (0.2989*index.x + 0.5870*index.y + 0.1140*index.z)/3.0;


    float criteria = floor(luma/32.0);
    
    if (criteria == 0.0)
        gl_FragColor = texture2D(symbol0, symbolCoord)*vVertexColor;
    else if (criteria == 1.0)
        gl_FragColor = texture2D(symbol1, symbolCoord)*vVertexColor;
    else if (criteria == 2.0)
        gl_FragColor = texture2D(symbol2, symbolCoord)*vVertexColor;
    else if (criteria == 3.0)
        gl_FragColor = texture2D(symbol3, symbolCoord)*vVertexColor;
    else if (criteria == 4.0)
        gl_FragColor = texture2D(symbol4, symbolCoord)*vVertexColor;
    else if (criteria == 5.0)
        gl_FragColor = texture2D(symbol5, symbolCoord)*vVertexColor;
    else if (criteria == 6.0)
        gl_FragColor = texture2D(symbol6, symbolCoord)*vVertexColor;
    else
        gl_FragColor = texture2D(symbol7, symbolCoord)*vVertexColor;

    if (debug)
        gl_FragColor = index/vec4(255.0);
}