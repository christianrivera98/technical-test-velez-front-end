/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cuerosvelezco.vteximg.com.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      // Agregar otros dominios de imágenes que uses
      {
        protocol: 'https',
        hostname: '*.vteximg.com.br',
        port: '',
        pathname: '/**',
      }
    ],
    // Configuración alternativa (método más simple pero menos seguro)
    // domains: [
    //   'cuerosvelezco.vteximg.com.br',
    //   'via.placeholder.com'
    // ]
  }
}

module.exports = nextConfig