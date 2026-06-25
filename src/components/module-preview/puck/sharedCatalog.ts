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

export const initialCatalogItems: CatalogItem[] = [
  { id: 'stock-1', name: 'Laptop Carbon X', sku: 'LCX-14-PRO', category: 'Hardware', stock: 42, minimumStock: 10, supplier: 'GadgetHub.ro', price: '2.998 RON' },
  { id: 'stock-2', name: 'Monitor UltraWide', sku: 'MUW-34', category: 'Hardware', stock: 8, minimumStock: 12, supplier: 'GadgetHub.ro', price: '4.497 RON' },
  { id: 'stock-3', name: 'Docking Station AI', sku: 'DSAI-11P', category: 'Accesorii', stock: 126, minimumStock: 30, supplier: 'GadgetHub.ro', price: '5.996 RON' }
];
