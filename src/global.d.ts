declare module '*.css';

interface ImportMetaEnv {
  readonly VITE_CHAT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
