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
        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
          <img
            src={currentImage.imageUrl || "/placeholder.svg"}
            alt={currentImage.imageLabel || productName}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Controles de Navegación */}
        {displayImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}

        {/* Botón de Zoom */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsZoomOpen(true)}
          className="absolute top-4 right-4 bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>

        {/* Indicador de Imagen */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedImageIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedImageIndex ? "border-black shadow-lg" : "border-gray-200 hover:border-gray-300"
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
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
          <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
            <img
              src={currentImage.imageUrl || "/placeholder.svg"}
              alt={currentImage.imageLabel || productName}
              className="w-full h-full object-contain"
            />
            {displayImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}