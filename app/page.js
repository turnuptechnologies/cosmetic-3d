import ModelViewer from "@/components/ModelViewer";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <h1>Welcome to Cosmetic 3D</h1>
        <p>Explore our products in 3D</p>
      </section>
      <section className="model-viewer-container">
        <ModelViewer modelPath="/3D-Modals-GLB/3d-one.glb" />
      </section>
    </main>
  );
}
