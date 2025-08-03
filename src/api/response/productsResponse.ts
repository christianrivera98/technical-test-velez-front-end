import { ApiProduct, Product, ProductItem } from "@/types/productsInterface";
import { ApiResponse } from "../apiResponse";

export type ProductResponse = ApiResponse<Product[]>
export type ProductByIdResponse = ApiProduct[]