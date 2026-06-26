import { Clock, FileText, TrendingUp, Users } from 'lucide-react';
import { formatRon, getActiveOrders, getEstimatedRevenue, getExpenseCategories, getLowStockProducts, getTotalSales } from './sharedBusinessData';

export const getDashboardKpis = (fileCount: number) => [
    { label: 'Vânzări totale', value: formatRon(getTotalSales()), icon: <TrendingUp className="text-emerald-500 w-6 h-6" />, change: `${getLowStockProducts().length} stocuri reduse` },
    { label: 'Documente procesate', value: fileCount * 15, icon: <FileText className="text-blue-500 w-6 h-6" />, change: 'Azi' },
    { label: 'Comenzi active', value: `${getActiveOrders().length}`, icon: <Users className="text-purple-500 w-6 h-6" />, change: `venit ${formatRon(getEstimatedRevenue())}` },
    { label: 'Timp Economisit', value: '12 Ore', icon: <Clock className="text-amber-500 w-6 h-6" />, change: 'Estimare AI' }
];

export const expenseCategories = getExpenseCategories();
