import { useState, type ReactNode } from 'react';
import {
    ArrowUpRight,
    BarChart3,
    Calendar,
    CreditCard,
    Edit3,
    ExternalLink,
    FileText,
    Plus,
    Save,
    ShoppingCart,
    Trash2,
    Truck,
    X
} from 'lucide-react';
import { marketplaceModules } from '../moduleData';
import type { ModuleId } from '../types';

type Props = {
    activeModulePreview: ModuleId | null;
    onClose: () => void;
};

type CrmTab = 'leads' | 'orders' | 'customers';
type ErpTab = 'invoices' | 'inventory' | 'expenses';
type LeadStatus = 'Nou' | 'Contactat' | 'Calificat' | 'Pierdut';
type LeadSource = 'Website' | 'Recomandare' | 'Campanie' | 'Cold call';
type LeadInterest = 'Website' | 'Magazin online' | 'CRM' | 'ERP' | 'Automatizare';
type OrderStatus = 'Draft' | 'Confirmată' | 'În lucru' | 'Finalizată' | 'Anulată';
type CustomerType = 'Prospect' | 'Activ' | 'Inactiv';
type InvoiceStatus = 'Proformă' | 'Emisă' | 'Plătită' | 'Restantă' | 'Stornată';
type InvoiceDocumentType = 'Factură' | 'Proformă';
type ExpenseStatus = 'Neplătită' | 'Programată' | 'Plătită';
type EcommerceBlockId = 'header' | 'hero' | 'categories' | 'products' | 'banner' | 'cart' | 'checkout';
type LandingBlockId = 'hero' | 'benefits' | 'testimonials' | 'lead-form' | 'pricing' | 'faq' | 'final-cta' | 'footer';

type Lead = {
    id: string;
    company: string;
    contactPerson: string;
    contact: string;
    source: LeadSource;
    interest: LeadInterest;
    estimatedValue: string;
    status: LeadStatus;
};

type Order = {
    id: string;
    customer: string;
    orderNumber: string;
    products: string;
    value: string;
    deliveryDate: string;
    status: OrderStatus;
};

type Customer = {
    id: string;
    company: string;
    fiscalCode: string;
    contactPerson: string;
    email: string;
    phone: string;
    type: CustomerType;
    totalContractsValue: string;
};

type Invoice = {
    id: string;
    documentType: InvoiceDocumentType;
    number: string;
    client: string;
    description: string;
    value: string;
    vat: string;
    dueDate: string;
    status: InvoiceStatus;
};

type InventoryItem = {
    id: string;
    productName: string;
    sku: string;
    category: string;
    quantity: number;
    minimumStock: number;
    supplier: string;
};

type Expense = {
    id: string;
    type: string;
    supplier: string;
    value: string;
    date: string;
    paymentStatus: ExpenseStatus;
    costCenter: string;
};

type BuilderBlock<T extends string> = {
    id: T;
    label: string;
    hint: string;
    settings: Record<string, string>;
};

const emptyLead: Omit<Lead, 'id'> = {
    company: '',
    contactPerson: '',
    contact: '',
    source: 'Website',
    interest: 'CRM',
    estimatedValue: '',
    status: 'Nou'
};

const emptyOrder: Omit<Order, 'id'> = {
    customer: '',
    orderNumber: '',
    products: '',
    value: '',
    deliveryDate: '',
    status: 'Draft'
};

const emptyCustomer: Omit<Customer, 'id'> = {
    company: '',
    fiscalCode: '',
    contactPerson: '',
    email: '',
    phone: '',
    type: 'Prospect',
    totalContractsValue: ''
};

const emptyInvoice: Omit<Invoice, 'id'> = {
    documentType: 'Factură',
    number: '',
    client: '',
    description: '',
    value: '',
    vat: '19%',
    dueDate: '',
    status: 'Emisă'
};

const emptyInventoryItem: Omit<InventoryItem, 'id'> = {
    productName: '',
    sku: '',
    category: '',
    quantity: 0,
    minimumStock: 5,
    supplier: ''
};

const emptyExpense: Omit<Expense, 'id'> = {
    type: '',
    supplier: '',
    value: '',
    date: '',
    paymentStatus: 'Neplătită',
    costCenter: ''
};

const initialLeads: Lead[] = [
    { id: 'lead-1', company: 'GadgetHub.ro', contactPerson: 'Irina Popescu', contact: 'irina@gadgethub.ro', source: 'Website', interest: 'Magazin online', estimatedValue: '18,400 RON', status: 'Nou' },
    { id: 'lead-2', company: 'GadgetHub.ro', contactPerson: 'Irina Popescu', contact: 'irina@gadgethub.ro', source: 'Campanie', interest: 'Automatizare', estimatedValue: '32,000 RON', status: 'Contactat' }
];

const initialOrders: Order[] = [
    { id: 'order-1', customer: 'GadgetHub.ro', orderNumber: 'CMD-2026-018', products: 'Magazin online + CRM comenzi gadgeturi', value: '24,500 RON', deliveryDate: '30 Iun 2026', status: 'Confirmată' },
    { id: 'order-2', customer: 'GadgetHub.ro', orderNumber: 'CMD-2026-019', products: 'ERP stocuri gadgeturi și facturare', value: '42,000 RON', deliveryDate: '08 Iul 2026', status: 'În lucru' }
];

const initialCustomers: Customer[] = [
    { id: 'customer-1', company: 'GadgetHub.ro', fiscalCode: 'RO45890123', contactPerson: 'Irina Popescu', email: 'irina@gadgethub.ro', phone: '0733 410 900', type: 'Activ', totalContractsValue: '52,000 RON' },
    { id: 'customer-2', company: 'GadgetHub.ro', fiscalCode: 'RO45890123', contactPerson: 'Irina Popescu', email: 'irina@gadgethub.ro', phone: '0733 410 900', type: 'Prospect', totalContractsValue: '12,000 RON' }
];

const initialInvoices: Invoice[] = [
    { id: 'invoice-1', documentType: 'Factură', number: 'FCT-2026-001', client: 'GadgetHub.ro', description: 'Abonament CRM comenzi online', value: '12,000 RON', vat: '19%', dueDate: '12 Iun 2026', status: 'Plătită' },
    { id: 'invoice-2', documentType: 'Proformă', number: 'PRO-2026-014', client: 'GadgetHub.ro', description: 'Landing promo accesorii premium', value: '5,500 RON', vat: '19%', dueDate: '18 Iun 2026', status: 'Proformă' },
    { id: 'invoice-3', documentType: 'Factură', number: 'FCT-2026-003', client: 'GadgetHub.ro', description: 'Automatizări ERP pentru stocuri gadgeturi', value: '22,300 RON', vat: '19%', dueDate: '25 Iun 2026', status: 'Restantă' }
];

const initialInventory: InventoryItem[] = [
    { id: 'stock-1', productName: 'Laptop Carbon X', sku: 'LCX-14-PRO', category: 'Hardware', quantity: 42, minimumStock: 10, supplier: 'GadgetHub.ro' },
    { id: 'stock-2', productName: 'Monitor UltraWide', sku: 'MUW-34', category: 'Hardware', quantity: 8, minimumStock: 12, supplier: 'GadgetHub.ro' },
    { id: 'stock-3', productName: 'Licență AI Flow', sku: 'AIF-TEAM', category: 'Software', quantity: 126, minimumStock: 30, supplier: 'GadgetHub.ro' }
];

