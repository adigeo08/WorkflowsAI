import React, { useEffect, useRef, useState } from 'react';
import {
    UploadCloud,
    Camera,
    FileText,
    Image as ImageIcon,
    FileSpreadsheet,
    Send,
    BarChart3,
    TrendingUp,
    Users,
    Clock,
    Sparkles,
    CheckCircle2,
    ChevronRight,
    Bot,
    Layout,
    ShoppingCart,
    Briefcase,
    Grid,
    Download,
    Lock,
    Trash2,
    X,
    Activity,
    DollarSign,
    Package,
    MousePointerClick,
    Eye,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Phone,
    Mail,
    Star,
    Truck,
    CreditCard,
    PieChart
} from 'lucide-react';

type Step = 1 | 2 | 3 | 'processing';

type UploadedFile = {
    name: string;
    type: 'image' | 'pdf' | 'excel';
    size: string;
};

type ChatMessage = {
    role: 'ai' | 'user';
    text: string;
};

type ModuleId = 'crm' | 'ecommerce' | 'erp' | 'landing';

type MarketplaceModule = {
    id: ModuleId;
    name: string;
    icon: React.ReactNode;
    desc: string;
};

export default function App() {
    const [step, setStep] = useState<Step>(1);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const [isModulesOpen, setIsModulesOpen] = useState(false);
    const [installedModules, setInstalledModules] = useState<ModuleId[]>(['crm']);
    const [activeModulePreview, setActiveModulePreview] = useState<ModuleId | null>(null);

    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            role: 'ai',
            text: 'Salut! Sunt asistentul tău AI. Am analizat documentele tale. Cu ce te pot ajuta astăzi?'
        }
    ]);

    const [chatInput, setChatInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages, isChatOpen]);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        addFiles(droppedFiles);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files ?? []);
        addFiles(selectedFiles);

        e.target.value = '';
    };

    const addFiles = (newFiles: File[]) => {
        const mockFiles: UploadedFile[] = newFiles.map((file) => ({
            name: file.name,
            type: file.name.toLowerCase().includes('.pdf')
                ? 'pdf'
                : file.name.toLowerCase().includes('.xls') || file.name.toLowerCase().includes('.csv')
                    ? 'excel'
                    : 'image',
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
        }));

        setFiles((prev) => [...prev, ...mockFiles]);
        setStep(2);
    };

    const addSimulatedCameraPhoto = () => {
        setFiles((prev) => [
            ...prev,
            {
                name: 'fotografie_camera_001.jpg',
                type: 'image',
                size: '2.4 MB'
            }
        ]);

        setStep(2);
    };

    const removeFile = (indexToRemove: number) => {
        setFiles((prev) => {
            const newFiles = prev.filter((_, idx) => idx !== indexToRemove);

            if (newFiles.length === 0) {
                setStep(1);
            }

            return newFiles;
        });
    };

    const processData = () => {
        if (files.length === 0) return;

        setStep('processing');

        setTimeout(() => {
            setStep(3);
        }, 3000);
    };

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!chatInput.trim()) return;

        setChatMessages((prev) => [
            ...prev,
            {
                role: 'user',
                text: chatInput
            }
        ]);

        setChatInput('');

        setTimeout(() => {
            setChatMessages((prev) => [
                ...prev,
                {
                    role: 'ai',
                    text: 'Conform datelor din documentele încărcate, vânzările din ultimul trimestru au crescut cu 12%, iar principalele surse de clienți noi sunt din campaniile B2B.'
                }
            ]);
        }, 1500);
    };

    const getFileIcon = (type: UploadedFile['type']) => {
        switch (type) {
            case 'image':
                return <ImageIcon className="w-6 h-6 text-blue-500" />;
            case 'pdf':
                return <FileText className="w-6 h-6 text-red-500" />;
            case 'excel':
                return <FileSpreadsheet className="w-6 h-6 text-green-500" />;
            default:
                return <FileText className="w-6 h-6 text-gray-500" />;
        }
    };

    const isDataProcessed = step === 3;

    const marketplaceModules: MarketplaceModule[] = [
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

    const kpis = [
        {
            label: 'Venit Total',
            value: '124,500 RON',
            icon: <TrendingUp className="text-emerald-500 w-6 h-6" />,
            change: '+14%'
        },
        {
            label: 'Facturi Procesate',
            value: files.length * 15,
            icon: <FileText className="text-blue-500 w-6 h-6" />,
            change: 'Azi'
        },
        {
            label: 'Clienți Unici',
            value: '342',
            icon: <Users className="text-purple-500 w-6 h-6" />,
            change: '+5%'
        },
        {
            label: 'Timp Economisit',
            value: '12 Ore',
            icon: <Clock className="text-amber-500 w-6 h-6" />,
            change: 'Estimare AI'
        }
    ];

    const expenseCategories = [
        {
            name: 'Echipamente & Hardware',
            percent: 45,
            color: 'bg-indigo-500'
        },
        {
            name: 'Software SaaS',
            percent: 30,
            color: 'bg-purple-500'
        },
        {
            name: 'Marketing & Ad-uri',
            percent: 15,
            color: 'bg-pink-500'
        },
        {
            name: 'Logistică',
            percent: 10,
            color: 'bg-amber-500'
        }
    ];

    // --- Dummy Data for Previews ---
    const crmDeals = [
        { name: 'Tech Solutions SRL', value: '24,500 RON', stage: 'Negociere', probability: 70, contact: 'Maria Popescu' },
        { name: 'Global Finance SA', value: '52,000 RON', stage: 'Propunere', probability: 50, contact: 'Ioan Ionescu' },
        { name: 'Eco Food Market', value: '8,200 RON', stage: 'Calificare', probability: 20, contact: 'Elena Vasile' },
        { name: 'Smart Automation', value: '33,800 RON', stage: 'Contract', probability: 90, contact: 'George Marin' },
    ];

    const ecommerceOrders = [
        { id: '#1089', customer: 'Andrei Stan', product: 'Pachet Consultanță', amount: '4,500 RON', status: 'Livrat' },
        { id: '#1090', customer: 'Ioana Popa', product: 'Abonament Premium', amount: '1,200 RON', status: 'Procesare' },
        { id: '#1091', customer: 'SC Alfa SRL', product: 'Analiză Date', amount: '7,800 RON', status: 'Finalizat' },
        { id: '#1092', customer: 'Mihai Radu', product: 'Workshop AI', amount: '2,999 RON', status: 'Anulat' },
    ];

    const erpInvoices = [
        { id: 'FCT-2024-001', client: 'Brightech Inc.', value: '12,000 RON', dueDate: '12 Iun 2026', status: 'Plătită' },
        { id: 'FCT-2024-002', client: 'WebDesign Pro', value: '5,500 RON', dueDate: '18 Iun 2026', status: 'În așteptare' },
        { id: 'FCT-2024-003', client: 'DataMind SRL', value: '22,300 RON', dueDate: '25 Iun 2026', status: 'Restantă' },
        { id: 'FCT-2024-004', client: 'CloudNet', value: '8,400 RON', dueDate: '01 Iul 2026', status: 'Plătită' },
    ];

    const landingMetrics = [
        { label: 'Vizitatori', value: '12,450', icon: <Users className="w-5 h-5" />, change: '+24%' },
        { label: 'Conversii', value: '3,2%', icon: <MousePointerClick className="w-5 h-5" />, change: '+1.1%' },
        { label: 'Rata de respingere', value: '42%', icon: <Activity className="w-5 h-5" />, change: '-8%' },
        { label: 'Timp pe pagină', value: '4m 12s', icon: <Clock className="w-5 h-5" />, change: '+30s' },
    ];

    const renderModulePreview = () => {
        if (!activeModulePreview) return null;

        return (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 p-4" onClick={() => setActiveModulePreview(null)}>
                <div className="bg-white w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl border border-slate-200 p-6 md:p-8 animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            {marketplaceModules.find(m => m.id === activeModulePreview)?.icon}
                            Previzualizare {marketplaceModules.find(m => m.id === activeModulePreview)?.name}
                        </h2>
                        <button onClick={() => setActiveModulePreview(null)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5" /></button>
                    </div>

                    {activeModulePreview === 'crm' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                                    <p className="text-sm text-blue-600 font-medium">Lead-uri Noi</p>
                                    <p className="text-3xl font-bold text-blue-900 mt-1">47</p>
                                    <span className="text-xs text-blue-700 flex items-center gap-1 mt-2"><ArrowUpRight className="w-3 h-3" /> 12 față de luna trecută</span>
                                </div>
                                <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                                    <p className="text-sm text-emerald-600 font-medium">Rata de Conversie</p>
                                    <p className="text-3xl font-bold text-emerald-900 mt-1">24%</p>
                                    <span className="text-xs text-emerald-700 flex items-center gap-1 mt-2"><ArrowUpRight className="w-3 h-3" /> +5%</span>
                                </div>
                                <div className="bg-purple-50 p-5 rounded-2xl border border-purple-100">
                                    <p className="text-sm text-purple-600 font-medium">Valoare Pipeline</p>
                                    <p className="text-3xl font-bold text-purple-900 mt-1">118k RON</p>
                                    <span className="text-xs text-purple-700 flex items-center gap-1 mt-2"><ArrowUpRight className="w-3 h-3" /> +18%</span>
                                </div>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                                <div className="p-4 bg-slate-50 border-b border-slate-100 font-semibold text-slate-700">Oportunități Active</div>
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 text-slate-500">
                                    <tr>
                                        <th className="p-3 pl-4">Companie</th>
                                        <th className="p-3">Contact</th>
                                        <th className="p-3">Valoare</th>
                                        <th className="p-3">Stadiu</th>
                                        <th className="p-3 pr-4">Probabilitate</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                    {crmDeals.map((deal, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-3 pl-4 font-medium text-slate-800">{deal.name}</td>
                                            <td className="p-3 text-slate-600">{deal.contact}</td>
                                            <td className="p-3 font-semibold text-slate-900">{deal.value}</td>
                                            <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              deal.stage === 'Contract' ? 'bg-emerald-100 text-emerald-700' :
                                  deal.stage === 'Negociere' ? 'bg-amber-100 text-amber-700' :
                                      deal.stage === 'Propunere' ? 'bg-blue-100 text-blue-700' :
                                          'bg-slate-100 text-slate-600'
                          }`}>{deal.stage}</span>
                                            </td>
                                            <td className="p-3 pr-4">
                                                <div className="w-full bg-slate-200 rounded-full h-2">
                                                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${deal.probability}%` }}></div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeModulePreview === 'ecommerce' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <DollarSign className="text-emerald-500 w-8 h-8 p-1.5 bg-emerald-50 rounded-lg" />
                                        <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">+8.2%</span>
                                    </div>
                                    <p className="text-2xl font-bold mt-3">45.2k RON</p>
                                    <p className="text-sm text-slate-500">Vânzări Azi</p>
                                </div>
                                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <Package className="text-blue-500 w-8 h-8 p-1.5 bg-blue-50 rounded-lg" />
                                        <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full">+3.1%</span>
                                    </div>
                                    <p className="text-2xl font-bold mt-3">1,204</p>
                                    <p className="text-sm text-slate-500">Comenzi</p>
                                </div>
                                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <Eye className="text-purple-500 w-8 h-8 p-1.5 bg-purple-50 rounded-lg" />
                                        <span className="text-xs text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-full">+12.5%</span>
                                    </div>
                                    <p className="text-2xl font-bold mt-3">34.8k</p>
                                    <p className="text-sm text-slate-500">Vizualizări</p>
                                </div>
                                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <ShoppingCart className="text-amber-500 w-8 h-8 p-1.5 bg-amber-50 rounded-lg" />
                                        <span className="text-xs text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-full">-2.4%</span>
                                    </div>
                                    <p className="text-2xl font-bold mt-3">68%</p>
                                    <p className="text-sm text-slate-500">Rata de abandon</p>
                                </div>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                                <div className="p-4 bg-slate-50 border-b border-slate-100 font-semibold text-slate-700">Ultimele Comenzi</div>
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 text-slate-500">
                                    <tr>
                                        <th className="p-3 pl-4">ID Comandă</th>
                                        <th className="p-3">Client</th>
                                        <th className="p-3">Produs</th>
                                        <th className="p-3">Sumă</th>
                                        <th className="p-3 pr-4">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                    {ecommerceOrders.map((order, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-3 pl-4 font-medium text-indigo-600">{order.id}</td>
                                            <td className="p-3 text-slate-800">{order.customer}</td>
                                            <td className="p-3 text-slate-600">{order.product}</td>
                                            <td className="p-3 font-semibold text-slate-900">{order.amount}</td>
                                            <td className="p-3 pr-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              order.status === 'Livrat' || order.status === 'Finalizat' ? 'bg-emerald-100 text-emerald-700' :
                                  order.status === 'Procesare' ? 'bg-amber-100 text-amber-700' :
                                      'bg-red-100 text-red-700'
                          }`}>{order.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeModulePreview === 'erp' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 flex items-center gap-4">
                                    <CreditCard className="text-amber-600 w-10 h-10 p-2 bg-amber-100 rounded-xl" />
                                    <div>
                                        <p className="text-sm text-amber-700 font-medium">Conturi de încasat</p>
                                        <p className="text-2xl font-bold text-amber-900">48,200 RON</p>
                                    </div>
                                </div>
                                <div className="bg-red-50 p-5 rounded-2xl border border-red-100 flex items-center gap-4">
                                    <Truck className="text-red-600 w-10 h-10 p-2 bg-red-100 rounded-xl" />
                                    <div>
                                        <p className="text-sm text-red-700 font-medium">Stocuri Minime</p>
                                        <p className="text-2xl font-bold text-red-900">12 Produse</p>
                                    </div>
                                </div>
                                <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 flex items-center gap-4">
                                    <BarChart3 className="text-emerald-600 w-10 h-10 p-2 bg-emerald-100 rounded-xl" />
                                    <div>
                                        <p className="text-sm text-emerald-700 font-medium">Profit Net (T3)</p>
                                        <p className="text-2xl font-bold text-emerald-900">112,800 RON</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                                <div className="p-4 bg-slate-50 border-b border-slate-100 font-semibold text-slate-700">Facturi Recente</div>
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 text-slate-500">
                                    <tr>
                                        <th className="p-3 pl-4">Număr</th>
                                        <th className="p-3">Client</th>
                                        <th className="p-3">Valoare</th>
                                        <th className="p-3">Scadentă</th>
                                        <th className="p-3 pr-4">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                    {erpInvoices.map((inv, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-3 pl-4 font-medium text-slate-700">{inv.id}</td>
                                            <td className="p-3 text-slate-800">{inv.client}</td>
                                            <td className="p-3 font-semibold text-slate-900">{inv.value}</td>
                                            <td className="p-3 text-slate-600 flex items-center gap-1"><Calendar className="w-3 h-3" /> {inv.dueDate}</td>
                                            <td className="p-3 pr-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              inv.status === 'Plătită' ? 'bg-emerald-100 text-emerald-700' :
                                  inv.status === 'În așteptare' ? 'bg-amber-100 text-amber-700' :
                                      'bg-red-100 text-red-700'
                          }`}>{inv.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeModulePreview === 'landing' && (
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-3xl border border-purple-100 shadow-inner">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-indigo-300 rounded-full"></div>
                                    <div className="w-3 h-3 bg-purple-200 rounded-full"></div>
                                    <span className="text-xs text-slate-400 ml-2">https://firma-ta.ro</span>
                                </div>
                                <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100">
                                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">✨ AI Generated</span>
                                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4 leading-tight">Transformă-ți afacerea cu <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Inteligență Artificială</span></h1>
                                    <p className="text-slate-500 mt-4 max-w-2xl text-lg">O platformă all-in-one care automatizează procesele, analizează datele și crește eficiența echipei tale.</p>
                                    <div className="flex gap-3 mt-8">
                                        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg">Începe Acum</button>
                                        <button className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">Află Mai Multe</button>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {landingMetrics.map((metric, i) => (
                                    <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                        <div className="flex items-center gap-2 text-slate-500 mb-2">{metric.icon}</div>
                                        <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                                        <p className="text-sm text-slate-500">{metric.label}</p>
                                        <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1"><ArrowUpRight className="w-3 h-3" /> {metric.change}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 relative overflow-hidden flex flex-col">
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-2 rounded-lg text-white">
                        <Sparkles className="w-5 h-5" />
                    </div>

                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            AI Workflows
          </span>
                </div>

                <div className="hidden md:flex flex-1 justify-center">
                    <button
                        type="button"
                        onClick={() => {
                            if (isDataProcessed) {
                                setIsModulesOpen(true);
                            }
                        }}
                        title={!isDataProcessed ? 'Procesează datele mai întâi' : ''}
                        className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${
                            isDataProcessed
                                ? 'bg-slate-100/80 text-slate-700 hover:bg-slate-200 hover:text-indigo-700 cursor-pointer'
                                : 'bg-slate-50 text-slate-400 border border-slate-200 border-dashed cursor-not-allowed'
                        }`}
                    >
                        {isDataProcessed ? (
                            <Grid className="w-4 h-4" />
                        ) : (
                            <Lock className="w-4 h-4" />
                        )}
                        App Store {isDataProcessed ? 'Module' : '(Blocat)'}
                    </button>
                </div>

                <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm font-medium text-slate-500">
                    <div
                        className={`flex items-center gap-1 ${
                            step === 1 ? 'text-indigo-600' : 'text-green-500'
                        }`}
                    >
            <span className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center border-2 border-current">
              1
            </span>
                        <span className="hidden md:inline">Încărcare</span>
                    </div>

                    <ChevronRight className="w-4 h-4" />

                    <div
                        className={`flex items-center gap-1 ${
                            step === 2
                                ? 'text-indigo-600'
                                : step === 3 || step === 'processing'
                                    ? 'text-green-500'
                                    : 'text-slate-400'
                        }`}
                    >
            <span className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center border-2 border-current">
              2
            </span>
                        <span className="hidden md:inline">Verificare</span>
                    </div>

                    <ChevronRight className="w-4 h-4" />

                    <div
                        className={`flex items-center gap-1 ${
                            step === 3
                                ? 'text-indigo-600'
                                : step === 'processing'
                                    ? 'text-blue-500 animate-pulse'
                                    : 'text-slate-400'
                        }`}
                    >
            <span className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center border-2 border-current">
              3
            </span>
                        <span className="hidden md:inline">Analiză AI</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-6xl mx-auto p-6 md:p-12 w-full">
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
                                Transformă datele nestructurate în{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  Inteligență Vizuală
                </span>
                            </h1>

                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                Încarcă poze, facturi, tabele Excel sau PDF-uri. Sistemul
                                nostru bazat pe Gemini AI va extrage, structura și crea grafice
                                automat în câteva secunde.
                            </p>
                        </div>

                        <div
                            className={`border-3 border-dashed rounded-3xl p-16 text-center transition-all duration-200 bg-white ${
                                isDragging
                                    ? 'border-indigo-500 bg-indigo-50 shadow-inner'
                                    : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50 shadow-sm'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="w-24 h-24 mx-auto bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-8 shadow-sm">
                                <UploadCloud className="w-12 h-12" />
                            </div>

                            <h3 className="text-2xl font-bold mb-3 text-slate-800">
                                Trage și lasă fișierele aici
                            </h3>

                            <p className="text-slate-500 mb-10 text-lg">
                                Suportăm imagini JPG/PNG, fișiere Excel, CSV și PDF-uri.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <label className="cursor-pointer bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-3">
                                    <FileText className="w-6 h-6" />
                                    Alege Fișiere
                                    <input
                                        type="file"
                                        multiple
                                        className="hidden"
                                        onChange={handleFileInput}
                                    />
                                </label>

                                <button
                                    type="button"
                                    onClick={addSimulatedCameraPhoto}
                                    className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm flex items-center gap-3"
                                >
                                    <Camera className="w-6 h-6" />
                                    Fă o poză pe loc
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-3xl mx-auto">
                        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-3xl font-extrabold text-slate-900">
                                        Fișiere pregătite
                                    </h2>
                                    <p className="text-slate-500 mt-1">
                                        Verifică documentele înainte de a le trimite către AI.
                                    </p>
                                </div>

                                <div className="bg-indigo-100 text-indigo-700 font-bold px-4 py-2 rounded-xl">
                                    {files.length} {files.length === 1 ? 'fișier' : 'fișiere'}
                                </div>
                            </div>

                            <div className="space-y-4 mb-10 max-h-[400px] overflow-y-auto pr-2">
                                {files.map((file, idx) => (
                                    <div
                                        key={`${file.name}-${idx}`}
                                        className="flex items-center p-4 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 rounded-2xl gap-4 group"
                                    >
                                        <div className="p-3 bg-white rounded-xl shadow-sm">
                                            {getFileIcon(file.type)}
                                        </div>

                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-base font-bold text-slate-800 truncate">
                                                {file.name}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                {file.size} • Uploadat cu succes
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => removeFile(idx)}
                                            className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                            title="Șterge fișier"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
                                <label className="cursor-pointer flex-1 bg-white border-2 border-dashed border-slate-300 text-slate-600 py-4 rounded-xl font-bold hover:bg-slate-50 hover:border-indigo-400 transition-colors flex items-center justify-center gap-2">
                                    <span>+ Adaugă alte fișiere</span>
                                    <input
                                        type="file"
                                        multiple
                                        className="hidden"
                                        onChange={handleFileInput}
                                    />
                                </label>

                                <button
                                    type="button"
                                    onClick={processData}
                                    className="flex-[2] py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/30 hover:scale-[1.02] transition-all"
                                >
                                    <Sparkles className="w-6 h-6" />
                                    Procesează datele cu AI
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 'processing' && (
                    <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-300">
                        <div className="relative w-32 h-32 mb-8">
                            <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20" />
                            <div className="absolute inset-2 bg-purple-500 rounded-full animate-pulse opacity-40" />
                            <div className="absolute inset-4 bg-white rounded-full shadow-2xl flex items-center justify-center z-10">
                                <Bot className="w-12 h-12 text-indigo-600" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-800 mb-2">
                            Gemini analizează documentele...
                        </h2>

                        <p className="text-slate-500">
                            Extragem tabelele, citim chitanțele și interpretăm structura
                            vizuală.
                        </p>

                        <div className="w-64 h-2 bg-slate-100 rounded-full mt-8 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-full rounded-full origin-left animate-[progress_3s_ease-in-out]" />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                                    Dashboard Generat Auto
                                </h2>

                                <p className="text-slate-500">
                                    Iată informațiile extrase din cele {files.length} fișiere
                                    încărcate de tine.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                            >
                                + Încarcă date noi
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            {kpis.map((kpi, i) => (
                                <div
                                    key={`${kpi.label}-${i}`}
                                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-slate-50 rounded-lg">{kpi.icon}</div>
                                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      {kpi.change}
                    </span>
                                    </div>

                                    <h4 className="text-slate-500 text-sm font-medium">
                                        {kpi.label}
                                    </h4>

                                    <p className="text-2xl font-bold text-slate-900 mt-1">
                                        {kpi.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-indigo-500" />
                                        Vânzări Lunare
                                    </h3>

                                    <span className="text-xs text-slate-400 font-medium">
                    Extrase din Excel-uri
                  </span>
                                </div>

                                <div className="h-64 flex items-end gap-3 justify-between mt-6">
                                    {[40, 70, 45, 90, 65, 100, 85].map((val, i) => (
                                        <div
                                            key={`${val}-${i}`}
                                            className="w-full flex flex-col items-center gap-2 group"
                                        >
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-md">
                        {val * 120}K
                      </span>

                                            <div
                                                className="w-full bg-indigo-50 rounded-t-md relative flex justify-center group-hover:bg-indigo-100 transition-colors"
                                                style={{ height: `${val}%` }}
                                            >
                                                <div
                                                    className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-md absolute bottom-0 transition-all duration-1000 ease-out"
                                                    style={{ height: '100%' }}
                                                />
                                            </div>

                                            <span className="text-xs text-slate-500 font-medium">
                        {['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul'][i]}
                      </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <PieChart className="w-5 h-5 text-purple-500" />
                                    Categorii de Cheltuieli
                                </h3>

                                <div className="space-y-6">
                                    {expenseCategories.map((item, i) => (
                                        <div key={`${item.name}-${i}`}>
                                            <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-700">
                          {item.name}
                        </span>
                                                <span className="font-bold text-slate-900">
                          {item.percent}%
                        </span>
                                            </div>

                                            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                                                    style={{ width: `${item.percent}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Module Previews Section */}
                        <div className="mt-12 border-t border-slate-200 pt-8">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Grid className="w-5 h-5 text-indigo-500" />
                                Module Instalate
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {marketplaceModules.map((mod) => {
                                    const isInstalled = installedModules.includes(mod.id);
                                    if (!isInstalled) return null;
                                    return (
                                        <button
                                            key={mod.id}
                                            onClick={() => setActiveModulePreview(mod.id)}
                                            className="bg-white p-5 rounded-2xl border border-slate-200 text-left hover:border-indigo-300 hover:shadow-md transition-all group"
                                        >
                                            <div className="bg-slate-50 group-hover:bg-indigo-50 transition-colors p-3 rounded-xl w-fit border border-slate-100">
                                                {mod.icon}
                                            </div>
                                            <h4 className="font-bold text-slate-800 mt-3">{mod.name}</h4>
                                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{mod.desc}</p>
                                            <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 mt-3 group-hover:gap-2 transition-all">
                        Vezi Dashboard <ArrowUpRight className="w-3 h-3" />
                      </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 mt-auto">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-2 rounded-lg text-white">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  AI Workflows
                </span>
                            </div>
                            <p className="text-slate-500 text-sm max-w-md">
                                Platforma ta all-in-one pentru automatizarea proceselor de business folosind inteligență artificială. Încarcă, analizează și acționează.
                            </p>
                            <div className="flex gap-3 mt-4">
                                <a href="#" className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                                </a>
                                <a href="#" className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                </a>
                                <a href="#" className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-800 mb-4">Produs</h4>
                            <ul className="space-y-2 text-sm text-slate-500">
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Funcționalități</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Prețuri</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Integrări</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Actualizări</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">API</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-800 mb-4">Companie</h4>
                            <ul className="space-y-2 text-sm text-slate-500">
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Despre noi</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Cariere</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Parteneri</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-400">
                            © 2026 AI Workflows. Toate drepturile rezervate.
                        </p>
                        <div className="flex gap-4 text-sm text-slate-400">
                            <a href="#" className="hover:text-indigo-600 transition-colors">Termeni și condiții</a>
                            <a href="#" className="hover:text-indigo-600 transition-colors">Confidențialitate</a>
                            <a href="#" className="hover:text-indigo-600 transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Chat Button & Panel */}
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="fixed bottom-8 right-8 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-30 border-2 border-white"
            >
                <Bot className="w-7 h-7" />
            </button>

            {isChatOpen && (
                <div className="fixed bottom-24 right-8 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-30 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
                        <h3 className="font-bold flex items-center gap-2 text-slate-800">
                            <Bot className="w-5 h-5 text-indigo-600" />
                            Asistent AI
                        </h3>
                        <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {chatMessages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                                    msg.role === 'user'
                                        ? 'bg-indigo-600 text-white rounded-br-md'
                                        : 'bg-slate-100 text-slate-800 rounded-bl-md'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 flex gap-2">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Întreabă-mă orice..."
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all"
                        />
                        <button type="submit" className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors">
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            )}

            {/* Modules Sidebar */}
            {isModulesOpen && (
                <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md h-full shadow-2xl animate-in slide-in-from-right-full duration-300 flex flex-col">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h2 className="text-xl font-extrabold flex items-center gap-2 text-slate-800">
                                    <Grid className="text-indigo-600" />
                                    Marketplace Module
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Instalează aplicații din ecosistem
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsModulesOpen(false)}
                                className="p-2 bg-white hover:bg-slate-100 rounded-full shadow-sm border border-slate-200 transition-colors text-slate-500"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                            {marketplaceModules.map((mod) => {
                                const isInstalled = installedModules.includes(mod.id);

                                return (
                                    <div
                                        key={mod.id}
                                        className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-4 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group"
                                    >
                                        <div className="bg-slate-50 group-hover:bg-indigo-50 transition-colors p-3 rounded-xl h-fit border border-slate-100">
                                            {mod.icon}
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-bold text-slate-800">{mod.name}</h3>

                                            <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
                                                {mod.desc}
                                            </p>

                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (!isInstalled) {
                                                            setInstalledModules((prev) => [...prev, mod.id]);
                                                        } else {
                                                            setInstalledModules((prev) => prev.filter(id => id !== mod.id));
                                                        }
                                                    }}
                                                    className={`text-xs font-bold px-4 py-2 rounded-lg flex items-center justify-center gap-2 flex-1 transition-colors border ${
                                                        isInstalled
                                                            ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
                                                            : 'bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white'
                                                    }`}
                                                >
                                                    {isInstalled ? (
                                                        <>
                                                            <Trash2 className="w-4 h-4" />
                                                            Dezinstalează
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Download className="w-4 h-4" />
                                                            Instalează
                                                        </>
                                                    )}
                                                </button>
                                                {isInstalled && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setActiveModulePreview(mod.id);
                                                            setIsModulesOpen(false);
                                                        }}
                                                        className="text-xs font-bold px-4 py-2 rounded-lg flex items-center justify-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition-colors"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        Preview
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Module Preview Modal */}
            {renderModulePreview()}

            <style>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-in {
          animation-duration: 0.5s;
          animation-fill-mode: both;
        }
        .fade-in {
          animation-name: fadeIn;
        }
        .slide-in-from-bottom-4 {
          animation-name: slideInFromBottom4;
        }
        .slide-in-from-bottom-8 {
          animation-name: slideInFromBottom8;
        }
        .slide-in-from-right-8 {
          animation-name: slideInFromRight8;
        }
        .slide-in-from-right-full {
          animation-name: slideInFromRightFull;
        }
        .slide-in-from-bottom-5 {
          animation-name: slideInFromBottom5;
        }
        .zoom-in-95 {
          animation-name: zoomIn95;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInFromBottom4 {
          from { transform: translateY(1rem); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInFromBottom8 {
          from { transform: translateY(2rem); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInFromBottom5 {
          from { transform: translateY(1.25rem); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInFromRight8 {
          from { transform: translateX(2rem); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInFromRightFull {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes zoomIn95 {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
        </div>
    );
}