import * as THREE from "three";
import FlorianSchmidinger from "../../assets/images/florian-schmidinger.jpg";
import ShaderCanvas from "../../template/shaderCanvas";

const gradationInversion = {
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

  uniform sampler2D uTex;
  uniform float uPercent;

  void main() {
    vec3 color = texture2D( uTex, vUv ).rgb;
    vec3 invert = 1. - color;

    color = mix( color, invert, uPercent );

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
    value: 0.3,
  },
};

const shaderGradationInversionCanvasInstance = new ShaderCanvas(
  uniforms,
  gradationInversion
);
shaderGradationInversionCanvasInstance.animate();
