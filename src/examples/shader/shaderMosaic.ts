import * as THREE from "three";
import FlorianSchmidinger from "../assets/images/florian-schmidinger.jpg";
import ShaderCanvas from "../../template/shaderCanvas";

const mosaic = {
  vertexShader: `
  varying vec2 vUv;

  uniform float uAspect;

  void main() {
    vUv = uv - .5;
    vUv.y *= uAspect;
    vUv += .5;
    gl_Position = vec4( position, 1.0 );
  }
  `,
  fragmentShader: `
  varying vec2 vUv;

  uniform float uPercent;
  uniform float uTime;
  uniform sampler2D uTex;

  void main() {
    vec2 uv = vUv;
    float moz = uPercent * 0.02;
    if( moz > 0. ) {
      uv = floor( uv / moz ) * moz + ( moz * .5 );
    }
    vec3 color = texture2D( uTex, uv ).rgb;
    gl_FragColor = vec4( color, 1.0 );
  }
  `,
};

const texture = new THREE.TextureLoader().load(FlorianSchmidinger);
const uniforms = {
  uTime: { value: 1.0 },
  uResolution: { value: new THREE.Vector2() },
  uAspect: {
    value: window.innerHeight / window.innerWidth,
  },
  uTex: {
    value: texture,
  },
  uPercent: {
    value: 0.5,
  },
};

const shaderMosaicCanvasInstance = new ShaderCanvas(uniforms, mosaic);
shaderMosaicCanvasInstance.animate();
