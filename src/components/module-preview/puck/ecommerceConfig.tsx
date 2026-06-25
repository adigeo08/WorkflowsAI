import type { Config, Data } from '@measured/puck';
import type { CatalogItem } from './sharedCatalog';
import { initialCatalogItems } from './sharedCatalog';

type StoreHeaderProps = { logo: string; menuItems: string; cartLabel: string };
type StoreHeroProps = { badge: string; title: string; subtitle: string; primaryCta: string; accentColor: string; backgroundColor: string; textColor: string };
type ProductGridProps = { title: string; columns: string; products?: CatalogItem[] };
type PromoBannerProps = { title: string; subtitle: string; cta: string; backgroundColor: string };
type CheckoutBlockProps = { title: string; steps: string; paymentText: string; shippingText: string };

type EcommerceComponents = {
  StoreHeader: StoreHeaderProps;
  StoreHero: StoreHeroProps;
  ProductGrid: ProductGridProps;
  PromoBanner: PromoBannerProps;
  CheckoutBlock: CheckoutBlockProps;
};

const textField = { type: 'text' } as const;

export const createEcommercePuckConfig = (catalogItems: CatalogItem[] = initialCatalogItems): Config<EcommerceComponents> => ({
  components: {
    StoreHeader: {
      fields: { logo: textField, menuItems: textField, cartLabel: textField },
      defaultProps: { logo: 'GadgetHub', menuItems: 'Produse, Oferte, Suport', cartLabel: 'Coș (3)' },
      render: ({ logo, menuItems, cartLabel }) => (
        <header className="flex items-center justify-between gap-4 px-6 py-6 text-slate-950">
          <strong className="text-2xl font-black">{logo}</strong>
          <nav className="hidden gap-6 text-sm font-bold text-slate-500 md:flex">{menuItems.split(',').map((item) => <span key={item.trim()}>{item.trim()}</span>)}</nav>
          <button className="rounded-full bg-slate-950 px-5 py-2 text-sm font-black text-white">{cartLabel}</button>
        </header>
      )
    },
    StoreHero: {
      fields: { badge: textField, title: textField, subtitle: { type: 'textarea' }, primaryCta: textField, accentColor: textField, backgroundColor: textField, textColor: textField },
      defaultProps: { badge: 'Livrare gratuită peste 500 RON', title: 'Gadgeturi premium pentru echipe moderne.', subtitle: 'Magazin demo cu carduri de produs, filtre, coș și checkout vizual.', primaryCta: 'Cumpără acum', accentColor: '#34d399', backgroundColor: '#020617', textColor: '#ffffff' },
      render: ({ badge, title, subtitle, primaryCta, accentColor, backgroundColor, textColor }) => (
        <section className="grid gap-10 rounded-[2rem] px-6 py-14 md:grid-cols-2" style={{ backgroundColor, color: textColor }}>
          <div><p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold">{badge}</p><h1 className="mt-5 text-5xl font-black leading-tight md:text-6xl">{title}</h1><p className="mt-6 text-lg opacity-80">{subtitle}</p><button className="mt-8 rounded-2xl px-7 py-4 font-black text-slate-950" style={{ backgroundColor: accentColor }}>{primaryCta}</button></div>
          <div className="rounded-[2rem] bg-gradient-to-br from-indigo-500 to-emerald-400 p-8 shadow-2xl"><div className="rounded-3xl bg-white/15 p-6 text-white backdrop-blur"><p className="text-sm text-white/80">Produs recomandat</p><h2 className="mt-3 text-3xl font-black">Smartwatch Pro X</h2><p className="mt-16 text-5xl font-black">8.999 RON</p></div></div>
        </section>
      )
    },
    ProductGrid: {
      fields: { title: textField, columns: textField },
      defaultProps: { title: 'Produse populare', columns: '3' },
      render: (props) => {
        const products = props.products ?? catalogItems;
        return <section className="px-6 py-12"><h2 className="text-3xl font-black text-slate-950">{props.title}</h2><div className="mt-6 grid gap-5" style={{ gridTemplateColumns: `repeat(${Number(props.columns) || 3}, minmax(0, 1fr))` }}>{products.map((product, index) => <article key={product.id} className="rounded-3xl bg-white p-5 text-slate-950 shadow-xl ring-1 ring-slate-100"><div className={`mb-5 h-44 rounded-2xl ${index % 3 === 0 ? 'bg-gradient-to-br from-blue-100 to-indigo-200' : index % 3 === 1 ? 'bg-gradient-to-br from-emerald-100 to-cyan-200' : 'bg-gradient-to-br from-amber-100 to-pink-200'}`} /><h3 className="text-xl font-black">{product.name}</h3><p className="mt-2 text-sm text-slate-500">{product.sku} • {product.category} • stoc {product.stock}</p><div className="mt-5 flex items-center justify-between"><strong>{product.price}</strong><button className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white">Adaugă</button></div></article>)}</div></section>;
      }
    },
    PromoBanner: { fields: { title: textField, subtitle: { type: 'textarea' }, cta: textField, backgroundColor: textField }, defaultProps: { title: 'Upgrade pentru echipe', subtitle: 'Pachete speciale pentru birouri moderne și showroom-uri gadget.', cta: 'Vezi oferta', backgroundColor: '#4f46e5' }, render: ({ title, subtitle, cta, backgroundColor }) => <section className="m-6 rounded-[2rem] p-8 text-white" style={{ backgroundColor }}><h2 className="text-3xl font-black">{title}</h2><p className="mt-2 opacity-80">{subtitle}</p><button className="mt-5 rounded-xl bg-white px-5 py-3 font-black text-slate-950">{cta}</button></section> },
    CheckoutBlock: { fields: { title: textField, steps: textField, paymentText: textField, shippingText: textField }, defaultProps: { title: 'Checkout rapid', steps: 'Date client, Livrare, Plată', paymentText: 'Plată securizată cu cardul', shippingText: 'Livrare în 24-48h pentru produsele în stoc' }, render: ({ title, steps, paymentText, shippingText }) => <section className="px-6 pb-12"><div className="rounded-3xl border border-slate-200 bg-slate-50 p-6"><h2 className="text-2xl font-black text-slate-950">{title}</h2><p className="mt-3 font-bold text-slate-600">{steps}</p><div className="mt-4 grid gap-3 md:grid-cols-2"><p className="rounded-2xl bg-white p-4 text-sm font-bold text-slate-700">{paymentText}</p><p className="rounded-2xl bg-white p-4 text-sm font-bold text-slate-700">{shippingText}</p></div></div></section> }
  }
});

export const ecommerceConfig: Config<EcommerceComponents> = createEcommercePuckConfig();

export const ecommercePuckConfig = ecommerceConfig;

export const defaultEcommercePuckData: Data = { root: { props: {} }, content: [
  { type: 'StoreHeader', props: { id: 'store-header', logo: 'GadgetHub', menuItems: 'Produse, Oferte, Suport', cartLabel: 'Coș (3)' } },
  { type: 'StoreHero', props: { id: 'store-hero', badge: 'Livrare gratuită peste 500 RON', title: 'Gadgeturi premium pentru echipe moderne.', subtitle: 'Magazin demo cu carduri de produs, filtre, coș și checkout vizual.', primaryCta: 'Cumpără acum', accentColor: '#34d399', backgroundColor: '#020617', textColor: '#ffffff' } },
  { type: 'ProductGrid', props: { id: 'product-grid', title: 'Produse populare', columns: '3' } },
  { type: 'PromoBanner', props: { id: 'promo-banner', title: 'Upgrade pentru echipe', subtitle: 'Pachete speciale pentru birouri moderne și showroom-uri gadget.', cta: 'Vezi oferta', backgroundColor: '#4f46e5' } },
  { type: 'CheckoutBlock', props: { id: 'checkout-block', title: 'Checkout rapid', steps: 'Date client, Livrare, Plată', paymentText: 'Plată securizată cu cardul', shippingText: 'Livrare în 24-48h pentru produsele în stoc' } }
] };
