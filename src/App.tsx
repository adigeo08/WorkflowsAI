import React, { useEffect, useRef, useState } from 'react';
import { AppAnimations } from './components/AppAnimations';
import { AppFooter } from './components/AppFooter';
import { AppHeader } from './components/AppHeader';
import { AuthStep } from './components/AuthStep';
import { ChatWidget } from './components/ChatWidget';
import { Dashboard } from './components/Dashboard';
import { ModulePreviewModal } from './components/ModulePreviewModal';
import { ModulesSidebar } from './components/ModulesSidebar';
import { ProcessingStep } from './components/ProcessingStep';
import { ReviewStep } from './components/ReviewStep';
import { UploadStep } from './components/UploadStep';
import { CHAT_ENDPOINT, CHAT_NOT_CONFIGURED_MESSAGE, sendChatMessage } from './chatConfig';
import type { ChatMessage, ModuleId, Step, UploadedFile } from './types';

export default function App() {
    const [step, setStep] = useState<Step>(1);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isModulesOpen, setIsModulesOpen] = useState(false);
    const [installedModules, setInstalledModules] = useState<ModuleId[]>([]);
    const [activeModulePreview, setActiveModulePreview] = useState<ModuleId | null>(null);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>(CHAT_ENDPOINT ? [] : [{ role: 'ai', text: CHAT_NOT_CONFIGURED_MESSAGE }]);
    const [isChatSending, setIsChatSending] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    const isDataProcessed = step === 3;

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages, isChatOpen]);

    const requireAuthForUpload = () => {
        setFiles([]);
        setStep('auth');
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

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (step !== 2 && step !== 3) { requireAuthForUpload(); e.target.value = ''; return; }
        addFiles(Array.from(e.target.files ?? []));
        e.target.value = '';
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        requireAuthForUpload();
    };

    const openAuthStep = () => {
        setStep('auth');
    };

    const startDemoFlow = () => {
        requireAuthForUpload();
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

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = chatInput.trim();
        if (!text || isChatSending) return;
        if (!CHAT_ENDPOINT) {
            setChatMessages([{ role: 'ai', text: CHAT_NOT_CONFIGURED_MESSAGE }]);
            return;
        }

        setChatMessages((prev) => [...prev, { role: 'user', text }]);
        setChatInput('');
        setIsChatSending(true);
        try {
            const reply = await sendChatMessage(text);
            setChatMessages((prev) => [...prev, { role: 'ai', text: reply }]);
        } catch (error) {
            setChatMessages((prev) => [...prev, { role: 'ai', text: error instanceof Error ? error.message : 'Eroare la salvare' }]);
        } finally {
            setIsChatSending(false);
        }
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
                        onChooseFiles={openAuthStep}
                        onDemo={startDemoFlow}
                    />
                )}

                {step === 'auth' && <AuthStep onBack={() => setStep(1)} />}

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


            <ChatWidget
                isOpen={isChatOpen}
                messages={chatMessages}
                input={chatInput}
                chatEndRef={chatEndRef}
                isDataProcessed={isDataProcessed}
                onToggle={() => {
                    if (isDataProcessed) setIsChatOpen((isOpen) => !isOpen);
                }}
                onClose={() => setIsChatOpen(false)}
                onInputChange={setChatInput}
                onSubmit={handleSendMessage}
                isSending={isChatSending}
                isConfigured={Boolean(CHAT_ENDPOINT)}
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
