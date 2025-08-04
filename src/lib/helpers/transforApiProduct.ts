/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product, ProductItem } from "@/types/productsInterface";

export function transformApiProduct(apiProduct: any): Product {
  // Ultra-defensive approach
  if (!apiProduct || typeof apiProduct !== 'object') {
    throw new Error("Invalid API product data");
  }

  const allColors = new Set<string>();
  const allSizes = new Set<string>();
  let minPrice = Infinity;
  let maxPrice = 0;
  let hasDiscount = false;


  // Método alternativo: buscar propiedades que contengan arrays de items
  const possibleItemsKeys = ['items', 'skus', 'variants', 'products'];
  let itemsArray: any[] = [];
  let foundItemsKey = '';

  for (const key of possibleItemsKeys) {
    if (apiProduct[key] && Array.isArray(apiProduct[key])) {
      itemsArray = apiProduct[key];
      foundItemsKey = key;
      break;
    }
  }

  // Si no encontramos items en las propiedades esperadas, buscar cualquier array
  if (itemsArray.length === 0) {
    for (const [key, value] of Object.entries(apiProduct)) {
      if (Array.isArray(value) && value.length > 0) {
        // Verificar si el primer elemento parece un item de producto
        const firstItem = value[0];
        if (firstItem && typeof firstItem === 'object' && 
            (firstItem.itemId || firstItem.id || firstItem.sku)) {
          itemsArray = value;
          foundItemsKey = key;
          break;
        }
      }
    }
  }

  // Si aún no hay items, crear uno a partir del producto principal
  if (itemsArray.length === 0) {
    itemsArray = [apiProduct]; // Usar el producto principal como item
    foundItemsKey = 'main-product';
  }


  const items: ProductItem[] = [];

  // Process each item safely
  for (let i = 0; i < itemsArray.length; i++) {
    try {
      const item = itemsArray[i];
      
      if (!item || typeof item !== 'object') {
        continue;
      }

      // Check sellers safely - con más debugging
      let sellers: any[] = [];
      const possibleSellersKeys = ['sellers', 'seller', 'commercial', 'pricing'];
      
      for (const key of possibleSellersKeys) {
        if (item[key]) {
          if (Array.isArray(item[key])) {
            sellers = item[key];
            break;
          } else if (typeof item[key] === 'object') {
            sellers = [item[key]];
            break;
          }
        }
      }

      // Si no hay sellers, crear uno por defecto
      if (sellers.length === 0) {
        sellers = [{
          sellerId: "default",
          sellerName: "Default",
          commertialOffer: {
            Price: item.price ? item.price * 100 : 0,
            ListPrice: item.listPrice ? item.listPrice * 100 : item.price ? item.price * 100 : 0,
            IsAvailable: true
          }
        }];
      }

      // Extract colors safely - con más variaciones
      const colors: string[] = [];
      const possibleColorKeys = ['Color', 'color', 'colors', 'Color_Name', 'ColorName'];
      
      for (const key of possibleColorKeys) {
        if (item[key]) {
          let colorArray = item[key];
          if (!Array.isArray(colorArray)) {
            colorArray = [colorArray];
          }
          
          colorArray.forEach((color: any) => {
            if (typeof color === 'string' && color.trim()) {
              const cleanColor = color.trim();
              colors.push(cleanColor);
              allColors.add(cleanColor);
            } else if (typeof color === 'object' && color.name) {
              const cleanColor = color.name.trim();
              colors.push(cleanColor);
              allColors.add(cleanColor);
            }
          });
          
          if (colors.length > 0) {
            break;
          }
        }
      }

      // Extract sizes safely - con más variaciones
      const sizes: string[] = [];
      const possibleSizeKeys = ['Talla', 'talla', 'size', 'sizes', 'Size_Name', 'SizeName'];
      
      for (const key of possibleSizeKeys) {
        if (item[key]) {
          let sizeArray = item[key];
          if (!Array.isArray(sizeArray)) {
            sizeArray = [sizeArray];
          }
          
          sizeArray.forEach((size: any) => {
            if (typeof size === 'string' && size.trim()) {
              const cleanSize = size.trim();
              sizes.push(cleanSize);
              allSizes.add(cleanSize);
            } else if (typeof size === 'object' && size.name) {
              const cleanSize = size.name.trim();
              sizes.push(cleanSize);
              allSizes.add(cleanSize);
            }
          });
          
          if (sizes.length > 0) {
            break;
          }
        }
      }

      // Get pricing safely - mejorado
      let price = 0;
      let listPrice = 0;
      let isAvailable = false;
      
      try {
        const seller = sellers[0];
        
        const commercialOffer = seller?.commertialOffer || seller?.['commertialOffer'] || seller?.commercialOffer;
        
        if (commercialOffer) {
          price = commercialOffer.Price ? commercialOffer.Price / 100 : 0;
          listPrice = commercialOffer.ListPrice ? commercialOffer.ListPrice / 100 : price;
          isAvailable = !!commercialOffer.IsAvailable;
        } else {
          // Fallback: buscar precio directamente en el item
          price = item.price || item.Price || 0;
          listPrice = item.listPrice || item.ListPrice || price;
          isAvailable = item.available !== false;
        }
        
      } catch (e) {
        console.warn(`⚠️ Error extracting pricing for item ${i}:`, e);
      }

      if (price > 0) {
        minPrice = Math.min(minPrice, price);
        maxPrice = Math.max(maxPrice, price);
        
        if (price < listPrice) {
          hasDiscount = true;
        }
      }

      // Get images safely - mejorado
      const images: any[] = [];
      const possibleImageKeys = ['images', 'Images', 'image', 'pictures'];
      
      for (const key of possibleImageKeys) {
        if (item[key] && Array.isArray(item[key])) {
          item[key].forEach((img: any) => {
            if (img && typeof img === 'object') {
              images.push({
                imageUrl: img.imageUrl || img.url || img.src || '',
                imageLabel: img.imageLabel || img.label || img.alt || ''
              });
            } else if (typeof img === 'string') {
              images.push({
                imageUrl: img,
                imageLabel: ''
              });
            }
          });
          
          if (images.length > 0) {
            break;
          }
        }
      }

      const processedItem: ProductItem = {
        itemId: item.itemId || item.id || item.sku || `item-${i}`,
        name: item.name || item.nameComplete || item.title || apiProduct.productName || `Item ${i}`,
        images,
        colors: [...new Set(colors)],
        sizes: [...new Set(sizes)],
        price,
        listPrice,
        isAvailable
      };

      items.push(processedItem);

    } catch (error) {
      console.error(`❌ Error processing item ${i}:`, error);
      continue;
    }
  }

  // Create fallback item if no valid items found
  if (items.length === 0) {
    console.warn("⚠️ No valid items found, creating fallback item");
    items.push({
      itemId: apiProduct.productId || apiProduct.id || 'unknown',
      name: apiProduct.productName || apiProduct.name || 'Producto sin nombre',
      images: [],
      colors: [],
      sizes: [],
      price: 0,
      listPrice: 0,
      isAvailable: false
    });
  }

  // Determine if new
  let isNew = false;
  try {
    const releaseDate = apiProduct.releaseDate || apiProduct['releaseDate'];
    if (releaseDate) {
      const date = new Date(releaseDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      isNew = date > thirtyDaysAgo && !isNaN(date.getTime());
    }
  } catch (error) {
    console.warn('Error parsing release date:', error);
  }

  const transformedProduct: Product = {
    productId: apiProduct.productId || apiProduct.id || 'unknown',
    productName: apiProduct.productName || apiProduct.name || 'Producto sin nombre',
    brand: apiProduct.brand || apiProduct.Brand || 'Sin marca',
    description: apiProduct.description || apiProduct.Description || apiProduct.metaTagDescription || '',
    categories: Array.isArray(apiProduct.categories) ? apiProduct.categories : 
                Array.isArray(apiProduct.Categories) ? apiProduct.Categories :
                apiProduct.category ? [apiProduct.category] : [],
    items,
    availableSizes: Array.from(allSizes).sort(),
    availableColors: Array.from(allColors).sort(),
    minPrice: minPrice === Infinity ? 0 : minPrice,
    maxPrice,
    isOnSale: hasDiscount,
    isNew
  };

  return transformedProduct;
}