const initialExpenses: Expense[] = [
    { id: 'expense-1', type: 'Hosting magazin online', supplier: 'GadgetHub.ro', value: '3,200 RON', date: '20 Iun 2026', paymentStatus: 'Programată', costCenter: 'Operațional' },
    { id: 'expense-2', type: 'Campanie PPC smartwatch-uri', supplier: 'GadgetHub.ro', value: '6,800 RON', date: '21 Iun 2026', paymentStatus: 'Neplătită', costCenter: 'Marketing' },
    { id: 'expense-3', type: 'Curierat', supplier: 'GadgetHub.ro', value: '1,780 RON', date: '24 Iun 2026', paymentStatus: 'Plătită', costCenter: 'Vânzări' }
];

const ecommerceBlocks: BuilderBlock<EcommerceBlockId>[] = [
    { id: 'header', label: 'Header', hint: 'Logo, navigație, coș', settings: { Logo: 'GadgetHub', Meniu: 'Produse, Oferte, Suport', 'Badge coș': '3 produse' } },
    { id: 'hero', label: 'Hero promo', hint: 'Mesaj ofertă principală', settings: { Titlu: 'Gadgeturi premium', Subtitlu: 'Livrare gratuită peste 500 RON', 'Text buton': 'Cumpără acum' } },
    { id: 'categories', label: 'Categorii', hint: 'Filtre vizuale pe categorii', settings: { Layout: 'Carduri compacte', Categorii: 'Laptopuri, Monitoare, Accesorii', 'Culoare accent': 'Emerald' } },
    { id: 'products', label: 'Grid produse', hint: 'Carduri produs editabile', settings: { 'Produse pe rând': '3', Rating: 'Vizibil', 'Buton card': 'Adaugă în coș' } },
    { id: 'banner', label: 'Banner ofertă', hint: 'Promoție limitată', settings: { Titlu: 'Upgrade pentru echipe', Discount: '-15%', Fundal: 'Gradient indigo' } },
    { id: 'cart', label: 'Coș', hint: 'Sumar produse selectate', settings: { Stil: 'Drawer dreapta', 'Total dummy': '12,497 RON', 'CTA coș': 'Continuă' } },
    { id: 'checkout', label: 'Checkout', hint: 'Pași finalizare comandă', settings: { Pași: 'Date, Livrare, Plată', 'Metodă plată': 'Card', 'Text final': 'Finalizează comanda' } }
];

const landingBlocks: BuilderBlock<LandingBlockId>[] = [
    { id: 'hero', label: 'Hero', hint: 'Headline și CTA principal', settings: { Headline: 'Automatizează operațiunile', CTA: 'Programează demo', Imagine: 'Dashboard abstract' } },
    { id: 'benefits', label: 'Beneficii', hint: 'Carduri valori cheie', settings: { 'Număr carduri': '3', Layout: 'Grid', Iconuri: 'Lucide minimal' } },
    { id: 'testimonials', label: 'Testimoniale', hint: 'Dovezi sociale', settings: { Format: 'Carousel static', 'Număr citate': '2', Ton: 'B2B' } },
    { id: 'lead-form', label: 'Formular lead generation', hint: 'Captură lead', settings: { Câmpuri: 'Nume, Email, Companie', 'Text formular': 'Primește audit gratuit', GDPR: 'Activ' } },
    { id: 'pricing', label: 'Pricing / Ofertă', hint: 'Plan recomandat', settings: { Preț: 'De la 499 RON/lună', Badge: 'Popular', CTA: 'Alege planul' } },
    { id: 'faq', label: 'FAQ', hint: 'Întrebări frecvente', settings: { 'Număr întrebări': '4', Layout: 'Accordion dummy', Ton: 'Clar' } },
    { id: 'final-cta', label: 'CTA final', hint: 'Închidere conversie', settings: { Headline: 'Gata să începi?', CTA: 'Discută cu un consultant', Fundal: 'Indigo' } },
    { id: 'footer', label: 'Footer', hint: 'Link-uri și legal', settings: { Coloane: '3', 'Link legal': 'Termeni', Social: 'LinkedIn' } }
];

const openHtmlPreview = (title: string, body: string) => {
    const previewWindow = window.open('', '_blank');
    if (!previewWindow) return;

    previewWindow.document.write(`<!doctype html><html lang="ro"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${title}</title><script src="https://cdn.tailwindcss.com"></script></head><body>${body}</body></html>`);
    previewWindow.document.close();
};

const openEcommerceStorePreview = () => {
    openHtmlPreview('Preview magazin eCommerce', `<main class="min-h-screen bg-slate-950 text-white"><nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-6"><strong class="text-2xl">GadgetHub Store</strong><div class="hidden gap-6 text-sm text-slate-300 md:flex"><span>Produse</span><span>Oferte</span><span>Suport</span></div><button class="rounded-full bg-white px-5 py-2 font-bold text-slate-950">Coș (3)</button></nav><section class="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-2"><div><p class="mb-4 inline-flex rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">Livrare gratuită peste 500 RON</p><h1 class="text-5xl font-black leading-tight md:text-7xl">Gadgeturi premium pentru echipe moderne.</h1><p class="mt-6 text-lg text-slate-300">Magazin demo cu carduri de produs, filtre, coș și checkout vizual.</p><button class="mt-8 rounded-2xl bg-emerald-400 px-7 py-4 font-black text-slate-950">Cumpără acum</button></div><div class="rounded-[2rem] bg-gradient-to-br from-indigo-500 to-emerald-400 p-8 shadow-2xl"><div class="rounded-3xl bg-white/15 p-6 backdrop-blur"><p class="text-sm text-white/80">Produs recomandat</p><h2 class="mt-3 text-3xl font-black">Smartwatch Pro X</h2><p class="mt-16 text-5xl font-black">8.999 RON</p></div></div></section><section class="mx-auto grid max-w-6xl gap-5 px-6 pb-20 md:grid-cols-3">${['Laptop Carbon X','Monitor UltraWide','Docking Station AI'].map((p,i)=>`<article class="rounded-3xl bg-white p-5 text-slate-950 shadow-xl"><div class="mb-5 h-44 rounded-2xl bg-gradient-to-br ${i===0?'from-blue-100 to-indigo-200':i===1?'from-emerald-100 to-cyan-200':'from-amber-100 to-pink-200'}"></div><h3 class="text-xl font-black">${p}</h3><p class="mt-2 text-sm text-slate-500">Stoc disponibil • rating 4.9</p><div class="mt-5 flex items-center justify-between"><strong>${(i+2)*1499} RON</strong><button class="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white">Adaugă</button></div></article>`).join('')}</section></main>`);
};

const openLandingFullPreview = () => {
    openHtmlPreview('Preview landing page', `<main class="min-h-screen bg-white"><section class="bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-950 px-6 py-24 text-white"><div class="mx-auto max-w-5xl text-center"><span class="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">Landing page demo full-screen</span><h1 class="mt-8 text-5xl font-black leading-tight md:text-7xl">Transformă catalogul GadgetHub în comenzi online în câteva minute.</h1><p class="mx-auto mt-6 max-w-2xl text-xl text-indigo-100">Hero, beneficii, testimoniale și call-to-action într-o pagină completă generată cu date dummy.</p><button class="mt-10 rounded-2xl bg-white px-8 py-4 font-black text-indigo-950">Programează demo</button></div></section><section class="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-3">${['Analiză instant','Rapoarte AI','Integrări rapide'].map(t=>`<div class="rounded-3xl border border-slate-200 p-8 shadow-sm"><h2 class="text-2xl font-black text-slate-900">${t}</h2><p class="mt-3 text-slate-500">Conținut demo bazat pe datele GadgetHub.ro.</p></div>`).join('')}</section><section class="bg-slate-50 px-6 py-20 text-center"><h2 class="text-4xl font-black text-slate-900">Gata să începi?</h2><p class="mt-3 text-slate-500">Acesta este preview-ul într-o pagină separată.</p></section></main>`);
};

