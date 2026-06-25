import { useState, type ReactNode } from 'react';
import {
    Activity,
    ArrowUpRight,
    BarChart3,
    Calendar,
    CreditCard,
    DollarSign,
    Edit3,
    ExternalLink,
    Eye,
    FileText,
    MousePointerClick,
    Package,
    Plus,
    Save,
    ShoppingCart,
    Trash2,
    Truck,
    Users,
    X
} from 'lucide-react';
import { marketplaceModules } from '../moduleData';
import type { ModuleId } from '../types';

type Props = {
    activeModulePreview: ModuleId | null;
    onClose: () => void;
};

const ecommerceOrders = [
    { id: '#1089', customer: 'Andrei Stan', product: 'Pachet Consultanță', amount: '4,500 RON', status: 'Livrat' },
    { id: '#1090', customer: 'Ioana Popa', product: 'Abonament Premium', amount: '1,200 RON', status: 'Procesare' },
    { id: '#1091', customer: 'SC Alfa SRL', product: 'Analiză Date', amount: '7,800 RON', status: 'Finalizat' },
    { id: '#1092', customer: 'Mihai Radu', product: 'Workshop AI', amount: '2,999 RON', status: 'Anulat' }
];

const erpInvoices = [
    { id: 'FCT-2024-001', client: 'Brightech Inc.', value: '12,000 RON', dueDate: '12 Iun 2026', status: 'Plătită' },
    { id: 'FCT-2024-002', client: 'WebDesign Pro', value: '5,500 RON', dueDate: '18 Iun 2026', status: 'În așteptare' },
    { id: 'FCT-2024-003', client: 'DataMind SRL', value: '22,300 RON', dueDate: '25 Iun 2026', status: 'Restantă' },
    { id: 'FCT-2024-004', client: 'CloudNet', value: '8,400 RON', dueDate: '01 Iul 2026', status: 'Plătită' }
];

const landingMetrics = [
    { label: 'Vizitatori', value: '12,450', icon: <Users className="w-5 h-5" />, change: '+24%' },
    { label: 'Conversii', value: '3,2%', icon: <MousePointerClick className="w-5 h-5" />, change: '+1.1%' },
    { label: 'Rata de respingere', value: '42%', icon: <Activity className="w-5 h-5" />, change: '-8%' },
    { label: 'Timp pe pagină', value: '4m 12s', icon: <Activity className="w-5 h-5" />, change: '+30s' }
];

const openHtmlPreview = (title: string, body: string) => {
    const previewWindow = window.open('', '_blank', 'noopener,noreferrer,width=1200,height=900');
    if (!previewWindow) return;

    previewWindow.document.write(`<!doctype html><html lang="ro"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${title}</title><script src="https://cdn.tailwindcss.com"></script></head><body>${body}</body></html>`);
    previewWindow.document.close();
};

const openEcommerceStorePreview = () => {
    openHtmlPreview('Preview magazin eCommerce', `<main class="min-h-screen bg-slate-950 text-white"><nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-6"><strong class="text-2xl">NordicTech Store</strong><div class="hidden gap-6 text-sm text-slate-300 md:flex"><span>Produse</span><span>Oferte</span><span>Suport</span></div><button class="rounded-full bg-white px-5 py-2 font-bold text-slate-950">Coș (3)</button></nav><section class="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-2"><div><p class="mb-4 inline-flex rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">Livrare gratuită peste 500 RON</p><h1 class="text-5xl font-black leading-tight md:text-7xl">Gadgeturi premium pentru echipe moderne.</h1><p class="mt-6 text-lg text-slate-300">Magazin demo cu carduri de produs, filtre, coș și checkout vizual.</p><button class="mt-8 rounded-2xl bg-emerald-400 px-7 py-4 font-black text-slate-950">Cumpără acum</button></div><div class="rounded-[2rem] bg-gradient-to-br from-indigo-500 to-emerald-400 p-8 shadow-2xl"><div class="rounded-3xl bg-white/15 p-6 backdrop-blur"><p class="text-sm text-white/80">Produs recomandat</p><h2 class="mt-3 text-3xl font-black">AI Workstation Pro</h2><p class="mt-16 text-5xl font-black">8.999 RON</p></div></div></section><section class="mx-auto grid max-w-6xl gap-5 px-6 pb-20 md:grid-cols-3">${['Laptop Carbon X','Monitor UltraWide','Docking Station AI'].map((p,i)=>`<article class="rounded-3xl bg-white p-5 text-slate-950 shadow-xl"><div class="mb-5 h-44 rounded-2xl bg-gradient-to-br ${i===0?'from-blue-100 to-indigo-200':i===1?'from-emerald-100 to-cyan-200':'from-amber-100 to-pink-200'}"></div><h3 class="text-xl font-black">${p}</h3><p class="mt-2 text-sm text-slate-500">Stoc disponibil • rating 4.9</p><div class="mt-5 flex items-center justify-between"><strong>${(i+2)*1499} RON</strong><button class="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white">Adaugă</button></div></article>`).join('')}</section></main>`);
};

