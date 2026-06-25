import { CheckCircle2, Download, Eye, Grid, Loader2, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { marketplaceModules } from '../moduleData';
import type { ModuleId } from '../types';

type Props = {
    isOpen: boolean;
    installedModules: ModuleId[];
    onClose: () => void;
    onToggleModule: (moduleId: ModuleId) => void;
    onPreviewModule: (moduleId: ModuleId) => void;
};

export function ModulesSidebar({ isOpen, installedModules, onClose, onToggleModule, onPreviewModule }: Props) {
    const [installingModule, setInstallingModule] = useState<ModuleId | null>(null);

    useEffect(() => {
        if (!isOpen) setInstallingModule(null);
    }, [isOpen]);

    if (!isOpen) return null;

    const handleToggleModule = (moduleId: ModuleId, isInstalled: boolean) => {
        if (isInstalled) {
            onToggleModule(moduleId);
            return;
        }

        setInstallingModule(moduleId);
        window.setTimeout(() => {
            onToggleModule(moduleId);
            setInstallingModule(null);
        }, 900);
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md h-full shadow-2xl animate-in slide-in-from-right-full duration-300 flex flex-col overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-slate-100 flex justify-between items-center gap-3 bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-extrabold flex items-center gap-2 text-slate-800"><Grid className="text-indigo-600" />Marketplace Module</h2>
                        <p className="text-sm text-slate-500 mt-1">Instalează aplicații din ecosistem</p>
                    </div>
                    <button type="button" onClick={onClose} className="p-2 bg-white hover:bg-slate-100 rounded-full shadow-sm border border-slate-200 transition-colors text-slate-500"><X className="w-5 h-5" /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
                    {marketplaceModules.map((mod) => {
                        const isInstalled = installedModules.includes(mod.id);
                        const isInstalling = installingModule === mod.id;
                        return (
                            <div key={mod.id} className={`relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group sm:flex-row sm:gap-4 ${isInstalling ? 'animate-install-pop ring-2 ring-indigo-100' : ''}`}>
                                {isInstalling && <div className="absolute inset-x-0 top-0 h-1 bg-indigo-100"><div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 animate-install-pulse" /></div>}
                                <div className="bg-slate-50 group-hover:bg-indigo-50 transition-colors p-3 rounded-xl h-fit border border-slate-100">{mod.icon}</div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-bold text-slate-800">{mod.name}</h3>
                                    <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">{mod.desc}</p>
                                    <div className="flex flex-col gap-2 min-[380px]:flex-row">
                                        <button type="button" disabled={isInstalling} onClick={() => handleToggleModule(mod.id, isInstalled)} className={`min-w-0 text-xs font-bold px-3 py-2 rounded-lg flex items-center justify-center gap-2 flex-1 transition-colors border ${isInstalled ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100' : isInstalling ? 'bg-indigo-600 border-indigo-600 text-white cursor-wait' : 'bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white'}`}>
                                            {isInstalled ? <><Trash2 className="w-4 h-4" />Dezinstalează</> : isInstalling ? <><Loader2 className="w-4 h-4 animate-spin" />Instalare...</> : <><Download className="w-4 h-4" />Instalează</>}
                                        </button>
                                        {isInstalling && <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700"><CheckCircle2 className="h-4 w-4" />Configurare modul</div>}
                                        {isInstalled && (
                                            <button type="button" onClick={() => onPreviewModule(mod.id)} className="min-w-0 text-xs font-bold px-3 py-2 rounded-lg flex items-center justify-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition-colors">
                                                <Eye className="w-4 h-4" />Preview
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
    );
}