const createId = (prefix: string) =>
    `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export function ModulePreviewModal({ activeModulePreview, onClose }: Props) {
    if (!activeModulePreview) return null;

    const activeModule = marketplaceModules.find((module) => module.id === activeModulePreview);

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
            <div className="max-h-[92vh] w-full max-w-7xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-300 md:p-10" onClick={(e) => e.stopPropagation()}>
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="flex items-center gap-3 text-2xl font-bold">
                        {activeModule?.icon}
                        Previzualizare {activeModule?.name}
                    </h2>
                    <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-100"><X className="h-5 w-5" /></button>
                </div>

                {activeModulePreview === 'crm' && <CrmPreview />}
                {activeModulePreview === 'ecommerce' && <EcommerceBuilderPreview />}
                {activeModulePreview === 'erp' && <ErpPreview />}
                {activeModulePreview === 'landing' && <LandingBuilderPreview />}
            </div>
        </div>
    );
}

function CrmPreview() {
    const [activeCrmTab, setActiveCrmTab] = useState<CrmTab>('leads');
    const [leads, setLeads] = useState<Lead[]>(initialLeads);
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
    const [leadDraft, setLeadDraft] = useState<Omit<Lead, 'id'>>(emptyLead);
    const [orderDraft, setOrderDraft] = useState<Omit<Order, 'id'>>(emptyOrder);
    const [customerDraft, setCustomerDraft] = useState<Omit<Customer, 'id'>>(emptyCustomer);
    const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
    const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
    const [editingCustomerId, setEditingCustomerId] = useState<string | null>(null);

    const convertLeadToCustomer = (lead: Lead) => {
        setCustomers((prev) => [...prev, { id: createId('customer'), company: lead.company, fiscalCode: 'RO-DUMMY', contactPerson: lead.contactPerson, email: lead.contact.includes('@') ? lead.contact : 'contact@client-demo.ro', phone: lead.contact.includes('@') ? '0700 000 000' : lead.contact, type: 'Prospect', totalContractsValue: lead.estimatedValue }]);
        setLeads((prev) => prev.map((item) => item.id === lead.id ? { ...item, status: 'Calificat' } : item));
        setActiveCrmTab('customers');
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <MetricCard color="blue" label="Lead-uri active" value={`${leads.length}`} change="pipeline separat" />
                <MetricCard color="emerald" label="Comenzi în lucru" value={`${orders.filter((order) => order.status === 'În lucru' || order.status === 'Confirmată').length}`} change="flux operațional" />
                <MetricCard color="purple" label="Clienți activi" value={`${customers.filter((customer) => customer.type === 'Activ').length}`} change="portofoliu curat" />
            </div>
            <CrmTabs activeTab={activeCrmTab} onTabChange={setActiveCrmTab} counts={{ leads: leads.length, orders: orders.length, customers: customers.length }} />
            {activeCrmTab === 'leads' && <LeadForm leads={leads} draft={leadDraft} editingId={editingLeadId} onDraftChange={setLeadDraft} onSubmit={() => { if (!leadDraft.company.trim()) return; setLeads((prev) => editingLeadId ? prev.map((lead) => lead.id === editingLeadId ? { ...leadDraft, id: editingLeadId } : lead) : [...prev, { ...leadDraft, id: createId('lead') }]); setEditingLeadId(null); setLeadDraft(emptyLead); }} onEdit={(lead) => { setEditingLeadId(lead.id); setLeadDraft(lead); }} onDelete={(id) => setLeads((prev) => prev.filter((lead) => lead.id !== id))} onQualify={(id) => setLeads((prev) => prev.map((lead) => lead.id === id ? { ...lead, status: 'Calificat' } : lead))} onConvert={convertLeadToCustomer} />}
            {activeCrmTab === 'orders' && <OrderForm orders={orders} draft={orderDraft} editingId={editingOrderId} onDraftChange={setOrderDraft} onSubmit={() => { if (!orderDraft.customer.trim()) return; setOrders((prev) => editingOrderId ? prev.map((order) => order.id === editingOrderId ? { ...orderDraft, id: editingOrderId } : order) : [...prev, { ...orderDraft, id: createId('order') }]); setEditingOrderId(null); setOrderDraft(emptyOrder); }} onEdit={(order) => { setEditingOrderId(order.id); setOrderDraft(order); }} onDelete={(id) => setOrders((prev) => prev.filter((order) => order.id !== id))} onStatusChange={(id, status) => setOrders((prev) => prev.map((order) => order.id === id ? { ...order, status } : order))} />}
            {activeCrmTab === 'customers' && <CustomerForm customers={customers} draft={customerDraft} editingId={editingCustomerId} onDraftChange={setCustomerDraft} onSubmit={() => { if (!customerDraft.company.trim()) return; setCustomers((prev) => editingCustomerId ? prev.map((customer) => customer.id === editingCustomerId ? { ...customerDraft, id: editingCustomerId } : customer) : [...prev, { ...customerDraft, id: createId('customer') }]); setEditingCustomerId(null); setCustomerDraft(emptyCustomer); }} onEdit={(customer) => { setEditingCustomerId(customer.id); setCustomerDraft(customer); }} onDelete={(id) => setCustomers((prev) => prev.filter((customer) => customer.id !== id))} />}
        </div>
    );
}

function CrmTabs({ activeTab, onTabChange, counts }: { activeTab: CrmTab; onTabChange: (tab: CrmTab) => void; counts: Record<CrmTab, number> }) {
    return <TabBar tabs={[{ id: 'leads', label: 'Lead-uri', count: counts.leads }, { id: 'orders', label: 'Comenzi', count: counts.orders }, { id: 'customers', label: 'Clienți', count: counts.customers }]} activeTab={activeTab} onTabChange={onTabChange} />;
}

function LeadForm({ leads, draft, editingId, onDraftChange, onSubmit, onEdit, onDelete, onQualify, onConvert }: { leads: Lead[]; draft: Omit<Lead, 'id'>; editingId: string | null; onDraftChange: (draft: Omit<Lead, 'id'>) => void; onSubmit: () => void; onEdit: (lead: Lead) => void; onDelete: (id: string) => void; onQualify: (id: string) => void; onConvert: (lead: Lead) => void }) {
    return <section className="rounded-3xl border border-blue-100 bg-blue-50/50 p-5"><FormHeader title="Lead-uri" description="Califică oportunități înainte de conversia în client." buttonLabel={editingId ? 'Salvează lead' : 'Adaugă lead'} onSubmit={onSubmit} /><div className="mt-5 grid gap-3 md:grid-cols-4"><TextInput value={draft.company} onChange={(company) => onDraftChange({ ...draft, company })} placeholder="Companie" /><TextInput value={draft.contactPerson} onChange={(contactPerson) => onDraftChange({ ...draft, contactPerson })} placeholder="Persoană contact" /><TextInput value={draft.contact} onChange={(contact) => onDraftChange({ ...draft, contact })} placeholder="Telefon/email" /><SelectInput value={draft.source} onChange={(source) => onDraftChange({ ...draft, source: source as LeadSource })} options={['Website', 'Recomandare', 'Campanie', 'Cold call']} /><SelectInput value={draft.interest} onChange={(interest) => onDraftChange({ ...draft, interest: interest as LeadInterest })} options={['Website', 'Magazin online', 'CRM', 'ERP', 'Automatizare']} /><TextInput value={draft.estimatedValue} onChange={(estimatedValue) => onDraftChange({ ...draft, estimatedValue })} placeholder="Valoare estimată" /><SelectInput value={draft.status} onChange={(status) => onDraftChange({ ...draft, status: status as LeadStatus })} options={['Nou', 'Contactat', 'Calificat', 'Pierdut']} /></div><div className="mt-5 grid gap-3 lg:grid-cols-2">{leads.map((lead) => <EntityCard key={lead.id} title={lead.company} subtitle={`${lead.contactPerson} • ${lead.contact}`} badge={lead.status} meta={`${lead.source} • ${lead.interest} • ${lead.estimatedValue}`} onEdit={() => onEdit(lead)} onDelete={() => onDelete(lead.id)} extraActions={<><button onClick={() => onQualify(lead.id)} className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">Calificat</button><button onClick={() => onConvert(lead)} className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white">Conversie client</button></>} />)}</div></section>;
}

function OrderForm({ orders, draft, editingId, onDraftChange, onSubmit, onEdit, onDelete, onStatusChange }: { orders: Order[]; draft: Omit<Order, 'id'>; editingId: string | null; onDraftChange: (draft: Omit<Order, 'id'>) => void; onSubmit: () => void; onEdit: (order: Order) => void; onDelete: (id: string) => void; onStatusChange: (id: string, status: OrderStatus) => void }) {
    return <section className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-5"><FormHeader title="Comenzi" description="Gestionează comenzi distinct de lead-uri și clienți." buttonLabel={editingId ? 'Salvează comandă' : 'Adaugă comandă'} onSubmit={onSubmit} /><div className="mt-5 grid gap-3 md:grid-cols-3"><TextInput value={draft.customer} onChange={(customer) => onDraftChange({ ...draft, customer })} placeholder="Client" /><TextInput value={draft.orderNumber} onChange={(orderNumber) => onDraftChange({ ...draft, orderNumber })} placeholder="Număr comandă" /><TextInput value={draft.products} onChange={(products) => onDraftChange({ ...draft, products })} placeholder="Produse/servicii" /><TextInput value={draft.value} onChange={(value) => onDraftChange({ ...draft, value })} placeholder="Valoare" /><TextInput value={draft.deliveryDate} onChange={(deliveryDate) => onDraftChange({ ...draft, deliveryDate })} placeholder="Data livrării" /><SelectInput value={draft.status} onChange={(status) => onDraftChange({ ...draft, status: status as OrderStatus })} options={['Draft', 'Confirmată', 'În lucru', 'Finalizată', 'Anulată']} /></div><DataTable headers={['Comandă', 'Client', 'Produse', 'Valoare', 'Livrare', 'Status', 'Acțiuni']}>{orders.map((order) => <tr key={order.id} className="border-t border-slate-100"><td className="p-3 font-bold">{order.orderNumber}</td><td className="p-3">{order.customer}</td><td className="p-3">{order.products}</td><td className="p-3 font-semibold">{order.value}</td><td className="p-3">{order.deliveryDate}</td><td className="p-3"><SelectInput value={order.status} onChange={(status) => onStatusChange(order.id, status as OrderStatus)} options={['Draft', 'Confirmată', 'În lucru', 'Finalizată', 'Anulată']} compact /></td><td className="p-3"><RowActions onEdit={() => onEdit(order)} onDelete={() => onDelete(order.id)} /></td></tr>)}</DataTable></section>;
}

function CustomerForm({ customers, draft, editingId, onDraftChange, onSubmit, onEdit, onDelete }: { customers: Customer[]; draft: Omit<Customer, 'id'>; editingId: string | null; onDraftChange: (draft: Omit<Customer, 'id'>) => void; onSubmit: () => void; onEdit: (customer: Customer) => void; onDelete: (id: string) => void }) {
    return <section className="rounded-3xl border border-purple-100 bg-purple-50/50 p-5"><FormHeader title="Clienți" description="Portofoliu cu date fiscale, contact și sumar comercial." buttonLabel={editingId ? 'Salvează client' : 'Adaugă client'} onSubmit={onSubmit} /><div className="mt-5 grid gap-3 md:grid-cols-4"><TextInput value={draft.company} onChange={(company) => onDraftChange({ ...draft, company })} placeholder="Companie" /><TextInput value={draft.fiscalCode} onChange={(fiscalCode) => onDraftChange({ ...draft, fiscalCode })} placeholder="CUI" /><TextInput value={draft.contactPerson} onChange={(contactPerson) => onDraftChange({ ...draft, contactPerson })} placeholder="Persoană contact" /><TextInput value={draft.email} onChange={(email) => onDraftChange({ ...draft, email })} placeholder="Email" /><TextInput value={draft.phone} onChange={(phone) => onDraftChange({ ...draft, phone })} placeholder="Telefon" /><SelectInput value={draft.type} onChange={(type) => onDraftChange({ ...draft, type: type as CustomerType })} options={['Prospect', 'Activ', 'Inactiv']} /><TextInput value={draft.totalContractsValue} onChange={(totalContractsValue) => onDraftChange({ ...draft, totalContractsValue })} placeholder="Valoare contracte" /></div><div className="mt-5 grid gap-3 lg:grid-cols-2">{customers.map((customer) => <EntityCard key={customer.id} title={customer.company} subtitle={`${customer.contactPerson} • ${customer.email} • ${customer.phone}`} badge={customer.type} meta={`CUI ${customer.fiscalCode} • Contracte ${customer.totalContractsValue}`} onEdit={() => onEdit(customer)} onDelete={() => onDelete(customer.id)} extraActions={<button className="rounded-lg bg-purple-50 px-3 py-2 text-xs font-bold text-purple-700">Vezi sumar</button>} />)}</div></section>;
}

function ErpPreview() {
    const [activeErpTab, setActiveErpTab] = useState<ErpTab>('invoices');
    const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
    const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
    const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
    const [invoiceDraft, setInvoiceDraft] = useState<Omit<Invoice, 'id'>>(emptyInvoice);
    const [inventoryDraft, setInventoryDraft] = useState<Omit<InventoryItem, 'id'>>(emptyInventoryItem);
    const [expenseDraft, setExpenseDraft] = useState<Omit<Expense, 'id'>>(emptyExpense);
    const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null);
    const [editingInventoryId, setEditingInventoryId] = useState<string | null>(null);
    const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <ErpKpi icon={<CreditCard className="h-10 w-10 rounded-xl bg-amber-100 p-2 text-amber-600" />} label="Conturi de încasat" value="48,200 RON" />
                <ErpKpi icon={<Truck className="h-10 w-10 rounded-xl bg-red-100 p-2 text-red-600" />} label="Stocuri minime" value={`${inventory.filter((item) => item.quantity <= item.minimumStock).length} Produse`} />
                <ErpKpi icon={<BarChart3 className="h-10 w-10 rounded-xl bg-emerald-100 p-2 text-emerald-600" />} label="Profit Net (T3)" value="112,800 RON" />
            </div>

            <ErpTabs activeTab={activeErpTab} onTabChange={setActiveErpTab} counts={{ invoices: invoices.length, inventory: inventory.length, expenses: expenses.length }} />

            {activeErpTab === 'invoices' && (
                <InvoiceForm
                    invoices={invoices}
                    draft={invoiceDraft}
                    editingId={editingInvoiceId}
                    onDraftChange={setInvoiceDraft}
                    onSubmit={() => {
                        if (!invoiceDraft.client.trim()) return;

                        setInvoices((prev) =>
                            editingInvoiceId
                                ? prev.map((invoice) => invoice.id === editingInvoiceId ? { ...invoiceDraft, id: editingInvoiceId } : invoice)
                                : [...prev, { ...invoiceDraft, id: createId('invoice') }]
                        );

                        setEditingInvoiceId(null);
                        setInvoiceDraft(emptyInvoice);
                    }}
                    onEdit={(invoice) => {
                        setEditingInvoiceId(invoice.id);
                        setInvoiceDraft(invoice);
                    }}
                />
            )}

            {activeErpTab === 'inventory' && (
                <InventoryForm
                    inventory={inventory}
                    draft={inventoryDraft}
                    editingId={editingInventoryId}
                    onDraftChange={setInventoryDraft}
                    onSubmit={() => {
                        if (!inventoryDraft.productName.trim()) return;

                        setInventory((prev) =>
                            editingInventoryId
                                ? prev.map((item) => item.id === editingInventoryId ? { ...inventoryDraft, id: editingInventoryId } : item)
                                : [...prev, { ...inventoryDraft, id: createId('stock') }]
                        );

                        setEditingInventoryId(null);
                        setInventoryDraft(emptyInventoryItem);
                    }}
                    onEdit={(item) => {
                        setEditingInventoryId(item.id);
                        setInventoryDraft(item);
                    }}
                    onAdjust={(id, amount) => setInventory((prev) => prev.map((item) => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item))}
                />
            )}

            {activeErpTab === 'expenses' && (
                <ExpenseForm
                    expenses={expenses}
                    draft={expenseDraft}
                    editingId={editingExpenseId}
                    onDraftChange={setExpenseDraft}
                    onSubmit={() => {
                        if (!expenseDraft.type.trim()) return;

                        setExpenses((prev) =>
                            editingExpenseId
                                ? prev.map((expense) => expense.id === editingExpenseId ? { ...expenseDraft, id: editingExpenseId } : expense)
                                : [...prev, { ...expenseDraft, id: createId('expense') }]
                        );

                        setEditingExpenseId(null);
                        setExpenseDraft(emptyExpense);
                    }}
                    onEdit={(expense) => {
                        setEditingExpenseId(expense.id);
                        setExpenseDraft(expense);
                    }}
                    onDelete={(id) => setExpenses((prev) => prev.filter((expense) => expense.id !== id))}
                />
            )}
        </div>
    );
}

function ErpTabs({ activeTab, onTabChange, counts }: { activeTab: ErpTab; onTabChange: (tab: ErpTab) => void; counts: Record<ErpTab, number> }) {
    return <TabBar tabs={[{ id: 'invoices', label: 'Facturi', count: counts.invoices }, { id: 'inventory', label: 'Stocuri', count: counts.inventory }, { id: 'expenses', label: 'Cheltuieli', count: counts.expenses }]} activeTab={activeTab} onTabChange={onTabChange} />;
}

function InvoiceForm({ invoices, draft, editingId, onDraftChange, onSubmit, onEdit }: { invoices: Invoice[]; draft: Omit<Invoice, 'id'>; editingId: string | null; onDraftChange: (draft: Omit<Invoice, 'id'>) => void; onSubmit: () => void; onEdit: (invoice: Invoice) => void }) {
    const editActions = editingId ? (
        <EditActionPanel
            title="Acțiuni document"
            description="Acțiunile de status apar doar când editezi documentul selectat."
            status={draft.status}
        >
            <button type="button" onClick={() => onDraftChange({ ...draft, status: 'Emisă' })} className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 hover:bg-amber-100">Marchează emisă</button>
            <button type="button" onClick={() => onDraftChange({ ...draft, status: 'Plătită' })} className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100">Marchează plătită</button>
            <button type="button" onClick={() => onDraftChange({ ...draft, status: 'Restantă' })} className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-100">Marchează restantă</button>
            <button type="button" onClick={() => onDraftChange({ ...draft, status: 'Stornată' })} className="rounded-lg bg-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-300">Stornează</button>
        </EditActionPanel>
    ) : null;

    return (
        <section className="rounded-3xl border border-amber-100 bg-amber-50/60 p-5">
            <FormHeader
                title="Emitere factură / proformă"
                description="Flux operațional pentru documente, scadențe, plăți și stornări."
                buttonLabel={editingId ? 'Salvează document' : 'Emite document'}
                onSubmit={onSubmit}
                icon={<FileText className="h-4 w-4" />}
                secondaryActions={editActions}
            />

            <div className="mt-5 grid gap-3 md:grid-cols-4">
                <SelectInput
                    value={draft.documentType}
                    onChange={(documentType) => {
                        const nextDocumentType = documentType as InvoiceDocumentType;

                        onDraftChange({
                            ...draft,
                            documentType: nextDocumentType,
                            status: nextDocumentType === 'Proformă'
                                ? 'Proformă'
                                : draft.status === 'Proformă'
                                    ? 'Emisă'
                                    : draft.status
                        });
                    }}
                    options={['Factură', 'Proformă']}
                />
                <TextInput value={draft.number} onChange={(number) => onDraftChange({ ...draft, number })} placeholder="Număr" />
                <TextInput value={draft.client} onChange={(client) => onDraftChange({ ...draft, client })} placeholder="Client" />
                <TextInput value={draft.description} onChange={(description) => onDraftChange({ ...draft, description })} placeholder="Descriere" />
                <TextInput value={draft.value} onChange={(value) => onDraftChange({ ...draft, value })} placeholder="Valoare" />
                <TextInput value={draft.vat} onChange={(vat) => onDraftChange({ ...draft, vat })} placeholder="TVA" />
                <TextInput value={draft.dueDate} onChange={(dueDate) => onDraftChange({ ...draft, dueDate })} placeholder="Scadență" />
                <SelectInput value={draft.status} onChange={(status) => onDraftChange({ ...draft, status: status as InvoiceStatus })} options={['Proformă', 'Emisă', 'Plătită', 'Restantă', 'Stornată']} />
            </div>

            <DataTable headers={['Tip', 'Număr', 'Client', 'Descriere', 'Valoare', 'TVA', 'Scadență', 'Status', 'Acțiuni']}>
                {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-t border-slate-100">
                        <td className="p-3">{invoice.documentType}</td>
                        <td className="p-3 font-bold">{invoice.number}</td>
                        <td className="p-3">{invoice.client}</td>
                        <td className="p-3">{invoice.description}</td>
                        <td className="p-3 font-semibold">{invoice.value}</td>
                        <td className="p-3">{invoice.vat}</td>
                        <td className="p-3"><span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{invoice.dueDate}</span></td>
                        <td className="p-3"><StatusBadge status={invoice.status} /></td>
                        <td className="p-3">
                            <button type="button" onClick={() => onEdit(invoice)} className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100">
                                <Edit3 className="h-4 w-4" />
                            </button>
                        </td>
                    </tr>
                ))}
            </DataTable>
        </section>
    );
}

function InventoryForm({ inventory, draft, editingId, onDraftChange, onSubmit, onEdit, onAdjust }: { inventory: InventoryItem[]; draft: Omit<InventoryItem, 'id'>; editingId: string | null; onDraftChange: (draft: Omit<InventoryItem, 'id'>) => void; onSubmit: () => void; onEdit: (item: InventoryItem) => void; onAdjust: (id: string, amount: number) => void }) {
    return <section className="rounded-3xl border border-blue-100 bg-blue-50/50 p-5"><FormHeader title="Produse și stocuri" description="Recepții, scăderi și alertă pentru stoc minim." buttonLabel={editingId ? 'Salvează produs' : 'Adaugă produs'} onSubmit={onSubmit} /><div className="mt-5 grid gap-3 md:grid-cols-3"><TextInput value={draft.productName} onChange={(productName) => onDraftChange({ ...draft, productName })} placeholder="Nume produs" /><TextInput value={draft.sku} onChange={(sku) => onDraftChange({ ...draft, sku })} placeholder="SKU" /><TextInput value={draft.category} onChange={(category) => onDraftChange({ ...draft, category })} placeholder="Categorie" /><NumberInput value={draft.quantity} onChange={(quantity) => onDraftChange({ ...draft, quantity })} placeholder="Cantitate" /><NumberInput value={draft.minimumStock} onChange={(minimumStock) => onDraftChange({ ...draft, minimumStock })} placeholder="Stoc minim" /><TextInput value={draft.supplier} onChange={(supplier) => onDraftChange({ ...draft, supplier })} placeholder="Furnizor" /></div><DataTable headers={['Produs', 'SKU', 'Categorie', 'Cantitate', 'Stoc minim', 'Furnizor', 'Acțiuni']}>{inventory.map((item) => <tr key={item.id} className="border-t border-slate-100"><td className="p-3 font-bold">{item.productName}</td><td className="p-3">{item.sku}</td><td className="p-3">{item.category}</td><td className="p-3 font-semibold">{item.quantity} buc.</td><td className="p-3"><span className={`rounded-full px-3 py-1 text-xs font-bold ${item.quantity <= item.minimumStock ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>{item.quantity <= item.minimumStock ? 'Sub minim' : `Min. ${item.minimumStock}`}</span></td><td className="p-3">{item.supplier}</td><td className="p-3"><div className="flex flex-wrap gap-2"><button onClick={() => onAdjust(item.id, 5)} className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">Recepție +5</button><button onClick={() => onAdjust(item.id, -1)} className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700">Scădere -1</button><button onClick={() => onEdit(item)} className="rounded-lg bg-blue-50 p-2 text-blue-600"><Edit3 className="h-4 w-4" /></button></div></td></tr>)}</DataTable></section>;
}

