import type React from 'react';

export type Step = 1 | 2 | 3 | 'processing';

export type UploadedFile = {
    name: string;
    type: 'image' | 'pdf' | 'excel';
    size: string;
};

export type ChatMessage = {
    role: 'ai' | 'user';
    text: string;
};

export type ModuleId = 'crm' | 'ecommerce' | 'erp' | 'landing';

export type MarketplaceModule = {
    id: ModuleId;
    name: string;
    icon: React.ReactNode;
    desc: string;
};