const openLandingFullPreview = () => {
    openHtmlPreview('Preview landing page', `<main class="min-h-screen bg-white"><section class="bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-950 px-6 py-24 text-white"><div class="mx-auto max-w-5xl text-center"><span class="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">Landing page demo full-screen</span><h1 class="mt-8 text-5xl font-black leading-tight md:text-7xl">Automatizează operațiunile firmei în câteva minute.</h1><p class="mx-auto mt-6 max-w-2xl text-xl text-indigo-100">Hero, beneficii, testimoniale și call-to-action într-o pagină completă generată cu date dummy.</p><button class="mt-10 rounded-2xl bg-white px-8 py-4 font-black text-indigo-950">Programează demo</button></div></section><section class="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-3">${['Analiză instant','Rapoarte AI','Integrări rapide'].map(t=>`<div class="rounded-3xl border border-slate-200 p-8 shadow-sm"><h2 class="text-2xl font-black text-slate-900">${t}</h2><p class="mt-3 text-slate-500">Conținut dummy pentru previzualizare full page.</p></div>`).join('')}</section><section class="bg-slate-50 px-6 py-20 text-center"><h2 class="text-4xl font-black text-slate-900">Gata să începi?</h2><p class="mt-3 text-slate-500">Acesta este preview-ul într-o pagină separată.</p></section></main>`);
};

