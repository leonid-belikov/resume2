// Temporary: deliberate lint failure to verify that CI turns red.
var ciLintFailure = 1;
export { ciLintFailure };

export default function Home() {
  return (
    <main>
      <h1>Leonid Belikov</h1>
      <p>Frontend developer. Site under construction.</p>
    </main>
  );
}
