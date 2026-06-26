import type React from 'react';
import { Bot, Lock, Send, X } from 'lucide-react';
import type { ChatMessage } from '../types';

type Props = {
    isOpen: boolean;
    messages: ChatMessage[];
    input: string;
    chatEndRef: React.RefObject<HTMLDivElement | null>;
    isDataProcessed: boolean;
    onToggle: () => void;
    onClose: () => void;
    onInputChange: (value: string) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isSending: boolean;
    isConfigured: boolean;
};

export function ChatWidget({ isOpen, messages, input, chatEndRef, isDataProcessed, onToggle, onClose, onInputChange, onSubmit, isSending, isConfigured }: Props) {
    return (
        <>
            <button
                type="button"
                onClick={onToggle}
                disabled={!isDataProcessed}
                title={!isDataProcessed ? 'Chat disponibil după finalizarea analizei' : 'Deschide asistentul AI'}
                aria-label={isDataProcessed ? 'Deschide asistentul AI' : 'Asistent AI blocat până la finalizarea analizei'}
                className={`fixed bottom-5 right-5 z-[2147483647] rounded-full border-2 p-4 shadow-2xl transition-all md:bottom-8 md:right-8 ${
                    isDataProcessed
                        ? 'border-white bg-gradient-to-tr from-indigo-600 to-purple-600 text-white hover:scale-110'
                        : 'border-slate-200 bg-white text-slate-400 cursor-not-allowed'
                }`}
            >
                {isDataProcessed ? <Bot className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
            </button>

            {isOpen && isDataProcessed && (
                <div className="fixed inset-x-3 bottom-24 top-20 z-[2147483647] flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-300 sm:left-auto sm:right-8 sm:top-auto sm:h-[500px] sm:w-96">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl shrink-0">
                        <h3 className="font-bold flex items-center gap-2 text-slate-800"><Bot className="w-5 h-5 text-indigo-600" />Asistent AI</h3>
                        <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1"><X className="w-5 h-5" /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] break-words p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-md' : 'bg-slate-100 text-slate-800 rounded-bl-md'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    <form onSubmit={onSubmit} className="p-3 border-t border-slate-100 flex gap-2 shrink-0 sm:p-4">
                        <input type="text" value={input} onChange={(e) => onInputChange(e.target.value)} disabled={!isConfigured || isSending} placeholder={isConfigured ? 'Întreabă-mă orice...' : 'Chat neconfigurat'} className="min-w-0 flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all" />
                        <button type="submit" disabled={!isConfigured || isSending} className="shrink-0 bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors disabled:cursor-not-allowed disabled:bg-slate-300"><Send className="w-4 h-4" /></button>
                    </form>
                </div>
            )}
        </>
    );
}