export function ModulePreviewModal({ activeModulePreview, onClose }: Props) {
    const [crmRecords, setCrmRecords] = useState([
        { type: 'Lead', name: 'Nova Retail', contact: 'Ana Dumitru', value: '18,400 RON', status: 'Nou' },
        { type: 'Comandă', name: 'Tech Solutions SRL', contact: 'Maria Popescu', value: '24,500 RON', status: 'Confirmată' },
        { type: 'Client', name: 'Global Finance SA', contact: 'Ioan Ionescu', value: '52,000 RON', status: 'Activ' }
    ]);
    const [editingCrmIndex, setEditingCrmIndex] = useState<number | null>(null);
    const [crmDraft, setCrmDraft] = useState({ type: 'Lead', name: '', contact: '', value: '', status: 'Nou' });

    if (!activeModulePreview) return null;

    const activeModule = marketplaceModules.find((module) => module.id === activeModulePreview);

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 p-4" onClick={onClose}>
            <div className="bg-white w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl border border-slate-200 p-6 md:p-8 animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        {activeModule?.icon}
                        Previzualizare {activeModule?.name}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5" /></button>
                </div>

                {activeModulePreview === 'crm' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <MetricCard color="blue" label="Lead-uri Noi" value="47" change="12 față de luna trecută" />
                            <MetricCard color="emerald" label="Rata de Conversie" value="24%" change="+5%" />
                            <MetricCard color="purple" label="Valoare Pipeline" value="118k RON" change="+18%" />
                        </div>
                        <div className="rounded-3xl border border-indigo-100 bg-indigo-50/50 p-5">
                            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900">Pagină CRM: lead-uri, comenzi și date clienți</h3>
                                    <p className="text-sm text-slate-500">Adaugă, editează și șterge înregistrări dummy direct din modul.</p>
                                </div>
                                <button type="button" onClick={() => {
                                    if (!crmDraft.name.trim()) return;
                                    if (editingCrmIndex === null) setCrmRecords((prev) => [...prev, crmDraft]);
                                    else {
                                        setCrmRecords((prev) => prev.map((record, idx) => idx === editingCrmIndex ? crmDraft : record));
                                        setEditingCrmIndex(null);
                                    }
                                    setCrmDraft({ type: 'Lead', name: '', contact: '', value: '', status: 'Nou' });
                                }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700">
                                    {editingCrmIndex === null ? <Plus className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                                    {editingCrmIndex === null ? 'Adaugă înregistrare' : 'Salvează modificări'}
                                </button>
                            </div>
                            <div className="mt-5 grid gap-3 md:grid-cols-5">
                                <select value={crmDraft.type} onChange={(e) => setCrmDraft((prev) => ({ ...prev, type: e.target.value }))} className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold"><option>Lead</option><option>Comandă</option><option>Client</option></select>
                                <input value={crmDraft.name} onChange={(e) => setCrmDraft((prev) => ({ ...prev, name: e.target.value }))} placeholder="Companie / client" className="rounded-xl border border-slate-200 px-3 py-3 text-sm" />
                                <input value={crmDraft.contact} onChange={(e) => setCrmDraft((prev) => ({ ...prev, contact: e.target.value }))} placeholder="Persoană contact" className="rounded-xl border border-slate-200 px-3 py-3 text-sm" />
                                <input value={crmDraft.value} onChange={(e) => setCrmDraft((prev) => ({ ...prev, value: e.target.value }))} placeholder="Valoare" className="rounded-xl border border-slate-200 px-3 py-3 text-sm" />
                                <input value={crmDraft.status} onChange={(e) => setCrmDraft((prev) => ({ ...prev, status: e.target.value }))} placeholder="Status" className="rounded-xl border border-slate-200 px-3 py-3 text-sm" />
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                            <div className="p-4 bg-slate-50 border-b border-slate-100 font-semibold text-slate-700">Registru CRM editabil</div>
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 text-slate-500"><tr><th className="p-3 pl-4">Tip</th><th className="p-3">Nume</th><th className="p-3">Contact</th><th className="p-3">Valoare</th><th className="p-3">Status</th><th className="p-3 pr-4">Acțiuni</th></tr></thead>
                                <tbody className="divide-y divide-slate-100">
                                {crmRecords.map((record, i) => (
                                    <tr key={`${record.name}-${i}`} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-3 pl-4"><span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{record.type}</span></td>
                                        <td className="p-3 font-medium text-slate-800">{record.name}</td><td className="p-3 text-slate-600">{record.contact}</td><td className="p-3 font-semibold text-slate-900">{record.value}</td><td className="p-3 text-slate-600">{record.status}</td>
                                        <td className="p-3 pr-4"><div className="flex gap-2"><button type="button" onClick={() => { setEditingCrmIndex(i); setCrmDraft(record); }} className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"><Edit3 className="h-4 w-4" /></button><button type="button" onClick={() => setCrmRecords((prev) => prev.filter((_, idx) => idx !== i))} className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"><Trash2 className="h-4 w-4" /></button></div></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeModulePreview === 'ecommerce' && (
                    <div className="space-y-6">
                        <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-xl">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div><p className="text-sm font-bold text-emerald-300">Preview magazin online</p><h3 className="text-2xl font-black">NordicTech Store</h3><p className="mt-1 text-sm text-slate-300">Deschide o fereastră separată cu un storefront e-commerce complet.</p></div>
                                <button type="button" onClick={openEcommerceStorePreview} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 hover:bg-slate-100"><ExternalLink className="h-4 w-4" /> Preview în altă fereastră</button>
                            </div>
                            <div className="mt-5 grid gap-4 md:grid-cols-3">
                                {['Laptop Carbon X', 'Monitor UltraWide', 'Docking Station AI'].map((product, i) => (
                                    <div key={product} className="rounded-2xl bg-white p-4 text-slate-950"><div className={`h-28 rounded-xl ${i === 0 ? 'bg-gradient-to-br from-blue-100 to-indigo-200' : i === 1 ? 'bg-gradient-to-br from-emerald-100 to-cyan-200' : 'bg-gradient-to-br from-amber-100 to-pink-200'}`} /><h4 className="mt-3 font-black">{product}</h4><p className="text-xs text-slate-500">Stoc disponibil • 4.9 rating</p><div className="mt-3 flex items-center justify-between"><strong>{(i + 2) * 1499} RON</strong><button className="rounded-lg bg-slate-950 px-3 py-1.5 text-xs font-bold text-white">Adaugă</button></div></div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StoreStat icon={<DollarSign className="text-emerald-500 w-8 h-8 p-1.5 bg-emerald-50 rounded-lg" />} label="Vânzări Azi" value="45.2k RON" />
                            <StoreStat icon={<Package className="text-blue-500 w-8 h-8 p-1.5 bg-blue-50 rounded-lg" />} label="Comenzi" value="1,204" />
                            <StoreStat icon={<Eye className="text-purple-500 w-8 h-8 p-1.5 bg-purple-50 rounded-lg" />} label="Vizualizări" value="34.8k" />
                            <StoreStat icon={<ShoppingCart className="text-amber-500 w-8 h-8 p-1.5 bg-amber-50 rounded-lg" />} label="Rata de abandon" value="68%" />
                        </div>
                        <OrdersTable />
                    </div>
                )}

                {activeModulePreview === 'erp' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><ErpKpi icon={<CreditCard className="text-amber-600 w-10 h-10 p-2 bg-amber-100 rounded-xl" />} label="Conturi de încasat" value="48,200 RON" /><ErpKpi icon={<Truck className="text-red-600 w-10 h-10 p-2 bg-red-100 rounded-xl" />} label="Stocuri Minime" value="12 Produse" /><ErpKpi icon={<BarChart3 className="text-emerald-600 w-10 h-10 p-2 bg-emerald-100 rounded-xl" />} label="Profit Net (T3)" value="112,800 RON" /></div>
                        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                            <div className="rounded-3xl border border-amber-100 bg-amber-50/60 p-5"><h3 className="text-xl font-black text-slate-900">Generator factură nouă</h3><p className="mt-1 text-sm text-slate-500">Formular dummy pentru emitere rapidă facturi.</p><div className="mt-4 grid gap-3 md:grid-cols-2"><input defaultValue="FCT-2026-105" className="rounded-xl border border-amber-100 px-3 py-3 text-sm" /><input defaultValue="Client Demo SRL" className="rounded-xl border border-amber-100 px-3 py-3 text-sm" /><input defaultValue="Servicii automatizare AI" className="rounded-xl border border-amber-100 px-3 py-3 text-sm md:col-span-2" /><input defaultValue="9,800 RON" className="rounded-xl border border-amber-100 px-3 py-3 text-sm" /><input defaultValue="30 Iun 2026" className="rounded-xl border border-amber-100 px-3 py-3 text-sm" /></div><button type="button" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-white hover:bg-amber-600"><FileText className="h-4 w-4" /> Generează factură</button></div>
                            <div className="rounded-3xl border border-slate-200 bg-white p-5"><h3 className="text-xl font-black text-slate-900">Raport centru de costuri</h3><p className="mt-1 text-sm text-slate-500">Analiză demo pentru departamente.</p>{[['Marketing', 42, 'bg-purple-500'], ['Operațional', 68, 'bg-blue-500'], ['Vânzări', 55, 'bg-emerald-500']].map(([name, value, color]) => (<div key={name} className="mt-4"><div className="mb-1 flex justify-between text-sm font-semibold"><span>{name}</span><span>{value}% buget</span></div><div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className={`${color} h-full rounded-full`} style={{ width: `${value}%` }} /></div></div>))}</div>
                        </div>
                        <InvoicesTable />
                    </div>
                )}

                {activeModulePreview === 'landing' && (
                    <div className="space-y-6">
                        <div className="flex flex-col gap-3 rounded-3xl border border-purple-100 bg-purple-50 p-5 md:flex-row md:items-center md:justify-between"><div><h3 className="text-xl font-black text-slate-900">Preview landing page full</h3><p className="text-sm text-slate-500">Deschide landing page-ul într-o pagină separată, fără rama dashboard-ului.</p></div><button type="button" onClick={openLandingFullPreview} className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white hover:bg-purple-700"><ExternalLink className="h-4 w-4" /> Preview full page</button></div>
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-3xl border border-purple-100 shadow-inner"><div className="flex items-center gap-3 mb-4"><div className="w-3 h-3 bg-purple-500 rounded-full"></div><div className="w-3 h-3 bg-indigo-300 rounded-full"></div><div className="w-3 h-3 bg-purple-200 rounded-full"></div><span className="text-xs text-slate-400 ml-2">https://firma-ta.ro</span></div><div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100"><span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">✨ AI Generated</span><h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4 leading-tight">Transformă-ți afacerea cu <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Inteligență Artificială</span></h1><p className="text-slate-500 mt-4 max-w-2xl text-lg">O platformă all-in-one care automatizează procesele, analizează datele și crește eficiența echipei tale.</p><div className="flex gap-3 mt-8"><button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg">Începe Acum</button><button className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">Află Mai Multe</button></div></div></div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{landingMetrics.map((metric, i) => (<div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"><div className="flex items-center gap-2 text-slate-500 mb-2">{metric.icon}</div><p className="text-2xl font-bold text-slate-900">{metric.value}</p><p className="text-sm text-slate-500">{metric.label}</p><span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1"><ArrowUpRight className="w-3 h-3" /> {metric.change}</span></div>))}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

function MetricCard({ color, label, value, change }: { color: 'blue' | 'emerald' | 'purple'; label: string; value: string; change: string }) {
    const classes = { blue: 'bg-blue-50 border-blue-100 text-blue-900', emerald: 'bg-emerald-50 border-emerald-100 text-emerald-900', purple: 'bg-purple-50 border-purple-100 text-purple-900' }[color];
    return <div className={`${classes} p-5 rounded-2xl border`}><p className="text-sm font-medium opacity-80">{label}</p><p className="text-3xl font-bold mt-1">{value}</p><span className="text-xs flex items-center gap-1 mt-2"><ArrowUpRight className="w-3 h-3" /> {change}</span></div>;
}

function StoreStat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
    return <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm"><div className="flex justify-between items-start">{icon}<span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">+8.2%</span></div><p className="text-2xl font-bold mt-3">{value}</p><p className="text-sm text-slate-500">{label}</p></div>;
}

function OrdersTable() {
    return <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden"><div className="p-4 bg-slate-50 border-b border-slate-100 font-semibold text-slate-700">Ultimele Comenzi</div><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-3 pl-4">ID Comandă</th><th className="p-3">Client</th><th className="p-3">Produs</th><th className="p-3">Sumă</th><th className="p-3 pr-4">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{ecommerceOrders.map((order, i) => (<tr key={i} className="hover:bg-slate-50 transition-colors"><td className="p-3 pl-4 font-medium text-indigo-600">{order.id}</td><td className="p-3 text-slate-800">{order.customer}</td><td className="p-3 text-slate-600">{order.product}</td><td className="p-3 font-semibold text-slate-900">{order.amount}</td><td className="p-3 pr-4"><span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'Livrat' || order.status === 'Finalizat' ? 'bg-emerald-100 text-emerald-700' : order.status === 'Procesare' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{order.status}</span></td></tr>))}</tbody></table></div>;
}

function ErpKpi({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
    return <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">{icon}<div><p className="text-sm text-slate-500 font-medium">{label}</p><p className="text-2xl font-bold text-slate-900">{value}</p></div></div>;
}

function InvoicesTable() {
    return <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden"><div className="p-4 bg-slate-50 border-b border-slate-100 font-semibold text-slate-700">Facturi Recente</div><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-3 pl-4">Număr</th><th className="p-3">Client</th><th className="p-3">Valoare</th><th className="p-3">Scadentă</th><th className="p-3 pr-4">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{erpInvoices.map((inv, i) => (<tr key={i} className="hover:bg-slate-50 transition-colors"><td className="p-3 pl-4 font-medium text-slate-700">{inv.id}</td><td className="p-3 text-slate-800">{inv.client}</td><td className="p-3 font-semibold text-slate-900">{inv.value}</td><td className="p-3 text-slate-600 flex items-center gap-1"><Calendar className="w-3 h-3" /> {inv.dueDate}</td><td className="p-3 pr-4"><span className={`px-2 py-1 rounded-full text-xs font-bold ${inv.status === 'Plătită' ? 'bg-emerald-100 text-emerald-700' : inv.status === 'În așteptare' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{inv.status}</span></td></tr>))}</tbody></table></div>;
}
