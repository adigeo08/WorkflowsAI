import { Sparkles } from 'lucide-react';

export function BrandLogo() {
    return (
        <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-2 rounded-lg text-white">
                <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                AI Workflows
            </span>
        </div>
    );
}
