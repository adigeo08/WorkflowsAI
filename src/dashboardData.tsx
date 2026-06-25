import { Clock, FileText, TrendingUp, Users } from 'lucide-react';

export const getDashboardKpis = (fileCount: number) => [
    { label: 'Vânzări GadgetHub', value: '124,500 RON', icon: <TrendingUp className="text-emerald-500 w-6 h-6" />, change: '+14%' },
    { label: 'Documente GadgetHub', value: fileCount * 15, icon: <FileText className="text-blue-500 w-6 h-6" />, change: 'Azi' },
    { label: 'Comenzi Online', value: '342', icon: <Users className="text-purple-500 w-6 h-6" />, change: '+5%' },
    { label: 'Timp Economisit', value: '12 Ore', icon: <Clock className="text-amber-500 w-6 h-6" />, change: 'Estimare AI' }
];

export const expenseCategories = [
    { name: 'Achiziții gadgeturi', percent: 45, color: 'bg-indigo-500' },
    { name: 'Platformă magazin online', percent: 30, color: 'bg-purple-500' },
    { name: 'Campanii accesorii', percent: 15, color: 'bg-pink-500' },
    { name: 'Curierat & retururi', percent: 10, color: 'bg-amber-500' }
];