function ExpenseForm({ expenses, draft, editingId, onDraftChange, onSubmit, onEdit, onDelete }: { expenses: Expense[]; draft: Omit<Expense, 'id'>; editingId: string | null; onDraftChange: (draft: Omit<Expense, 'id'>) => void; onSubmit: () => void; onEdit: (expense: Expense) => void; onDelete: (id: string) => void }) {
    const costCenters = Array.from(new Set(expenses.map((expense) => expense.costCenter)));

    const editActions = editingId ? (
        <EditActionPanel
            title="Acțiuni plată"
            description="Schimbarea statusului de plată se face din zona de editare, nu din rândul tabelului."
            status={draft.paymentStatus}
        >
            <button type="button" onClick={() => onDraftChange({ ...draft, paymentStatus: 'Neplătită' })} className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-100">Neplătită</button>
            <button type="button" onClick={() => onDraftChange({ ...draft, paymentStatus: 'Programată' })} className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 hover:bg-amber-100">Programată</button>
            <button type="button" onClick={() => onDraftChange({ ...draft, paymentStatus: 'Plătită' })} className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100">Plătită</button>
        </EditActionPanel>
    ) : null;

    return (
        <section className="rounded-3xl border border-rose-100 bg-rose-50/50 p-5">
            <FormHeader
                title="Cheltuieli"
                description="Urmărește furnizori, centre de cost și status de plată."
                buttonLabel={editingId ? 'Salvează cheltuială' : 'Adaugă cheltuială'}
                onSubmit={onSubmit}
                secondaryActions={editActions}
            />

            <div className="mt-5 grid gap-3 md:grid-cols-3">
                <TextInput value={draft.type} onChange={(type) => onDraftChange({ ...draft, type })} placeholder="Tip cheltuială" />
                <TextInput value={draft.supplier} onChange={(supplier) => onDraftChange({ ...draft, supplier })} placeholder="Furnizor" />
                <TextInput value={draft.value} onChange={(value) => onDraftChange({ ...draft, value })} placeholder="Valoare" />
                <TextInput value={draft.date} onChange={(date) => onDraftChange({ ...draft, date })} placeholder="Data" />
                <SelectInput value={draft.paymentStatus} onChange={(paymentStatus) => onDraftChange({ ...draft, paymentStatus: paymentStatus as ExpenseStatus })} options={['Neplătită', 'Programată', 'Plătită']} />
                <TextInput value={draft.costCenter} onChange={(costCenter) => onDraftChange({ ...draft, costCenter })} placeholder="Centru de cost" />
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
                {costCenters.map((center) => <div key={center} className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs font-bold uppercase text-slate-400">{center}</p><p className="mt-1 text-2xl font-black text-slate-900">{expenses.filter((expense) => expense.costCenter === center).length}</p><p className="text-sm text-slate-500">cheltuieli GadgetHub</p></div>)}
            </div>

            <DataTable headers={['Tip', 'Furnizor', 'Valoare', 'Data', 'Status plată', 'Centru cost', 'Acțiuni']}>
                {expenses.map((expense) => (
                    <tr key={expense.id} className="border-t border-slate-100">
                        <td className="p-3 font-bold">{expense.type}</td>
                        <td className="p-3">{expense.supplier}</td>
                        <td className="p-3 font-semibold">{expense.value}</td>
                        <td className="p-3">{expense.date}</td>
                        <td className="p-3"><StatusBadge status={expense.paymentStatus} /></td>
                        <td className="p-3">{expense.costCenter}</td>
                        <td className="p-3">
                            <div className="flex gap-2">
                                <button onClick={() => onEdit(expense)} className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"><Edit3 className="h-4 w-4" /></button>
                                <button onClick={() => onDelete(expense.id)} className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"><Trash2 className="h-4 w-4" /></button>
                            </div>
                        </td>
                    </tr>
                ))}
            </DataTable>
        </section>
    );
}

function EcommerceBuilderPreview() {
    const [selectedEcommerceBlock, setSelectedEcommerceBlock] = useState<EcommerceBlockId>('hero');
    return <BuilderShell title="GadgetHub Store" eyebrow="eCommerce Builder" onPreview={openEcommerceStorePreview} sidebar={<BuilderSidebar<EcommerceBlockId> blocks={ecommerceBlocks} selectedId={selectedEcommerceBlock} onSelect={setSelectedEcommerceBlock} />} canvas={<BuilderCanvas><EcommerceCanvas selectedBlock={selectedEcommerceBlock} onSelect={setSelectedEcommerceBlock} /></BuilderCanvas>} properties={<BuilderPropertiesPanel block={ecommerceBlocks.find((block) => block.id === selectedEcommerceBlock) ?? ecommerceBlocks[0]} />} />;
}

function LandingBuilderPreview() {
    const [selectedLandingBlock, setSelectedLandingBlock] = useState<LandingBlockId>('hero');
    return <BuilderShell title="AI Operations Landing" eyebrow="Landing Page Builder" onPreview={openLandingFullPreview} sidebar={<BuilderSidebar<LandingBlockId> blocks={landingBlocks} selectedId={selectedLandingBlock} onSelect={setSelectedLandingBlock} />} canvas={<BuilderCanvas><LandingCanvas selectedBlock={selectedLandingBlock} onSelect={setSelectedLandingBlock} /></BuilderCanvas>} properties={<BuilderPropertiesPanel block={landingBlocks.find((block) => block.id === selectedLandingBlock) ?? landingBlocks[0]} />} />;
}

function BuilderShell({ title, eyebrow, sidebar, canvas, properties, onPreview }: { title: string; eyebrow: string; sidebar: ReactNode; canvas: ReactNode; properties: ReactNode; onPreview: () => void }) {
    return <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50"><div className="flex flex-col gap-3 border-b border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">{eyebrow}</p><h3 className="text-xl font-black text-slate-900">{title}</h3></div><div className="flex gap-2"><button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white"><Save className="h-4 w-4" /> Save</button><button onClick={onPreview} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"><ExternalLink className="h-4 w-4" /> Preview</button></div></div><div className="grid min-h-[620px] gap-0 lg:grid-cols-[240px_1fr_280px]">{sidebar}{canvas}{properties}</div></div>;
}

function BuilderSidebar<T extends string>({ blocks, selectedId, onSelect }: { blocks: BuilderBlock<T>[]; selectedId: T; onSelect: (id: T) => void }) {
    return <aside className="border-b border-slate-200 bg-white p-4 lg:border-b-0 lg:border-r"><h4 className="mb-3 text-sm font-black text-slate-900">Secțiuni / componente</h4><div className="space-y-2">{blocks.map((block) => <button key={block.id} onClick={() => onSelect(block.id)} className={`w-full rounded-2xl border p-3 text-left transition ${selectedId === block.id ? 'border-indigo-200 bg-indigo-50 text-indigo-900' : 'border-slate-100 bg-white text-slate-700 hover:bg-slate-50'}`}><span className="block text-sm font-black">{block.label}</span><span className="text-xs text-slate-500">{block.hint}</span></button>)}</div></aside>;
}

function BuilderCanvas({ children }: { children: ReactNode }) {
    return <main className="bg-slate-100 p-4"><div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">{children}</div></main>;
}

function BuilderPropertiesPanel<T extends string>({ block }: { block: BuilderBlock<T> }) {
    return <aside className="border-t border-slate-200 bg-white p-4 lg:border-l lg:border-t-0"><h4 className="text-sm font-black text-slate-900">Proprietăți</h4><p className="mt-1 text-xs text-slate-500">Setări demo GadgetHub pentru: {block.label}</p><div className="mt-4 space-y-3">{Object.entries(block.settings).map(([key, value]) => <label key={key} className="block"><span className="text-xs font-bold text-slate-500">{key}</span><input readOnly value={value} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700" /></label>)}</div></aside>;
}

function EcommerceCanvas({ selectedBlock, onSelect }: { selectedBlock: EcommerceBlockId; onSelect: (block: EcommerceBlockId) => void }) {
    return <div className="space-y-3 text-slate-900"><CanvasSection id="header" selectedId={selectedBlock} onSelect={onSelect}><div className="flex items-center justify-between"><strong>GadgetHub</strong><div className="flex gap-3 text-xs text-slate-500"><span>Produse</span><span>Oferte</span><span>Suport</span></div><ShoppingCart className="h-4 w-4" /></div></CanvasSection><CanvasSection id="hero" selectedId={selectedBlock} onSelect={onSelect}><div className="rounded-2xl bg-slate-950 p-6 text-white"><p className="text-xs font-bold text-emerald-300">Livrare gratuită peste 500 RON</p><h1 className="mt-2 text-3xl font-black">Gadgeturi premium pentru echipe moderne.</h1><button className="mt-4 rounded-xl bg-emerald-400 px-4 py-2 text-sm font-black text-slate-950">Cumpără acum</button></div></CanvasSection><CanvasSection id="categories" selectedId={selectedBlock} onSelect={onSelect}><div className="grid grid-cols-3 gap-2">{['Laptopuri', 'Monitoare', 'Accesorii'].map((category) => <div key={category} className="rounded-xl bg-slate-100 p-3 text-center text-xs font-bold">{category}</div>)}</div></CanvasSection><CanvasSection id="products" selectedId={selectedBlock} onSelect={onSelect}><div className="grid gap-3 md:grid-cols-3">{['Laptop Carbon X', 'Monitor UltraWide', 'Docking AI'].map((product, index) => <div key={product} className="rounded-2xl border border-slate-100 p-3"><div className={`h-20 rounded-xl ${index === 0 ? 'bg-blue-100' : index === 1 ? 'bg-emerald-100' : 'bg-amber-100'}`} /><p className="mt-2 text-sm font-black">{product}</p><p className="text-xs text-slate-500">{(index + 2) * 1499} RON</p></div>)}</div></CanvasSection><CanvasSection id="banner" selectedId={selectedBlock} onSelect={onSelect}><div className="rounded-2xl bg-indigo-50 p-4 text-sm font-bold text-indigo-800">Banner ofertă: -15% pentru setup complet.</div></CanvasSection><div className="grid gap-3 md:grid-cols-2"><CanvasSection id="cart" selectedId={selectedBlock} onSelect={onSelect}><div className="rounded-xl bg-slate-50 p-3 text-sm"><strong>Coș</strong><p className="text-slate-500">3 produse • 12,497 RON</p></div></CanvasSection><CanvasSection id="checkout" selectedId={selectedBlock} onSelect={onSelect}><div className="rounded-xl bg-slate-50 p-3 text-sm"><strong>Checkout</strong><p className="text-slate-500">Date → Livrare → Plată</p></div></CanvasSection></div></div>;
}

function LandingCanvas({ selectedBlock, onSelect }: { selectedBlock: LandingBlockId; onSelect: (block: LandingBlockId) => void }) {
    return <div className="space-y-3 text-slate-900"><CanvasSection id="hero" selectedId={selectedBlock} onSelect={onSelect}><div className="rounded-2xl bg-gradient-to-br from-indigo-950 to-purple-900 p-8 text-center text-white"><p className="text-xs font-bold text-indigo-200">AI Generated</p><h1 className="mt-2 text-3xl font-black">Transformă gadgeturile în comenzi online.</h1><button className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-black text-indigo-950">Programează demo</button></div></CanvasSection><CanvasSection id="benefits" selectedId={selectedBlock} onSelect={onSelect}><div className="grid gap-2 md:grid-cols-3">{['Analiză instant', 'Rapoarte AI', 'Integrări rapide'].map((item) => <div key={item} className="rounded-xl border border-slate-100 p-3 text-sm font-bold">{item}</div>)}</div></CanvasSection><CanvasSection id="testimonials" selectedId={selectedBlock} onSelect={onSelect}><p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">„Am redus timpul de raportare cu 60%.” — GadgetHub.ro</p></CanvasSection><CanvasSection id="lead-form" selectedId={selectedBlock} onSelect={onSelect}><div className="grid gap-2 rounded-xl border border-slate-100 p-4 md:grid-cols-3"><input readOnly value="Nume" className="rounded-lg bg-slate-50 px-3 py-2 text-sm" /><input readOnly value="Email" className="rounded-lg bg-slate-50 px-3 py-2 text-sm" /><button className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-bold text-white">Trimite</button></div></CanvasSection><CanvasSection id="pricing" selectedId={selectedBlock} onSelect={onSelect}><div className="rounded-xl bg-indigo-50 p-4"><strong>Plan Growth</strong><p className="text-sm text-slate-600">De la 499 RON/lună</p></div></CanvasSection><CanvasSection id="faq" selectedId={selectedBlock} onSelect={onSelect}><div className="space-y-2">{['Cât durează implementarea?', 'Există suport?'].map((item) => <p key={item} className="rounded-lg bg-slate-50 p-3 text-sm font-semibold">{item}</p>)}</div></CanvasSection><CanvasSection id="final-cta" selectedId={selectedBlock} onSelect={onSelect}><div className="rounded-xl bg-slate-950 p-5 text-center text-white"><strong>Gata să începi?</strong><p className="text-sm text-slate-300">Discută cu echipa GadgetHub.</p></div></CanvasSection><CanvasSection id="footer" selectedId={selectedBlock} onSelect={onSelect}><div className="flex justify-between text-xs text-slate-500"><span>© GadgetHub.ro</span><span>Termeni • Privacy • LinkedIn</span></div></CanvasSection></div>;
}

function CanvasSection<T extends string>({ id, selectedId, onSelect, children }: { id: T; selectedId: T; onSelect: (id: T) => void; children: ReactNode }) {
    const selectSection = () => onSelect(id);

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={selectSection}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    selectSection();
                }
            }}
            className={`block w-full cursor-pointer rounded-2xl border-2 p-2 text-left transition ${selectedId === id ? 'border-indigo-500 bg-indigo-50/60 shadow-sm' : 'border-transparent hover:border-slate-200'}`}
        >
            {children}
        </div>
    );
}

