import { ChevronRight, Grid, Menu } from 'lucide-react';
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
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4 md:relative md:px-6">
            <div className="flex min-w-0 items-center gap-2">
                <BrandLogo />
            </div>

            <div className="hidden md:absolute md:left-1/2 md:flex md:-translate-x-1/2">
                <button
                    type="button"
                    onClick={handleOpenModules}
                    disabled={!isDataProcessed}
                    title={!isDataProcessed ? 'Procesează datele mai întâi' : ''}
                    className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold shadow-sm transition-all ${
                        isDataProcessed
                            ? 'cursor-pointer bg-slate-100/80 text-slate-700 hover:bg-slate-200 hover:text-indigo-700'
                            : 'cursor-not-allowed border border-dashed border-slate-200 bg-slate-50 text-slate-400'
                    }`}
                >
                    <Grid className="h-4 w-4" />
                    App Store {isDataProcessed ? 'Module' : '(Blocat)'}
                </button>
            </div>

            <div className="ml-auto flex items-center justify-end">
                {isDataProcessed ? (
                    <button
                        type="button"
                        onClick={handleOpenModules}
                        title="Deschide App Store Module"
                        aria-label="Deschide App Store Module"
                        className="flex h-11 w-11 animate-in fade-in slide-in-from-right-4 zoom-in-95 items-center justify-center rounded-2xl border border-indigo-200 bg-indigo-50 text-indigo-700 shadow-sm transition-all duration-500 hover:bg-indigo-100 active:scale-95 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                ) : (
                    <div className="flex animate-in fade-in slide-in-from-right-3 items-center md:hidden gap-1 text-xs font-medium text-slate-500 duration-300 md:gap-4 md:text-sm">
                        <StepIndicator active={step === 1 || step === 'auth'} completed={step !== 1 && step !== 'auth'} label="Încărcare" number={1} />
                        <ChevronRight className="h-4 w-4" />
                        <StepIndicator active={step === 2} completed={step === 'processing'} label="Verificare" number={2} />
                        <ChevronRight className="h-4 w-4" />
                        <StepIndicator
                            active={false}
                            completed={false}
                            processing={step === 'processing'}
                            label="Analiză AI"
                            number={3}
                        />
                    </div>
                )}

                <div className="hidden items-center gap-4 text-sm font-medium text-slate-500 md:flex">
                    <StepIndicator active={step === 1 || step === 'auth'} completed={step !== 1 && step !== 'auth'} label="Încărcare" number={1} />
                    <ChevronRight className="h-4 w-4" />
                    <StepIndicator active={step === 2} completed={step === 3 || step === 'processing'} label="Verificare" number={2} />
                    <ChevronRight className="h-4 w-4" />
                    <StepIndicator
                        active={false}
                        completed={step === 3}
                        processing={step === 'processing'}
                        label={step === 3 ? 'Totul analizat' : 'Analiză AI'}
                        number={3}
                    />
                </div>
            </div>
        </header>
    );
}

function StepIndicator({ active, completed, processing, label, number }: { active?: boolean; completed?: boolean; processing?: boolean; label: string; number: number }) {
    const color = active ? 'text-indigo-600' : processing ? 'text-blue-500 animate-pulse' : completed ? 'text-green-500' : 'text-slate-400';

    return (
        <div className={`flex items-center gap-1 ${color}`}>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-current md:h-6 md:w-6">
                {number}
            </span>
            <span className="hidden md:inline">{label}</span>
        </div>
    );
}
