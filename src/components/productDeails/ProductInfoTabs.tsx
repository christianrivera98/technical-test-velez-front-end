import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ApiProduct } from "@/types/productsInterface"

interface ProductInfoTabsProps {
  product: ApiProduct
}

export default function ProductInfoTabs({ product }: ProductInfoTabsProps) {
  return (
    <div className="mt-16">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Descripción</TabsTrigger>
          <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
          <TabsTrigger value="reviews">Reseñas</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card className="p-6">
            <p className="text-gray-700 leading-relaxed">
              {product.description || "Descripción no disponible para este producto."}
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Especificaciones del Producto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.brand && (
                  <div className="flex justify-between">
                    <span className="font-medium">Marca:</span>
                    <span>{product.brand}</span>
                  </div>
                )}
                {product.categories && product.categories.length > 0 && (
                  <div className="flex justify-between">
                    <span className="font-medium">Categoría:</span>
                    <span>{product.categories[0]}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card className="p-6">
            <p className="text-gray-500 text-center py-8">Las reseñas se cargarán próximamente.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}