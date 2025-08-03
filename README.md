# 🛍️ Technical Test – Vélez Front-End

Aplicación web desarrollada como prueba técnica para Vélez, centrada en la experiencia de usuario al explorar productos. Incluye filtrado dinámico, paginación, vistas detalladas y una arquitectura escalable y moderna con Next.js 15 y TypeScript.

---

## 🚀 Tecnologías

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + `tw-animate-css`
- **Animaciones**: Framer Motion
- **Componentes UI**: Radix UI
- **Íconos**: Lucide
- **Cliente HTTP**: Axios
- **Empaquetador**: Turbopack (por defecto en Next.js 15)
- **Gestión de paquetes**: Yarn

---

## 📁 Estructura del Proyecto

src/
├── app/ # Páginas y layout
│ └── product-details/[id] # Vista de detalle dinámico
├── components/ # Componentes reutilizables
├── features/ # Lógica por dominio
├── hooks/ # Hooks personalizados
├── lib/ # Servicios API y helpers
├── types/ # Tipado global del proyecto
├── utils/ # Funciones auxiliares
├── public/ # Imágenes y recursos estáticos

## 📦 Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/technical-test-velez-front-end.git
cd technical-test-velez-front-end

yarn install