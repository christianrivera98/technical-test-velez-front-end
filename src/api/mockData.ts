import { ShowcaseProduct } from "@/types/productsInterface"

export const mockProducts: ShowcaseProduct[] = [
  {
    productId: "1",
    productName: "Camisa de Lino Clásica",
    brand: "StyleShop",
    productReference: "CAM-LIN-001",
    productReferenceCode: "SL-CAM-001",
    items: [
      {
        itemId: "1-1",
        name: "Camisa de Lino Clásica - Blanco",
        images: [{ imageUrl: "/placeholder.svg?height=400&width=300&text=Camisa+Lino" }],
        Color: ["Blanco", "Azul", "Beige"],
        Talla: ["S", "M", "L", "XL"],
        sellers: [
          {
            commertialOffer: {
              Price: 89.99,
              ListPrice: 120.0,
            },
          },
        ],
      },
    ],
    skuSpecifications: [
      {
        field: { id: 1, name: "Color", isActive: true, position: 1, type: "Text" },
        values: [
          { id: "1", name: "Blanco", position: 1 },
          { id: "2", name: "Azul", position: 2 },
          { id: "3", name: "Beige", position: 3 },
        ],
      },
      {
        field: { id: 2, name: "Talla", isActive: true, position: 2, type: "Text" },
        values: [
          { id: "4", name: "S", position: 1 },
          { id: "5", name: "M", position: 2 },
          { id: "6", name: "L", position: 3 },
          { id: "7", name: "XL", position: 4 },
        ],
      },
    ],
  },
  {
    productId: "2",
    productName: "Vestido Floral Verano",
    brand: "StyleShop",
    productReference: "VES-FLO-001",
    productReferenceCode: "SL-VES-001",
    items: [
      {
        itemId: "2-1",
        name: "Vestido Floral Verano - Rosa",
        images: [{ imageUrl: "/placeholder.svg?height=400&width=300&text=Vestido+Floral" }],
        Color: ["Rosa", "Azul", "Verde"],
        Talla: ["XS", "S", "M", "L"],
        sellers: [
          {
            commertialOffer: {
              Price: 65.99,
              ListPrice: 65.99,
            },
          },
        ],
      },
    ],
    skuSpecifications: [
      {
        field: { id: 1, name: "Color", isActive: true, position: 1, type: "Text" },
        values: [
          { id: "8", name: "Rosa", position: 1 },
          { id: "9", name: "Azul", position: 2 },
          { id: "10", name: "Verde", position: 3 },
        ],
      },
      {
        field: { id: 2, name: "Talla", isActive: true, position: 2, type: "Text" },
        values: [
          { id: "11", name: "XS", position: 1 },
          { id: "12", name: "S", position: 2 },
          { id: "13", name: "M", position: 3 },
          { id: "14", name: "L", position: 4 },
        ],
      },
    ],
  },
  {
    productId: "3",
    productName: "Jeans Slim Fit",
    brand: "StyleShop",
    productReference: "JEA-SLI-001",
    productReferenceCode: "SL-JEA-001",
    items: [
      {
        itemId: "3-1",
        name: "Jeans Slim Fit - Azul Oscuro",
        images: [{ imageUrl: "/placeholder.svg?height=400&width=300&text=Jeans+Slim" }],
        Color: ["Azul Oscuro", "Negro", "Gris"],
        Talla: ["28", "30", "32", "34", "36"],
        sellers: [
          {
            commertialOffer: {
              Price: 79.99,
              ListPrice: 95.0,
            },
          },
        ],
      },
    ],
    skuSpecifications: [
      {
        field: { id: 1, name: "Color", isActive: true, position: 1, type: "Text" },
        values: [
          { id: "15", name: "Azul Oscuro", position: 1 },
          { id: "16", name: "Negro", position: 2 },
          { id: "17", name: "Gris", position: 3 },
        ],
      },
      {
        field: { id: 2, name: "Talla", isActive: true, position: 2, type: "Text" },
        values: [
          { id: "18", name: "28", position: 1 },
          { id: "19", name: "30", position: 2 },
          { id: "20", name: "32", position: 3 },
          { id: "21", name: "34", position: 4 },
          { id: "22", name: "36", position: 5 },
        ],
      },
    ],
  },
  {
    productId: "4",
    productName: "Blazer Elegante",
    brand: "StyleShop",
    productReference: "BLA-ELE-001",
    productReferenceCode: "SL-BLA-001",
    items: [
      {
        itemId: "4-1",
        name: "Blazer Elegante - Marino",
        images: [{ imageUrl: "/placeholder.svg?height=400&width=300&text=Blazer+Elegante" }],
        Color: ["Marino", "Negro", "Gris"],
        Talla: ["S", "M", "L", "XL"],
        sellers: [
          {
            commertialOffer: {
              Price: 149.99,
              ListPrice: 149.99,
            },
          },
        ],
      },
    ],
    skuSpecifications: [
      {
        field: { id: 1, name: "Color", isActive: true, position: 1, type: "Text" },
        values: [
          { id: "23", name: "Marino", position: 1 },
          { id: "24", name: "Negro", position: 2 },
          { id: "25", name: "Gris", position: 3 },
        ],
      },
      {
        field: { id: 2, name: "Talla", isActive: true, position: 2, type: "Text" },
        values: [
          { id: "26", name: "S", position: 1 },
          { id: "27", name: "M", position: 2 },
          { id: "28", name: "L", position: 3 },
          { id: "29", name: "XL", position: 4 },
        ],
      },
    ],
  },
  {
    productId: "5",
    productName: "Suéter de Punto",
    brand: "StyleShop",
    productReference: "SUE-PUN-001",
    productReferenceCode: "SL-SUE-001",
    items: [
      {
        itemId: "5-1",
        name: "Suéter de Punto - Beige",
        images: [{ imageUrl: "/placeholder.svg?height=400&width=300&text=Sueter+Punto" }],
        Color: ["Beige", "Gris", "Rosa"],
        Talla: ["XS", "S", "M", "L"],
        sellers: [
          {
            commertialOffer: {
              Price: 55.99,
              ListPrice: 75.0,
            },
          },
        ],
      },
    ],
    skuSpecifications: [
      {
        field: { id: 1, name: "Color", isActive: true, position: 1, type: "Text" },
        values: [
          { id: "30", name: "Beige", position: 1 },
          { id: "31", name: "Gris", position: 2 },
          { id: "32", name: "Rosa", position: 3 },
        ],
      },
      {
        field: { id: 2, name: "Talla", isActive: true, position: 2, type: "Text" },
        values: [
          { id: "33", name: "XS", position: 1 },
          { id: "34", name: "S", position: 2 },
          { id: "35", name: "M", position: 3 },
          { id: "36", name: "L", position: 4 },
        ],
      },
    ],
  },
  {
    productId: "6",
    productName: "Falda Midi Plisada",
    brand: "StyleShop",
    productReference: "FAL-MID-001",
    productReferenceCode: "SL-FAL-001",
    items: [
      {
        itemId: "6-1",
        name: "Falda Midi Plisada - Negro",
        images: [{ imageUrl: "/placeholder.svg?height=400&width=300&text=Falda+Midi" }],
        Color: ["Negro", "Marino", "Beige"],
        Talla: ["XS", "S", "M", "L", "XL"],
        sellers: [
          {
            commertialOffer: {
              Price: 45.99,
              ListPrice: 45.99,
            },
          },
        ],
      },
    ],
    skuSpecifications: [
      {
        field: { id: 1, name: "Color", isActive: true, position: 1, type: "Text" },
        values: [
          { id: "37", name: "Negro", position: 1 },
          { id: "38", name: "Marino", position: 2 },
          { id: "39", name: "Beige", position: 3 },
        ],
      },
      {
        field: { id: 2, name: "Talla", isActive: true, position: 2, type: "Text" },
        values: [
          { id: "40", name: "XS", position: 1 },
          { id: "41", name: "S", position: 2 },
          { id: "42", name: "M", position: 3 },
          { id: "43", name: "L", position: 4 },
          { id: "44", name: "XL", position: 5 },
        ],
      },
    ],
  },
]

export const categories = [
  "Todos",
  "Camisas",
  "Vestidos",
  "Pantalones",
  "Blazers",
  "Suéteres",
  "Faldas",
  "Chaquetas",
  "Tops",
]
