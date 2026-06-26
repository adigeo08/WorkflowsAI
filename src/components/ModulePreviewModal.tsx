import { useState, type ReactNode } from 'react';
import {
    ArrowUpRight,
    BarChart3,
    Calendar,
    CreditCard,
    Edit3,
    FileText,
    Plus,
    Trash2,
    Truck,
    X
} from 'lucide-react';
import { marketplaceModules } from '../moduleData';
import type { ModuleId } from '../types';
import { EcommercePuckEditor } from './module-preview/puck/EcommercePuckEditor';
import { LandingPuckEditor } from './module-preview/puck/LandingPuckEditor';
import { ecommerceCatalogItems, type CatalogItem } from './module-preview/puck/sharedCatalog';
import { customers as demoCustomers, erpInventory, expenses as demoExpenses, formatPercent, formatRon, getEstimatedProfit, getOutstandingInvoices, invoices as demoInvoices, leads as demoLeads, orders as demoOrders } from '../sharedBusinessData';

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

const emptyCatalogItem: Omit<CatalogItem, 'id'> = {
    name: '',
    sku: '',
    category: '',
    stock: 0,
    minimumStock: 5,
    supplier: 'GadgetHub.ro',
    price: ''
};

const initialLeads: Lead[] = demoLeads.map((lead) => ({ ...lead, estimatedValue: formatRon(lead.estimatedValue) }));

const initialOrders: Order[] = demoOrders.map((order) => ({ ...order, products: order.productSkus.join(', '), value: formatRon(order.value) }));

const initialCustomers: Customer[] = demoCustomers.map((customer) => ({ ...customer, totalContractsValue: formatRon(customer.totalContractsValue) }));

const initialInvoices: Invoice[] = demoInvoices.map((invoice) => ({ ...invoice, value: formatRon(invoice.value), vat: formatPercent(invoice.vatRate) }));

const initialInventory: InventoryItem[] = erpInventory.map((item) => ({ id: item.id, productName: item.name, sku: item.sku, category: item.category, quantity: item.stock, minimumStock: item.minimumStock, supplier: item.supplier }));

const initialExpenses: Expense[] = demoExpenses.map((expense) => ({ ...expense, value: formatRon(expense.value) }));

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
                {activeModulePreview === 'ecommerce' && <EcommerceBuilderPreview catalogItems={ecommerceCatalogItems} />}
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
    return <TabBar tabs={[{ id: 'leads', label: 'Lead-uri', count: counts.leads }, { id: 'orders', label: 'Comenzi/Oportunități', count: counts.orders }, { id: 'customers', label: 'Clienți', count: counts.customers }]} activeTab={activeTab} onTabChange={onTabChange} />;
}

function LeadForm({ leads, draft, editingId, onDraftChange, onSubmit, onEdit, onDelete, onQualify, onConvert }: { leads: Lead[]; draft: Omit<Lead, 'id'>; editingId: string | null; onDraftChange: (draft: Omit<Lead, 'id'>) => void; onSubmit: () => void; onEdit: (lead: Lead) => void; onDelete: (id: string) => void; onQualify: (id: string) => void; onConvert: (lead: Lead) => void }) {
    return <section className="rounded-3xl border border-blue-100 bg-blue-50/50 p-5"><FormHeader title="Lead-uri" description="Califică oportunități înainte de conversia în client." buttonLabel={editingId ? 'Salvează lead' : 'Adaugă lead'} onSubmit={onSubmit} /><div className="mt-5 grid gap-3 md:grid-cols-4"><TextInput value={draft.company} onChange={(company) => onDraftChange({ ...draft, company })} placeholder="Companie" /><TextInput value={draft.contactPerson} onChange={(contactPerson) => onDraftChange({ ...draft, contactPerson })} placeholder="Persoană contact" /><TextInput value={draft.contact} onChange={(contact) => onDraftChange({ ...draft, contact })} placeholder="Telefon/email" /><SelectInput value={draft.source} onChange={(source) => onDraftChange({ ...draft, source: source as LeadSource })} options={['Website', 'Recomandare', 'Campanie', 'Cold call']} /><SelectInput value={draft.interest} onChange={(interest) => onDraftChange({ ...draft, interest: interest as LeadInterest })} options={['Website', 'Magazin online', 'CRM', 'ERP', 'Automatizare']} /><TextInput value={draft.estimatedValue} onChange={(estimatedValue) => onDraftChange({ ...draft, estimatedValue })} placeholder="Valoare estimată" /><SelectInput value={draft.status} onChange={(status) => onDraftChange({ ...draft, status: status as LeadStatus })} options={['Nou', 'Contactat', 'Calificat', 'Pierdut']} /></div><div className="mt-5 grid gap-3 lg:grid-cols-2">{leads.map((lead) => <EntityCard key={lead.id} title={lead.company} subtitle={`${lead.contactPerson} • ${lead.contact}`} badge={lead.status} meta={`${lead.source} • ${lead.interest} • ${lead.estimatedValue}`} onEdit={() => onEdit(lead)} onDelete={() => onDelete(lead.id)} extraActions={<><button onClick={() => onQualify(lead.id)} className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">Calificat</button><button onClick={() => onConvert(lead)} className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white">Conversie client</button></>} />)}</div></section>;
}