function MetricCard({ color, label, value, change }: { color: 'blue' | 'emerald' | 'purple'; label: string; value: string; change: string }) {
    const classes = { blue: 'bg-blue-50 border-blue-100 text-blue-900', emerald: 'bg-emerald-50 border-emerald-100 text-emerald-900', purple: 'bg-purple-50 border-purple-100 text-purple-900' }[color];
    return <div className={`${classes} rounded-2xl border p-5`}><p className="text-sm font-medium opacity-80">{label}</p><p className="mt-1 text-3xl font-bold">{value}</p><span className="mt-2 flex items-center gap-1 text-xs"><ArrowUpRight className="h-3 w-3" /> {change}</span></div>;
}

function ErpKpi({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
    return <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">{icon}<div><p className="text-sm font-medium text-slate-500">{label}</p><p className="text-2xl font-bold text-slate-900">{value}</p></div></div>;
}

function TabBar<T extends string>({ tabs, activeTab, onTabChange }: { tabs: { id: T; label: string; count: number }[]; activeTab: T; onTabChange: (tab: T) => void }) {
    return <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">{tabs.map((tab) => <button key={tab.id} onClick={() => onTabChange(tab.id)} className={`rounded-xl px-4 py-2 text-sm font-black transition ${activeTab === tab.id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>{tab.label} <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">{tab.count}</span></button>)}</div>;
}

