export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background text-center">
      <h1 className="text-4xl font-bold text-electric">404</h1>
      <p className="text-muted mt-4">Página no encontrada</p>
      <a href="/" className="mt-6 text-electric hover:underline">
        Volver al inicio
      </a>
    </div>
  );
}
