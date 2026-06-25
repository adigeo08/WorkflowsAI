import { Clock, FileText, TrendingUp, Users } from 'lucide-react';

export const getDashboardKpis = (fileCount: number) => [
    { label: 'Venit Total', value: '124,500 RON', icon: <TrendingUp className="text-emerald-500 w-6 h-6" />, change: '+14%' },
    { label: 'Facturi Procesate', value: fileCount * 15, icon: <FileText className="text-blue-500 w-6 h-6" />, change: 'Azi' },
    { label: 'Clienți Unici', value: '342', icon: <Users className="text-purple-500 w-6 h-6" />, change: '+5%' },
    { label: 'Timp Economisit', value: '12 Ore', icon: <Clock className="text-amber-500 w-6 h-6" />, change: 'Estimare AI' }
];

export const expenseCategories = [
    { name: 'Echipamente & Hardware', percent: 45, color: 'bg-indigo-500' },
    { name: 'Software SaaS', percent: 30, color: 'bg-purple-500' },
    { name: 'Marketing & Ad-uri', percent: 15, color: 'bg-pink-500' },
    { name: 'Logistică', percent: 10, color: 'bg-amber-500' }
];
