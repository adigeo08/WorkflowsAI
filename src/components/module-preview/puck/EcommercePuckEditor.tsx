import { useMemo } from 'react';
import { createEcommercePuckConfig, defaultEcommercePuckData } from './ecommerceConfig';
import { PuckEditorShell } from './PuckEditorShell';
import { ecommercePuckStorageKey } from './puckStorage';
import type { CatalogItem } from './sharedCatalog';

type Props = { catalogItems: CatalogItem[] };

export function EcommercePuckEditor({ catalogItems }: Props) {
  const config = useMemo(() => createEcommercePuckConfig(catalogItems), [catalogItems]);

  return <PuckEditorShell title="GadgetHub Store" eyebrow="Puck eCommerce Builder" storageKey={ecommercePuckStorageKey} config={config} fallbackData={defaultEcommercePuckData} />;
}
