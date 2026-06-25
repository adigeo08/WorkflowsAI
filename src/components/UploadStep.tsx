import type React from 'react';
import { Camera, FileText, UploadCloud } from 'lucide-react';

type Props = {
    isDragging: boolean;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: () => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCameraPhoto: () => void;
};

export function UploadStep({ isDragging, onDragOver, onDragLeave, onDrop, onFileInput, onCameraPhoto }: Props) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
                    Transformă datele nestructurate în{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        Inteligență Vizuală
                    </span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Încarcă poze, facturi, tabele Excel sau PDF-uri. Sistemul nostru bazat pe Gemini AI va extrage, structura și crea grafice automat în câteva secunde.
                </p>
            </div>

            <div
                className={`border-3 border-dashed rounded-3xl p-16 text-center transition-all duration-200 bg-white ${
                    isDragging ? 'border-indigo-500 bg-indigo-50 shadow-inner' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50 shadow-sm'
                }`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="w-24 h-24 mx-auto bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-8 shadow-sm">
                    <UploadCloud className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-800">Trage și lasă fișierele aici</h3>
                <p className="text-slate-500 mb-10 text-lg">Suportăm imagini JPG/PNG, fișiere Excel, CSV și PDF-uri.</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <label className="cursor-pointer bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-3">
                        <FileText className="w-6 h-6" />
                        Alege Fișiere
                        <input type="file" multiple className="hidden" onChange={onFileInput} />
                    </label>
                    <button type="button" onClick={onCameraPhoto} className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm flex items-center gap-3">
                        <Camera className="w-6 h-6" />
                        Fă o poză pe loc
                    </button>
                </div>
            </div>
        </div>
    );
}
