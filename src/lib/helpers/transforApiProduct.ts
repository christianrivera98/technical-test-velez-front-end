/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product, ProductItem } from "@/types/productsInterface";

export function transformApiProduct(apiProduct: any): Product {
  console.log("🔄 Transforming API product:", apiProduct);
  console.log("🔍 API Product keys:", Object.keys(apiProduct || {}));
  console.log("🔍 API Product type:", typeof apiProduct);
  
  // Ultra-defensive approach
  if (!apiProduct || typeof apiProduct !== 'object') {
    throw new Error("Invalid API product data");
  }

  const allColors = new Set<string>();
  const allSizes = new Set<string>();
  let minPrice = Infinity;
  let maxPrice = 0;
  let hasDiscount = false;

  // DEBUGGING: Revisar todas las formas posibles de acceder a items
  console.log("🔍 Checking items access methods:");
  console.log("  - Direct 'items':", apiProduct.items);
  console.log("  - Bracket 'items':", apiProduct['items']);
  console.log("  - Has items property:", 'items' in apiProduct);
  console.log("  - Items type:", typeof apiProduct.items);
  console.log("  - Items is array:", Array.isArray(apiProduct.items));

  // Método alternativo: buscar propiedades que contengan arrays de items
  const possibleItemsKeys = ['items', 'skus', 'variants', 'products'];
  let itemsArray: any[] = [];
  let foundItemsKey = '';

  for (const key of possibleItemsKeys) {
    if (apiProduct[key] && Array.isArray(apiProduct[key])) {
      itemsArray = apiProduct[key];
      foundItemsKey = key;
      console.log(`✅ Found items in property: ${key}`, itemsArray);
      break;
    }
  }

  // Si no encontramos items en las propiedades esperadas, buscar cualquier array
  if (itemsArray.length === 0) {
    console.log("🔍 Searching for any array property...");
    for (const [key, value] of Object.entries(apiProduct)) {
      if (Array.isArray(value) && value.length > 0) {
        console.log(`📦 Found array in ${key}:`, value);
        // Verificar si el primer elemento parece un item de producto
        const firstItem = value[0];
        if (firstItem && typeof firstItem === 'object' && 
            (firstItem.itemId || firstItem.id || firstItem.sku)) {
          itemsArray = value;
          foundItemsKey = key;
          console.log(`✅ Using array from ${key} as items`);
          break;
        }
      }
    }
  }

  // Si aún no hay items, crear uno a partir del producto principal
  if (itemsArray.length === 0) {
    console.log("⚠️ No items found, creating fallback from main product");
    itemsArray = [apiProduct]; // Usar el producto principal como item
    foundItemsKey = 'main-product';
  }

  console.log(`📦 Processing ${itemsArray.length} items from ${foundItemsKey}`);

  const items: ProductItem[] = [];

  // Process each item safely
  for (let i = 0; i < itemsArray.length; i++) {
    try {
      const item = itemsArray[i];
      
      console.log(`🔍 Processing item ${i}:`, item);
      console.log(`🔍 Item keys:`, Object.keys(item || {}));
      
      if (!item || typeof item !== 'object') {
        console.warn(`⚠️ Skipping invalid item at index ${i}`);
        continue;
      }

      // Check sellers safely - con más debugging
      let sellers: any[] = [];
      const possibleSellersKeys = ['sellers', 'seller', 'commercial', 'pricing'];
      
      for (const key of possibleSellersKeys) {
        if (item[key]) {
          if (Array.isArray(item[key])) {
            sellers = item[key];
            console.log(`✅ Found sellers in ${key}:`, sellers);
            break;
          } else if (typeof item[key] === 'object') {
            sellers = [item[key]];
            console.log(`✅ Found single seller in ${key}:`, sellers);
            break;
          }
        }
      }

      // Si no hay sellers, crear uno por defecto
      if (sellers.length === 0) {
        console.log("⚠️ No sellers found, creating default seller");
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
            console.log(`✅ Found colors in ${key}:`, colors);
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
            console.log(`✅ Found sizes in ${key}:`, sizes);
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
        console.log("🔍 Processing seller:", seller);
        
        const commercialOffer = seller?.commertialOffer || seller?.['commertialOffer'] || seller?.commercialOffer;
        console.log("🔍 Commercial offer:", commercialOffer);
        
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
        
        console.log(`💰 Pricing - Price: ${price}, ListPrice: ${listPrice}, Available: ${isAvailable}`);
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
            console.log(`✅ Found images in ${key}:`, images);
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
      console.log(`✅ Successfully processed item ${i}:`, processedItem);

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

  console.log("✅ Transform completed successfully:", transformedProduct);
  return transformedProduct;
}