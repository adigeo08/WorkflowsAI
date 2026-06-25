import { Bot } from 'lucide-react';

export function ProcessingStep() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="relative w-32 h-32 mb-8">
                <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20" />
                <div className="absolute inset-2 bg-purple-500 rounded-full animate-pulse opacity-40" />
                <div className="absolute inset-4 bg-white rounded-full shadow-2xl flex items-center justify-center z-10">
                    <Bot className="w-12 h-12 text-indigo-600" />
                </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Gemini analizează documentele...</h2>
            <p className="text-slate-500">Extragem tabelele, citim chitanțele și interpretăm structura vizuală.</p>
            <div className="w-64 h-2 bg-slate-100 rounded-full mt-8 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-full rounded-full origin-left animate-[progress_3s_ease-in-out]" />
            </div>
        </div>
    );
}
