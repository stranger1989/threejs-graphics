import * as THREE from "three";
import FlorianSchmidinger from "../../assets/images/florian-schmidinger.jpg";
import ShaderCanvas from "../../template/shaderCanvas";

const channelShift = {
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
  uniform sampler2D uTex;

  void main() {
    float shift = uPercent * .01;
    float r = texture2D( uTex, vUv + vec2( shift, 0.0 ) ).r;
    float g = texture2D( uTex, vUv ).g;
    float b = texture2D( uTex, vUv - vec2( shift, 0.0 ) ).b;
    vec3 color = vec3( r, g, b );
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
    value: 1.0,
  },
};

const shaderChannelShiftCanvasInstance = new ShaderCanvas(
  uniforms,
  channelShift
);
shaderChannelShiftCanvasInstance.animate();
