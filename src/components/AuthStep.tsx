import { ArrowLeft, LockKeyhole, Mail } from 'lucide-react';
import type React from 'react';

type Props = {
    onBack: () => void;
    onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function AuthStep({ onBack, onFileInput }: Props) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 mx-auto max-w-md">
            <button type="button" onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-indigo-600">
                <ArrowLeft className="h-4 w-4" />
                Înapoi la upload
            </button>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                        <LockKeyhole className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900">Autentificare</h2>
                    <p className="mt-2 text-sm text-slate-500">Intră în cont pentru a încărca fișierele companiei în siguranță.</p>
                </div>

                <div className="space-y-4">
                    <label className="block">
                        <span className="text-sm font-bold text-slate-600">Email</span>
                        <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-indigo-300 focus-within:bg-white">
                            <Mail className="h-5 w-5 text-slate-400" />
                            <input type="email" placeholder="office@gadgethub.ro" className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none" />
                        </div>
                    </label>
                    <label className="block">
                        <span className="text-sm font-bold text-slate-600">Parolă</span>
                        <input type="password" placeholder="••••••••" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-indigo-300 focus:bg-white" />
                    </label>
                </div>

                <div className="mt-4 text-right">
                    <button type="button" className="text-sm font-bold text-indigo-600 hover:text-indigo-800">Am uitat parola</button>
                </div>

                <label className="mt-8 flex cursor-pointer items-center justify-center rounded-2xl bg-slate-900 px-6 py-4 text-base font-black text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-800">
                    Autentifică-te și alege fișiere
                    <input type="file" multiple className="hidden" onChange={onFileInput} />
                </label>
            </div>
        </div>
    );
}
