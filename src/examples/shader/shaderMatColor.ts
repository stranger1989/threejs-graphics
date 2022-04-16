import ShaderCanvas from "../../template/shaderCanvas";

const mat = {
  vertexShader: `
    void main() {
      vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
      vec4 mvPosition =  viewMatrix * worldPosition;
      gl_Position = projectionMatrix * mvPosition;
    }
    `,
  fragmentShader: `
    void main() {
      gl_FragColor = vec4(0.5, 0.9, 0.2, 1.0);
    }
    `,
};

const shaderMatInstance = new ShaderCanvas(null, mat);
shaderMatInstance.animate();
