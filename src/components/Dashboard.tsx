import { ArrowUpRight, BarChart3, Grid, PieChart } from 'lucide-react';
import { expenseCategories, getDashboardKpis } from '../dashboardData';
import { marketplaceModules } from '../moduleData';
import type { ModuleId } from '../types';
import { MonthlySalesChart } from './MonthlySalesChart';

type Props = {
    fileCount: number;
    installedModules: ModuleId[];
    onResetUpload: () => void;
    onOpenModule: (moduleId: ModuleId) => void;
};

export function Dashboard({ fileCount, installedModules, onResetUpload, onOpenModule }: Props) {
    const kpis = getDashboardKpis(fileCount);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Generat Auto</h2>
                    <p className="text-slate-500">Iată informațiile extrase din cele {fileCount} fișiere încărcate de tine.</p>
                </div>
                <button type="button" onClick={onResetUpload} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    + Încarcă date noi
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {kpis.map((kpi, i) => (
                    <div key={`${kpi.label}-${i}`} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-slate-50 rounded-lg">{kpi.icon}</div>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{kpi.change}</span>
                        </div>
                        <h4 className="text-slate-500 text-sm font-medium">{kpi.label}</h4>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{kpi.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg flex items-center gap-2"><BarChart3 className="w-5 h-5 text-indigo-500" />Vânzări Lunare</h3>
                        <span className="text-xs text-slate-400 font-medium">Extrase din Excel-uri</span>
                    </div>
                    <MonthlySalesChart />
                </div>
                <ExpenseCategories />
            </div>

            <InstalledModules installedModules={installedModules} onOpenModule={onOpenModule} />
        </div>
    );
}

function ExpenseCategories() {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><PieChart className="w-5 h-5 text-purple-500" />Categorii de Cheltuieli</h3>
            <div className="space-y-6">
                {expenseCategories.map((item, i) => (
                    <div key={`${item.name}-${i}`}>
                        <div className="flex justify-between text-sm mb-1"><span className="font-medium text-slate-700">{item.name}</span><span className="font-bold text-slate-900">{item.percent}%</span></div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${item.percent}%` }} /></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function InstalledModules({ installedModules, onOpenModule }: { installedModules: ModuleId[]; onOpenModule: (moduleId: ModuleId) => void }) {
    const installedMarketplaceModules = marketplaceModules.filter((mod) => installedModules.includes(mod.id));

    return (
        <div className="mt-12 border-t border-slate-200 pt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Grid className="w-5 h-5 text-indigo-500" />Module Instalate</h3>
            {installedMarketplaceModules.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                    Nu există module instalate încă. Deschide App Store Module și instalează ce ai nevoie.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {installedMarketplaceModules.map((mod) => (
                        <button key={mod.id} onClick={() => onOpenModule(mod.id)} className="bg-white p-5 rounded-2xl border border-slate-200 text-left hover:border-indigo-300 hover:shadow-md transition-all group">
                            <div className="bg-slate-50 group-hover:bg-indigo-50 transition-colors p-3 rounded-xl w-fit border border-slate-100">{mod.icon}</div>
                            <h4 className="font-bold text-slate-800 mt-3">{mod.name}</h4>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{mod.desc}</p>
                            <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 mt-3 group-hover:gap-2 transition-all">Vezi Dashboard <ArrowUpRight className="w-3 h-3" /></span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
