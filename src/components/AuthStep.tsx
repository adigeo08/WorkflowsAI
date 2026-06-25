import { ArrowLeft, Clock3, LockKeyhole, Mail } from 'lucide-react';

type Props = {
    onBack: () => void;
};

export function AuthStep({ onBack }: Props) {
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
                    <p className="mt-2 text-sm text-slate-500">Lucrăm la autentificare. Formularul este momentan indisponibil.</p>
                </div>

                <div className="space-y-4 opacity-60">
                    <label className="block">
                        <span className="text-sm font-bold text-slate-600">Email</span>
                        <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3">
                            <Mail className="h-5 w-5 text-slate-400" />
                            <input disabled type="email" placeholder="office@gadgethub.ro" className="w-full cursor-not-allowed bg-transparent text-sm font-semibold text-slate-500 outline-none" />
                        </div>
                    </label>
                    <label className="block">
                        <span className="text-sm font-bold text-slate-600">Parolă</span>
                        <input disabled type="password" placeholder="••••••••" className="mt-2 w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-500 outline-none" />
                    </label>
                </div>

                <div className="mt-4 text-right">
                    <button disabled type="button" className="cursor-not-allowed text-sm font-bold text-slate-400">Am uitat parola</button>
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-500">
                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    <p><span className="font-bold text-slate-700">Autentificarea este în pregătire.</span> Revenim curând cu acces securizat.</p>
                </div>

                <button disabled type="button" className="mt-6 flex w-full cursor-not-allowed items-center justify-center rounded-2xl bg-slate-200 px-6 py-4 text-base font-black text-slate-400">
                    Autentifică-te
                </button>
            </div>
        </div>
    );
}
