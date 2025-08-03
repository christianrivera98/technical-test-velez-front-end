// components/ErrorState.tsx
import { ErrorResponse } from "@/api/errorResponse";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: ErrorResponse;
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-light-gray flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-dark-green mb-4">
          Error al cargar productos
        </h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-dark-green hover:bg-olive-green"
        >
          Reintentar
        </Button>
      </div>
    </div>
  );
}