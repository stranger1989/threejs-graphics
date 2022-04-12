import * as THREE from "three";

export default class ShaderCanvas {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  uniforms: { [uniform: string]: THREE.IUniform };
  getVolatility = () => 1;

  constructor(
    uniforms: { [uniform: string]: THREE.IUniform } | null,
    shader: { vertexShader: string; fragmentShader: string },
    cameraPosition = 1,
    getVolatility = () => 1
  ) {
    this.getVolatility = getVolatility;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = cameraPosition;

    this.scene = new THREE.Scene();

    this.uniforms = uniforms ?? {};

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      ...shader,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    this.scene.add(mesh);

    window.addEventListener("resize", this.onWindowResize, false);
  }

  public animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
    this.uniforms.uTime.value = this.getVolatility();
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
