import { Briefcase, Layout, ShoppingCart, Users } from 'lucide-react';
import type { MarketplaceModule } from './types';

export const marketplaceModules: MarketplaceModule[] = [
    {
        id: 'crm',
        name: 'CRM Integrat',
        icon: <Users className="w-6 h-6 text-blue-500" />,
        desc: 'Gestionează clienții, prospecții și pipeline-ul de vânzări direct din platformă.'
    },
    {
        id: 'ecommerce',
        name: 'eCommerce',
        icon: <ShoppingCart className="w-6 h-6 text-emerald-500" />,
        desc: 'Lansează rapid un magazin online B2B/B2C sincronizat cu produsele și stocurile.'
    },
    {
        id: 'erp',
        name: 'ERP Cloud',
        icon: <Briefcase className="w-6 h-6 text-amber-500" />,
        desc: 'Sistem avansat pentru planificarea resurselor, facturare, contabilitate.'
    },
    {
        id: 'landing',
        name: 'Landing Page AI',
        icon: <Layout className="w-6 h-6 text-purple-500" />,
        desc: 'Generare automată de website-uri de prezentare bazate pe portofoliul și datele firmei.'
    }
];
