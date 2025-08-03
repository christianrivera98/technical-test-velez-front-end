"use client"

import { useState } from "react"
import type { Image } from "@/types/productsInterface"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react"

interface ImageGalleryProps {
  images: Image[]
  productName: string
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false)

  // Si no hay imágenes, mostrar placeholder
  const displayImages =
    images.length > 0
      ? images
      : [{ imageUrl: `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(productName)}` }]

  const currentImage = displayImages[selectedImageIndex]

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % displayImages.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)
  }

  return (
    <div className="space-y-4">
      {/* Imagen Principal */}
      <div className="relative group">
        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-xl ring-1 ring-border">
          <img
            key={currentImage.imageUrl} // Key para forzar re-render y activar animación
            src={currentImage.imageUrl || "/placeholder.svg"}
            alt={currentImage.imageLabel || productName}
            className="w-full h-full object-cover animate-fadeIn" // Usar la nueva animación
          />
        </div>
        {/* Controles de Navegación */}
        {displayImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
        {/* Botón de Zoom */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsZoomOpen(true)}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"
        >
          <ZoomIn className="w-5 h-5" />
        </Button>
        {/* Indicador de Imagen */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-1 rounded-full text-sm font-medium">
            {selectedImageIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>
      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                index === selectedImageIndex
                  ? "border-primary shadow-md scale-100"
                  : "border-gray-200 hover:border-gray-300 hover:scale-[1.02]"
              }`}
            >
              <img
                src={image.imageUrl || "/placeholder.svg"}
                alt={image.imageLabel || `${productName} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      {/* Modal de Zoom */}
      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent className="max-w-5xl w-full h-[90vh] p-0 bg-black/90 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              key={`zoom-${currentImage.imageUrl}`} // Key para animación en el modal
              src={currentImage.imageUrl || "/placeholder.svg"}
              alt={currentImage.imageLabel || productName}
              className="max-w-full max-h-full object-contain animate-fadeIn" // Usar la nueva animación
            />
            {displayImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
