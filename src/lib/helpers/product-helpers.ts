/**
 * Obtiene el color CSS para un nombre de color
 */
export const getColorValue = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    Blanco: "#FFFFFF",
    Negro: "#000000",
    Azul: "#3B82F6",
    "Azul Oscuro": "#1E3A8A",
    Rosa: "#EC4899",
    Gris: "#6B7280",
    Beige: "#D2B48C",
    Marino: "#1E3A8A",
    Verde: "#10B981",
    Marrón: "#92400E",
  }
  return colorMap[colorName] || "#9CA3AF"
}
