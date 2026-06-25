import { useEffect, useRef, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Puck, Render, type Config, type Data } from '@measured/puck';
import '@measured/puck/puck.css';
import { loadPuckData, savePuckData } from './puckStorage';

type Props = { title: string; eyebrow: string; storageKey: string; config: Config; fallbackData: Data };
type Mode = 'edit' | 'preview';

export function PuckEditorShell({ title, eyebrow, storageKey, config, fallbackData }: Props) {
  const [data, setData] = useState<Data>(fallbackData);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<Mode>('edit');
  const [saveStatus, setSaveStatus] = useState('Se încarcă datele Puck...');
  const previewWindowRef = useRef<Window | null>(null);
  const previewRootRef = useRef<Root | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    loadPuckData(storageKey, fallbackData).then((savedData) => {
      if (!isMounted) return;
      setData(savedData);
      setSaveStatus('Date încărcate din IndexedDB');
      setIsLoading(false);
    });
    return () => { isMounted = false; };
  }, [fallbackData, storageKey]);

  const renderSeparatePreview = (nextData: Data) => {
    const previewWindow = previewWindowRef.current;
    if (!previewWindow || previewWindow.closed || !previewRootRef.current) return;

    previewWindow.document.title = `${title} preview`;
    previewRootRef.current.render(
      <main style={{ margin: 0, minHeight: '100vh', background: '#f1f5f9', padding: '16px', fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
        <div style={{ margin: '0 auto', maxWidth: '1180px', overflow: 'hidden', borderRadius: '32px', background: '#ffffff', boxShadow: '0 20px 60px rgba(15, 23, 42, 0.14)' }}>
          <Render config={config} data={nextData} />
        </div>
      </main>
    );
  };

  useEffect(() => {
    renderSeparatePreview(data);
  }, [config, data]);

  const publishData = async (nextData: Data) => {
    setData(nextData);
    await savePuckData(storageKey, nextData);
    renderSeparatePreview(nextData);
    setSaveStatus('Salvat în IndexedDB și preview actualizat');
  };

  const openSeparatePreview = () => {
    const previewWindow = previewWindowRef.current && !previewWindowRef.current.closed ? previewWindowRef.current : window.open('', '_blank');
    if (!previewWindow) return;

    previewWindowRef.current = previewWindow;
    previewWindow.document.title = `${title} preview`;
    previewWindow.document.body.replaceChildren();
    previewWindow.document.body.style.margin = '0';

    const mountNode = previewWindow.document.createElement('div');
    mountNode.id = 'puck-render-preview-root';
    previewWindow.document.body.appendChild(mountNode);
    previewRootRef.current?.unmount();
    previewRootRef.current = createRoot(mountNode);
    renderSeparatePreview(data);
    previewWindow.focus();
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <div className="flex flex-col gap-3 border-b border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">{eyebrow}</p>
          <h3 className="text-xl font-black text-slate-900">{title}</h3>
          <p className="mt-1 text-xs font-semibold text-slate-400">{saveStatus}</p>
          <p className="mt-1 text-xs text-slate-400">Folosește Publish din Puck pentru salvare; preview-ul separat folosește ultima data publicată.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex rounded-2xl border border-slate-200 bg-slate-100 p-1">
            <button type="button" onClick={() => setMode('edit')} className={`rounded-xl px-4 py-2 text-sm font-bold ${mode === 'edit' ? 'bg-slate-950 text-white' : 'text-slate-600'}`}>Editare</button>
            <button type="button" onClick={() => setMode('preview')} className={`rounded-xl px-4 py-2 text-sm font-bold ${mode === 'preview' ? 'bg-slate-950 text-white' : 'text-slate-600'}`}>Preview intern</button>
          </div>
          <button type="button" onClick={openSeparatePreview} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700">Deschide preview separat salvat</button>
        </div>
      </div>

      <div className="min-h-[680px] bg-white">
        {isLoading ? <div className="p-10 text-sm font-bold text-slate-500">Se încarcă editorul Puck...</div> : mode === 'edit' ? (
          <Puck config={config} data={data} onPublish={publishData} />
        ) : (
          <div className="bg-slate-100 p-4">
            <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-sm">
              <Render config={config} data={data} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
