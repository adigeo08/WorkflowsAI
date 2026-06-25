import React, { useEffect, useRef, useState } from 'react';
import { Grid, Lock } from 'lucide-react';
import { AppAnimations } from './components/AppAnimations';
import { AppFooter } from './components/AppFooter';
import { AppHeader } from './components/AppHeader';
import { ChatWidget } from './components/ChatWidget';
import { Dashboard } from './components/Dashboard';
import { ModulePreviewModal } from './components/ModulePreviewModal';
import { ModulesSidebar } from './components/ModulesSidebar';
import { ProcessingStep } from './components/ProcessingStep';
import { ReviewStep } from './components/ReviewStep';
import { UploadStep } from './components/UploadStep';
import type { ChatMessage, ModuleId, Step, UploadedFile } from './types';

export default function App() {
    const [step, setStep] = useState<Step>(1);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isModulesOpen, setIsModulesOpen] = useState(false);
    const [installedModules, setInstalledModules] = useState<ModuleId[]>([]);
    const [activeModulePreview, setActiveModulePreview] = useState<ModuleId | null>(null);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        { role: 'ai', text: 'Salut! Sunt asistentul tău AI. Am analizat documentele tale. Cu ce te pot ajuta astăzi?' }
    ]);
    const [chatInput, setChatInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    const isDataProcessed = step === 3;

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages, isChatOpen]);

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

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        addFiles(Array.from(e.target.files ?? []));
        e.target.value = '';
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        addFiles(Array.from(e.dataTransfer.files));
    };

    const addSimulatedCameraPhoto = () => {
        setFiles((prev) => [...prev, { name: 'fotografie_camera_001.jpg', type: 'image', size: '2.4 MB' }]);
        setStep(2);
    };

    const removeFile = (indexToRemove: number) => {
        setFiles((prev) => {
            const nextFiles = prev.filter((_, idx) => idx !== indexToRemove);
            if (nextFiles.length === 0) setStep(1);
            return nextFiles;
        });
    };

    const processData = () => {
        if (files.length === 0) return;
        setStep('processing');
        setTimeout(() => setStep(3), 3000);
    };

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        setChatMessages((prev) => [...prev, { role: 'user', text: chatInput }]);
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

    const toggleModule = (moduleId: ModuleId) => {
        setInstalledModules((prev) => prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]);
    };

    const previewModule = (moduleId: ModuleId) => {
        setActiveModulePreview(moduleId);
        setIsModulesOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 relative overflow-hidden flex flex-col">
            <AppHeader step={step} isDataProcessed={isDataProcessed} onOpenModules={() => setIsModulesOpen(true)} />

            <main className="flex-1 max-w-6xl mx-auto p-6 md:p-12 w-full">
                {step === 1 && (
                    <UploadStep
                        isDragging={isDragging}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onFileInput={handleFileInput}
                        onCameraPhoto={addSimulatedCameraPhoto}
                    />
                )}

                {step === 2 && <ReviewStep files={files} onFileInput={handleFileInput} onRemoveFile={removeFile} onProcessData={processData} />}
                {step === 'processing' && <ProcessingStep />}
                {step === 3 && (
                    <Dashboard
                        fileCount={files.length}
                        installedModules={installedModules}
                        onResetUpload={() => setStep(1)}
                        onOpenModule={setActiveModulePreview}
                    />
                )}
            </main>

            <AppFooter />

            <button
                type="button"
                onClick={() => {
                    if (isDataProcessed) setIsModulesOpen(true);
                }}
                disabled={!isDataProcessed}
                aria-label={isDataProcessed ? 'Deschide marketplace-ul de module' : 'Marketplace blocat până la finalizarea analizei'}
                className={`md:hidden fixed bottom-7 left-4 right-24 z-30 flex items-center gap-3 rounded-2xl border px-4 py-3 text-left shadow-2xl backdrop-blur transition-all ${
                    isDataProcessed
                        ? 'border-white/60 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:-translate-y-0.5 hover:shadow-indigo-500/30 active:translate-y-0'
                        : 'border-slate-200 bg-white/90 text-slate-400 cursor-not-allowed'
                }`}
            >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isDataProcessed ? 'bg-white/20' : 'bg-slate-100'}`}>
                    {isDataProcessed ? <Grid className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                </span>
                <span className="min-w-0">
                    <span className="block text-sm font-extrabold leading-tight">Marketplace</span>
                    <span className={`block truncate text-[11px] font-semibold leading-tight ${isDataProcessed ? 'text-indigo-100' : 'text-slate-400'}`}>
                        {isDataProcessed ? 'Adaugă module' : 'Disponibil după analiză'}
                    </span>
                </span>
            </button>

            <ChatWidget
                isOpen={isChatOpen}
                messages={chatMessages}
                input={chatInput}
                chatEndRef={chatEndRef}
                onToggle={() => setIsChatOpen((isOpen) => !isOpen)}
                onClose={() => setIsChatOpen(false)}
                onInputChange={setChatInput}
                onSubmit={handleSendMessage}
            />

            <ModulesSidebar
                isOpen={isModulesOpen}
                installedModules={installedModules}
                onClose={() => setIsModulesOpen(false)}
                onToggleModule={toggleModule}
                onPreviewModule={previewModule}
            />

            <ModulePreviewModal activeModulePreview={activeModulePreview} onClose={() => setActiveModulePreview(null)} />
            <AppAnimations />
        </div>
    );
}