function OrderForm({ orders, draft, editingId, onDraftChange, onSubmit, onEdit, onDelete, onStatusChange }: { orders: Order[]; draft: Omit<Order, 'id'>; editingId: string | null; onDraftChange: (draft: Omit<Order, 'id'>) => void; onSubmit: () => void; onEdit: (order: Order) => void; onDelete: (id: string) => void; onStatusChange: (id: string, status: OrderStatus) => void }) {
    return <section className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-5"><FormHeader title="Comenzi" description="Gestionează comenzi distinct de lead-uri și clienți." buttonLabel={editingId ? 'Salvează comandă' : 'Adaugă comandă'} onSubmit={onSubmit} /><div className="mt-5 grid gap-3 md:grid-cols-3"><TextInput value={draft.customer} onChange={(customer) => onDraftChange({ ...draft, customer })} placeholder="Client" /><TextInput value={draft.orderNumber} onChange={(orderNumber) => onDraftChange({ ...draft, orderNumber })} placeholder="Număr comandă" /><TextInput value={draft.products} onChange={(products) => onDraftChange({ ...draft, products })} placeholder="Produse gadget" /><TextInput value={draft.value} onChange={(value) => onDraftChange({ ...draft, value })} placeholder="Valoare" /><TextInput value={draft.deliveryDate} onChange={(deliveryDate) => onDraftChange({ ...draft, deliveryDate })} placeholder="Data livrării" /><SelectInput value={draft.status} onChange={(status) => onDraftChange({ ...draft, status: status as OrderStatus })} options={['Draft', 'Confirmată', 'În lucru', 'Finalizată', 'Anulată']} /></div><DataTable headers={['Comandă', 'Client', 'Produse', 'Valoare', 'Livrare', 'Status', 'Acțiuni']}>{orders.map((order) => <tr key={order.id} className="border-t border-slate-100"><td className="p-3 font-bold">{order.orderNumber}</td><td className="p-3">{order.customer}</td><td className="p-3">{order.products}</td><td className="p-3 font-semibold">{order.value}</td><td className="p-3">{order.deliveryDate}</td><td className="p-3"><SelectInput value={order.status} onChange={(status) => onStatusChange(order.id, status as OrderStatus)} options={['Draft', 'Confirmată', 'În lucru', 'Finalizată', 'Anulată']} compact /></td><td className="p-3"><RowActions onEdit={() => onEdit(order)} onDelete={() => onDelete(order.id)} /></td></tr>)}</DataTable></section>;
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
                <ErpKpi icon={<CreditCard className="h-10 w-10 rounded-xl bg-amber-100 p-2 text-amber-600" />} label="Conturi de încasat" value={formatRon(getOutstandingInvoices().reduce((sum, invoice) => sum + invoice.value, 0))} />
                <ErpKpi icon={<Truck className="h-10 w-10 rounded-xl bg-red-100 p-2 text-red-600" />} label="Stocuri minime" value={`${inventory.filter((item) => item.quantity <= item.minimumStock).length} Produse`} />
                <ErpKpi icon={<BarChart3 className="h-10 w-10 rounded-xl bg-emerald-100 p-2 text-emerald-600" />} label="Profit estimativ" value={formatRon(getEstimatedProfit())} />
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
                {costCenters.map((center) => <div key={center} className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs font-bold uppercase text-slate-400">{center}</p><p className="mt-1 text-2xl font-black text-slate-900">{expenses.filter((expense) => expense.costCenter === center).length}</p><p className="text-sm text-slate-500">cheltuieli gadgeturi</p></div>)}
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

function EcommerceBuilderPreview({ catalogItems }: { catalogItems: CatalogItem[] }) {
    return <EcommercePuckEditor catalogItems={catalogItems} />;
}

function LandingBuilderPreview() {
    return <LandingPuckEditor />;
}


function MetricCard({ color, label, value, change }: { color: 'blue' | 'emerald' | 'purple'; label: string; value: string; change: string }) {
    const classes = { blue: 'bg-blue-50 border-blue-100 text-blue-900', emerald: 'bg-emerald-50 border-emerald-100 text-emerald-900', purple: 'bg-purple-50 border-purple-100 text-purple-900' }[color];
    return <div className={`${classes} rounded-2xl border p-5`}><p className="text-sm font-medium opacity-80">{label}</p><p className="mt-1 text-3xl font-bold">{value}</p><span className="mt-2 flex items-center gap-1 text-xs"><ArrowUpRight className="h-3 w-3" /> {change}</span></div>;
}

function ErpKpi({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
    return <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">{icon}<div><p className="text-sm font-medium text-slate-500">{label}</p><p className="text-2xl font-bold text-slate-900">{value}</p></div></div>;
}

function TabBar<T extends string>({ tabs, activeTab, onTabChange }: { tabs: { id: T; label: string; count: number }[]; activeTab: T; onTabChange: (tab: T) => void }) {
    return <div className="flex w-full flex-nowrap gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm sm:gap-2 sm:p-2">{tabs.map((tab) => <button key={tab.id} onClick={() => onTabChange(tab.id)} className={`min-w-0 flex-1 rounded-xl px-2 py-2 text-[11px] font-black transition sm:px-4 sm:text-sm ${activeTab === tab.id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'}`}><span className="truncate">{tab.label}</span> <span className="ml-1 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] sm:ml-2 sm:px-2 sm:text-xs">{tab.count}</span></button>)}</div>;
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
