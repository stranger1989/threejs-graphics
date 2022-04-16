import ShaderCanvas from "../../template/shaderCanvas";

const noise = {
  vertexShader: `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
    vec4 mvPosition =  viewMatrix * worldPosition;
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
  fragmentShader: `
  uniform float uTime;
  varying vec2 vUv;

  float random (vec2 st, float seed) {
    const float a = 12.9898;
    const float b = 78.233;
    const float c = 43758.543123;
    return fract(sin(dot(st.xy, vec2(a, b)) + seed) * c );
  }

  void main(){
    vec3 color = random(vUv, uTime)*vec3(1.0);
    gl_FragColor  = vec4(color, 1.0);
  }
  `,
};

const uniforms = {
  uTime: { value: 1.0 },
};

const shaderNoiseCanvasInstance = new ShaderCanvas(uniforms, noise);
shaderNoiseCanvasInstance.animate();
