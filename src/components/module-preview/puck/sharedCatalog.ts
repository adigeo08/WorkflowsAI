import { erpInventory, formatRon, getAvailableProducts, type Product } from '../../../sharedBusinessData';

export type CatalogItem = {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  minimumStock: number;
  supplier: string;
  price: string;
};

export const productToCatalogItem = (product: Product): CatalogItem => ({
  id: product.id,
  name: product.name,
  sku: product.sku,
  category: product.category,
  stock: product.stock,
  minimumStock: product.minimumStock,
  supplier: product.supplier,
  price: formatRon(product.price)
});

export const initialCatalogItems: CatalogItem[] = erpInventory.map(productToCatalogItem);
export const ecommerceCatalogItems: CatalogItem[] = getAvailableProducts().map(productToCatalogItem);