function FormHeader({ title, description, buttonLabel, onSubmit, icon, secondaryActions }: { title: string; description: string; buttonLabel: string; onSubmit: () => void; icon?: ReactNode; secondaryActions?: ReactNode }) {
    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <h3 className="text-xl font-black text-slate-900">{title}</h3>
                    <p className="text-sm text-slate-500">{description}</p>
                </div>
                <button type="button" onClick={onSubmit} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-200 hover:bg-slate-800">
                    {icon ?? <Plus className="h-4 w-4" />}
                    {buttonLabel}
                </button>
            </div>
            {secondaryActions}
        </div>
    );
}

function EditActionPanel({ title, description, status, children }: { title: string; description: string; status: string; children: ReactNode }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-black text-slate-900">{title}</h4>
                        <StatusBadge status={status} />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {children}
                </div>
            </div>
        </div>
    );
}

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
    return <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-300" />;
}

function NumberInput({ value, onChange, placeholder }: { value: number; onChange: (value: number) => void; placeholder: string }) {
    return <input type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} placeholder={placeholder} className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-300" />;
}

function SelectInput({ value, onChange, options, compact = false }: { value: string; onChange: (value: string) => void; options: string[]; compact?: boolean }) {
    return <select value={value} onChange={(event) => onChange(event.target.value)} className={`rounded-xl border border-slate-200 bg-white text-sm font-semibold outline-none focus:border-indigo-300 ${compact ? 'px-2 py-2 text-xs' : 'px-3 py-3'}`}>{options.map((option) => <option key={option}>{option}</option>)}</select>;
}

