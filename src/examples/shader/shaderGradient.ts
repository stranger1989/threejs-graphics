import ShaderCanvas from "../../template/shaderCanvas";

const gradient = {
  vertexShader: `
    varying vec2 vUv;

    void main(){
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
    `,
  fragmentShader: `
    precision mediump float;
    uniform float uTime;
    varying vec2 vUv;
    void main() {
      vec2 p = vUv * 1.0 - 0.5;
      float r = 1.0 + 0.5 * (sin(5.0 * p.x + uTime));
      float g = 1.0 + 0.5 * (sin(5.0 * p.y) + sin(uTime + 2.0 * p.x));
      float b = 1.0 + 0.5 * (sin(5.0 + p.x * p.y * 17.0) + sin(uTime * 0.4  + 4.0 * p.y));
      gl_FragColor = vec4(r, g, b, 1.0);
    }
    `,
};

const uniforms = {
  uTime: { value: 1.0 },
};

let time = 0;
const getVolatility = (): number => {
  time += 0.01;
  return Math.sin(time);
};

const shaderGradientCanvasInstance = new ShaderCanvas(
  uniforms,
  gradient,
  1,
  getVolatility
);
shaderGradientCanvasInstance.animate();
