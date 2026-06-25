import { ChevronRight, Grid, Lock, Menu } from 'lucide-react';
import type { Step } from '../types';
import { BrandLogo } from './BrandLogo';

type Props = {
    step: Step;
    isDataProcessed: boolean;
    onOpenModules: () => void;
};

export function AppHeader({ step, isDataProcessed, onOpenModules }: Props) {
    const handleOpenModules = () => {
        if (isDataProcessed) onOpenModules();
    };

    return (
        <header className="bg-white border-b border-slate-200 px-4 py-4 md:px-6 flex justify-between items-center sticky top-0 z-10 gap-3">
            <div className="flex items-center gap-2 min-w-0">
                <button
                    type="button"
                    onClick={handleOpenModules}
                    disabled={!isDataProcessed}
                    title={!isDataProcessed ? 'Procesează datele mai întâi' : 'Deschide App Store Module'}
                    aria-label={isDataProcessed ? 'Deschide App Store Module' : 'App Store Module blocat până la finalizarea analizei'}
                    className={`md:hidden flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-all ${
                        isDataProcessed
                            ? 'border-indigo-200 bg-indigo-50 text-indigo-700 shadow-sm hover:bg-indigo-100 active:scale-95'
                            : 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
                    }`}
                >
                    {isDataProcessed ? <Menu className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                </button>
                <BrandLogo />
            </div>

            <div className="hidden md:flex flex-1 justify-center">
                <button
                    type="button"
                    onClick={handleOpenModules}
                    disabled={!isDataProcessed}
                    title={!isDataProcessed ? 'Procesează datele mai întâi' : ''}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${
                        isDataProcessed
                            ? 'bg-slate-100/80 text-slate-700 hover:bg-slate-200 hover:text-indigo-700 cursor-pointer'
                            : 'bg-slate-50 text-slate-400 border border-slate-200 border-dashed cursor-not-allowed'
                    }`}
                >
                    {isDataProcessed ? <Grid className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    App Store {isDataProcessed ? 'Module' : '(Blocat)'}
                </button>
            </div>

            <div className="flex items-center gap-1 text-xs font-medium text-slate-500 md:gap-4 md:text-sm">
                <StepIndicator active={step === 1} completed={step !== 1} label="Încărcare" number={1} />
                <ChevronRight className="w-4 h-4" />
                <StepIndicator active={step === 2} completed={step === 3 || step === 'processing'} label="Verificare" number={2} />
                <ChevronRight className="w-4 h-4" />
                <StepIndicator
                    active={false}
                    completed={step === 3}
                    processing={step === 'processing'}
                    label={step === 3 ? 'Totul analizat' : 'Analiză AI'}
                    number={3}
                />
            </div>
        </header>
    );
}

function StepIndicator({ active, completed, processing, label, number }: { active?: boolean; completed?: boolean; processing?: boolean; label: string; number: number }) {
    const color = active ? 'text-indigo-600' : processing ? 'text-blue-500 animate-pulse' : completed ? 'text-green-500' : 'text-slate-400';

    return (
        <div className={`flex items-center gap-1 ${color}`}>
            <span className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center border-2 border-current">
                {number}
            </span>
            <span className="hidden md:inline">{label}</span>
        </div>
    );
}