function EntityCard({ title, subtitle, meta, badge, onEdit, onDelete, extraActions }: { title: string; subtitle: string; meta: string; badge: string; onEdit: () => void; onDelete: () => void; extraActions?: ReactNode }) {
    return <article className="rounded-2xl bg-white p-4 text-slate-800 shadow-sm"><div className="flex items-start justify-between gap-3"><div><h4 className="font-black text-slate-900">{title}</h4><p className="text-sm text-slate-500">{subtitle}</p></div><RowActions onEdit={onEdit} onDelete={onDelete} /></div><div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm"><strong>{meta}</strong><StatusBadge status={badge} /></div>{extraActions && <div className="mt-4 flex flex-wrap gap-2">{extraActions}</div>}</article>;
}

function RowActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
    return <div className="flex gap-2"><button type="button" onClick={onEdit} className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"><Edit3 className="h-4 w-4" /></button><button type="button" onClick={onDelete} className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"><Trash2 className="h-4 w-4" /></button></div>;
}

function StatusBadge({ status }: { status: string }) {
    const positive = ['Plătită', 'Calificat', 'Activ', 'Finalizată'].includes(status);
    const warning = ['Nou', 'Contactat', 'Draft', 'Confirmată', 'În lucru', 'Proformă', 'Emisă', 'Programată', 'Prospect'].includes(status);
    const classes = positive ? 'bg-emerald-100 text-emerald-700' : warning ? 'bg-amber-100 text-amber-700' : status === 'Stornată' ? 'bg-slate-200 text-slate-700' : 'bg-red-100 text-red-700';
    return <span className={`rounded-full px-3 py-1 text-xs font-bold ${classes}`}>{status}</span>;
}

function DataTable({ headers, children }: { headers: string[]; children: ReactNode }) {
    return <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left text-sm"><thead className="bg-slate-50 text-xs font-black uppercase text-slate-500"><tr>{headers.map((header) => <th key={header} className="p-3">{header}</th>)}</tr></thead><tbody>{children}</tbody></table></div></div>;
}