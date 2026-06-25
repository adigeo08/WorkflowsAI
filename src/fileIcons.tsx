import { FileSpreadsheet, FileText, Image as ImageIcon } from 'lucide-react';
import type { UploadedFile } from './types';

export function getFileIcon(type: UploadedFile['type']) {
    switch (type) {
        case 'image':
            return <ImageIcon className="w-6 h-6 text-blue-500" />;
        case 'pdf':
            return <FileText className="w-6 h-6 text-red-500" />;
        case 'excel':
            return <FileSpreadsheet className="w-6 h-6 text-green-500" />;
        default:
            return <FileText className="w-6 h-6 text-gray-500" />;
    }
}
