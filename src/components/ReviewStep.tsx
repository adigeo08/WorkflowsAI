import type React from 'react';
import { FilePlus2, Sparkles, Trash2 } from 'lucide-react';
import type { UploadedFile } from '../types';
import { getFileIcon } from '../fileIcons';

type Props = {
    files: UploadedFile[];
    onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveFile: (index: number) => void;
    onProcessData: () => void;
};

export function ReviewStep({ files, onRemoveFile, onProcessData }: Props) {
    return (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-3xl mx-auto">
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-900">Fișiere pregătite</h2>
                        <p className="text-slate-500 mt-1">Verifică documentele înainte de a le trimite către AI.</p>
                    </div>
                    <div className="bg-indigo-100 text-indigo-700 font-bold px-4 py-2 rounded-xl">
                        {files.length} {files.length === 1 ? 'fișier' : 'fișiere'}
                    </div>
                </div>

                <div className="space-y-4 mb-10 max-h-[400px] overflow-y-auto pr-2">
                    {files.map((file, idx) => (
                        <div key={`${file.name}-${idx}`} className="flex items-center p-4 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 rounded-2xl gap-4 group">
                            <div className="p-3 bg-white rounded-xl shadow-sm">{getFileIcon(file.type)}</div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-base font-bold text-slate-800 truncate">{file.name}</p>
                                <p className="text-sm text-slate-500">{file.size} • Uploadat cu succes</p>
                            </div>
                            <button type="button" onClick={() => onRemoveFile(idx)} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors" title="Șterge fișier">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
                    <button disabled type="button" className="group flex flex-1 cursor-not-allowed items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white/70 px-5 py-4 text-left shadow-sm shadow-slate-100">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                            <FilePlus2 className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                            <span className="block text-sm font-black leading-tight text-slate-500">Adăugare fișiere</span>
                            <span className="block text-xs font-semibold text-slate-400">disponibilă după autentificare</span>
                        </span>
                    </button>
                    <button type="button" onClick={onProcessData} className="flex-[2] py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/30 hover:scale-[1.02] transition-all">
                        <Sparkles className="w-6 h-6" />
                        Analizează cu AI
                    </button>
                </div>
            </div>
        </div>
    );
}
