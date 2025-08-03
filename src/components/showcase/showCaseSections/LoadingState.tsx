// components/LoadingState.tsx
export default function LoadingState() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-green"></div>
    </div>
  );
}