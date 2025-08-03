// utils/colorUtils.ts
export function getColorValue(colorName: string): string {
  const colorMap: Record<string, string> = {
    Negro: "#1c1c1c",
    Blanco: "#fafaff",
    Azul: "#4a90e2",
    Rojo: "#e74c3c",
    Verde: "#27ae60",
    Amarillo: "#f1c40f",
    Rosa: "#e91e63",
    Gris: "#95a5a6",
    Marrón: "#8b4513",
    Beige: "#f5f5dc",
    Naranja: "#ff9500",
    Morado: "#9b59b6",
    Turquesa: "#1abc9c",
  }
  return colorMap[colorName] || "#daddd8"
}