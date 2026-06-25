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
    X
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
    const [installedModules, setInstalledModules] = useState<ModuleId[]>([]);
    const [activeModule, setActiveModule] = useState<ModuleId | null>(null);

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
            type: file.type.includes('image')
                ? 'image'
                : file.name.toLowerCase().includes('.pdf')
                    ? 'pdf'
                    : 'excel',
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

    const monthlySales = [
        { month: 'Ian', value: 48, total: '4.8K' },
        { month: 'Feb', value: 74, total: '8.4K' },
        { month: 'Mar', value: 52, total: '6.1K' },
        { month: 'Apr', value: 91, total: '10.9K' },
        { month: 'Mai', value: 68, total: '7.8K' },
        { month: 'Iun', value: 100, total: '12.4K' },
        { month: 'Iul', value: 86, total: '9.9K' }
    ];

    const moduleScreens: Record<ModuleId, { title: string; subtitle: string; stats: string[]; rows: string[] }> = {
        crm: {
            title: 'CRM Integrat',
            subtitle: 'Pipeline demo cu prospecți, task-uri și oportunități generate din datele încărcate.',
            stats: ['38 lead-uri', '12 oportunități', '64% follow-up'],
            rows: ['Dacia Service — ofertă flote — 24.000 RON', 'Nova Retail — demo programat — 8.500 RON', 'Atlas Construct — contract în negociere — 31.200 RON']
        },
        ecommerce: {
            title: 'eCommerce',
            subtitle: 'Magazin demo sincronizat cu produse, comenzi și stocuri exemplu.',
            stats: ['126 produse', '18 comenzi azi', '92% stoc activ'],
            rows: ['Comanda #1048 — 3 produse — 1.240 RON', 'Comanda #1049 — 1 produs — 340 RON', 'Comanda #1050 — 7 produse — 2.860 RON']
        },
        erp: {
            title: 'ERP Cloud',
            subtitle: 'Centru operațional demo pentru facturi, resurse și costuri recurente.',
            stats: ['54 facturi', '7 centre cost', '18 aprobări'],
            rows: ['Factura F-2381 — Software SaaS — scadentă vineri', 'Achiziție A-144 — Echipamente — în aprobare', 'Buget Q3 — Marketing — consum 62%']
        },
        landing: {
            title: 'Landing Page AI',
            subtitle: 'Pagini demo generate automat pentru campanii, servicii și captare lead-uri.',
            stats: ['4 pagini', '21.8% conversie', '312 lead-uri'],
            rows: ['Pagina „Audit AI gratuit” — 148 lead-uri', 'Pagina „Automatizări facturi” — 96 lead-uri', 'Pagina „Demo CRM” — 68 lead-uri']
        }
    };

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

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 relative overflow-hidden">
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

            <main className="max-w-6xl mx-auto p-6 md:p-12">
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

                                <div className="h-72 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-100 p-4">
                                    <div className="h-full grid grid-cols-7 items-end gap-3 border-b border-l border-slate-200 px-3 pt-6 pb-8 relative">
                                        <div className="absolute left-3 right-3 top-1/3 border-t border-dashed border-slate-200" />
                                        <div className="absolute left-3 right-3 top-2/3 border-t border-dashed border-slate-200" />
                                        {monthlySales.map((item) => (
                                            <div key={item.month} className="h-full flex flex-col items-center justify-end gap-2 group relative z-10">
                                                <span className="text-[11px] font-bold text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded-full shadow-sm opacity-100">
                                                    {item.total}
                                                </span>

                                                <div className="w-full max-w-10 flex-1 flex items-end">
                                                    <div
                                                        className="w-full min-h-6 rounded-t-xl bg-gradient-to-t from-indigo-600 via-violet-500 to-purple-400 shadow-lg shadow-indigo-500/20 group-hover:from-indigo-700 group-hover:to-fuchsia-500 transition-all"
                                                        style={{ height: `${item.value}%` }}
                                                    />
                                                </div>

                                                <span className="absolute -bottom-6 text-xs text-slate-500 font-semibold">
                                                    {item.month}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
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

                        {installedModules.length > 0 && (
                            <div className="mt-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
                                    <div>
                                        <h3 className="font-bold text-xl text-slate-900">Module instalate</h3>
                                        <p className="text-sm text-slate-500">Fiecare modul afișează pagini demo cu date exemplu.</p>
                                    </div>
                                    <button type="button" onClick={() => setIsModulesOpen(true)} className="text-sm font-bold text-indigo-600 hover:text-indigo-800">+ Adaugă module</button>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {installedModules.map((moduleId) => (
                                        <button
                                            key={moduleId}
                                            type="button"
                                            onClick={() => setActiveModule(moduleId)}
                                            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                                                activeModule === moduleId
                                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300'
                                            }`}
                                        >
                                            {moduleScreens[moduleId].title}
                                        </button>
                                    ))}
                                </div>

                                {activeModule && (
                                    <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-5">
                                        <h4 className="text-lg font-extrabold text-slate-900">{moduleScreens[activeModule].title}</h4>
                                        <p className="text-sm text-slate-500 mt-1 mb-5">{moduleScreens[activeModule].subtitle}</p>

                                        <div className="grid md:grid-cols-3 gap-3 mb-5">
                                            {moduleScreens[activeModule].stats.map((stat) => (
                                                <div key={stat} className="bg-white/80 rounded-xl border border-white p-4 font-bold text-slate-800 shadow-sm">
                                                    {stat}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-3">
                                            {moduleScreens[activeModule].rows.map((row) => (
                                                <div key={row} className="bg-white rounded-xl border border-slate-100 p-4 text-sm text-slate-700 flex items-center justify-between gap-4">
                                                    <span>{row}</span>
                                                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">Demo</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </main>

            <footer className="max-w-6xl mx-auto px-6 md:px-12 py-8 border-t border-slate-200 text-sm text-slate-500 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                <span className="font-semibold text-slate-700">AI Workflows</span>
                <span>Frontend demo pentru procesare documente, dashboard AI și module extensibile.</span>
                <span>© 2026</span>
            </footer>

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

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (!isInstalled) {
                                                        setInstalledModules((prev) => [...prev, mod.id]);
                                                    }
                                                    setActiveModule(mod.id);
                                                    setIsModulesOpen(false);
                                                }}
                                                className={`text-xs font-bold px-4 py-2 rounded-lg flex items-center justify-center gap-2 w-full transition-colors border ${
                                                    isInstalled
                                                        ? 'bg-green-50 border-green-200 text-green-700 cursor-default'
                                                        : 'bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white'
                                                }`}
                                            >
                                                {isInstalled ? (
                                                    <>
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        Instalat
                                                    </>
                                                ) : (
                                                    <>
                                                        <Download className="w-4 h-4" />
                                                        Instalează
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            <button
                type="button"
                onClick={() => {
                    if (isDataProcessed) {
                        setIsChatOpen(true);
                    }
                }}
                className={`fixed bottom-8 right-8 z-40 p-4 rounded-full transition-all flex items-center gap-3 pr-6 group ${
                    isDataProcessed
                        ? 'bg-slate-900 text-white shadow-2xl hover:bg-slate-800 hover:scale-110 cursor-pointer'
                        : 'bg-white border border-slate-200 text-slate-400 shadow-sm cursor-not-allowed'
                }`}
            >
                <div
                    className={`p-2 rounded-full transition-colors ${
                        isDataProcessed
                            ? 'bg-gradient-to-tr from-indigo-500 to-purple-500'
                            : 'bg-slate-100'
                    }`}
                >
                    {isDataProcessed ? (
                        <Sparkles className="w-5 h-5 text-white" />
                    ) : (
                        <Lock className="w-5 h-5 text-slate-400" />
                    )}
                </div>

                <span className="font-bold text-sm">
          {isDataProcessed ? 'Întreabă AI-ul' : 'AI Indisponibil'}
        </span>
            </button>

            {isChatOpen && (
                <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-md animate-in fade-in duration-300 flex flex-col">
                    <div className="bg-white border-b border-slate-200 p-4 px-8 flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-100 p-2 rounded-xl">
                                <Bot className="w-6 h-6 text-indigo-600" />
                            </div>

                            <div>
                                <h2 className="font-bold text-lg">Asistent Date AI</h2>

                                <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500" />
                                    Online
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsChatOpen(false)}
                            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full space-y-6">
                        {chatMessages.map((msg, i) => (
                            <div
                                key={`${msg.role}-${i}`}
                                className={`flex ${
                                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                <div
                                    className={`max-w-[80%] flex gap-4 ${
                                        msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                                    }`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            msg.role === 'user'
                                                ? 'bg-slate-800'
                                                : 'bg-gradient-to-tr from-indigo-600 to-purple-600'
                                        }`}
                                    >
                                        {msg.role === 'user' ? (
                                            <span className="text-white font-bold text-sm">EU</span>
                                        ) : (
                                            <Sparkles className="w-5 h-5 text-white" />
                                        )}
                                    </div>

                                    <div
                                        className={`p-4 rounded-2xl text-sm md:text-base leading-relaxed ${
                                            msg.role === 'user'
                                                ? 'bg-slate-100 text-slate-800 rounded-tr-none'
                                                : 'bg-white border border-slate-200 shadow-sm rounded-tl-none text-slate-700'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div ref={chatEndRef} />
                    </div>

                    <div className="bg-white border-t border-slate-200 p-6">
                        <form
                            onSubmit={handleSendMessage}
                            className="max-w-4xl mx-auto relative flex items-center"
                        >
                            <input
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                placeholder="Ex: Cât am cheltuit pe marketing luna trecută?..."
                                className="w-full bg-slate-50 border border-slate-200 p-4 pr-16 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow text-lg"
                            />

                            <button
                                type="submit"
                                disabled={!chatInput.trim()}
                                className="absolute right-3 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-slate-300 transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>

                        <p className="text-center text-xs text-slate-400 mt-3">
                            AI-ul poate face greșeli. Verifică datele extrase în dashboard.
                        </p>
                    </div>
                </div>
            )}

            <style
                dangerouslySetInnerHTML={{
                    __html: `
            @keyframes progress {
              0% { width: 0%; }
              50% { width: 70%; }
              100% { width: 100%; }
            }
          `
                }}
            />
        </div>
    );
}