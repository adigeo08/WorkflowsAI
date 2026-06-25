import type React from 'react';
import { Bot, Send, X } from 'lucide-react';
import type { ChatMessage } from '../types';

type Props = {
    isOpen: boolean;
    messages: ChatMessage[];
    input: string;
    chatEndRef: React.RefObject<HTMLDivElement | null>;
    onToggle: () => void;
    onClose: () => void;
    onInputChange: (value: string) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function ChatWidget({ isOpen, messages, input, chatEndRef, onToggle, onClose, onInputChange, onSubmit }: Props) {
    return (
        <>
            <button onClick={onToggle} className="fixed bottom-8 right-8 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-30 border-2 border-white">
                <Bot className="w-7 h-7" />
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-8 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-30 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
                        <h3 className="font-bold flex items-center gap-2 text-slate-800"><Bot className="w-5 h-5 text-indigo-600" />Asistent AI</h3>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1"><X className="w-5 h-5" /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-md' : 'bg-slate-100 text-slate-800 rounded-bl-md'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    <form onSubmit={onSubmit} className="p-4 border-t border-slate-100 flex gap-2">
                        <input type="text" value={input} onChange={(e) => onInputChange(e.target.value)} placeholder="Întreabă-mă orice..." className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all" />
                        <button type="submit" className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors"><Send className="w-4 h-4" /></button>
                    </form>
                </div>
            )}
        </>
    );
}
