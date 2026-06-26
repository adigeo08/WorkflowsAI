import { getMonthlySales } from '../sharedBusinessData';

export function MonthlySalesChart() {
    const monthlySales = getMonthlySales();
    const maxValue = Math.max(...monthlySales.map((item) => item.value), 1);

    return (
        <div className="mt-6 h-72 rounded-2xl bg-gradient-to-b from-slate-50 to-white p-4">
            <div className="relative h-full border-l border-b border-slate-200 pl-4 pb-8">
                <div className="absolute inset-x-4 top-1/4 border-t border-dashed border-slate-200" />
                <div className="absolute inset-x-4 top-1/2 border-t border-dashed border-slate-200" />
                <div className="absolute inset-x-4 top-3/4 border-t border-dashed border-slate-200" />
                <div className="relative z-10 grid h-full grid-cols-7 items-end gap-3">
                    {monthlySales.map((item, i) => {
                        const height = Math.max(8, Math.round((item.value / maxValue) * 100));
                        return (
                            <div key={item.month} className="flex h-full flex-col items-center justify-end gap-2">
                                <span className="rounded-md bg-white px-1.5 py-0.5 text-[11px] font-bold text-slate-700 shadow-sm">
                                    {Math.round(item.value / 1000)}k
                                </span>
                                <div className="flex w-full flex-1 items-end">
                                    <div className="min-h-4 w-full rounded-t-xl bg-gradient-to-t from-indigo-600 via-indigo-500 to-purple-400 shadow-lg shadow-indigo-200 transition-all duration-1000 hover:from-indigo-700" style={{ height: `${height}%` }} title={`${item.month}: ${item.value} RON`} />
                                </div>
                                <span className="absolute -bottom-7 text-xs font-medium text-slate-500" style={{ left: `calc(${(i / 7) * 100}% + ${(100 / 14)}%)`, transform: 'translateX(-50%)' }}>{item.month}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
