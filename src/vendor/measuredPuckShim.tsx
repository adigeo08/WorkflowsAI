import type { ReactNode } from 'react';

export type Data = { root?: { props?: Record<string, unknown> }; content?: Array<{ type: string; props?: Record<string, unknown> }> };
export type Config<TComponents = Record<string, unknown>> = { components: { [K in keyof TComponents | string]: { fields?: Record<string, unknown>; defaultProps?: Record<string, unknown>; render: (props: any) => ReactNode } } };

export function Render({ config, data }: { config: Config; data: Data }) {
  return <>{(data.content ?? []).map((block, index) => {
    const component = config.components[block.type];
    return component?.render ? <div key={String(block.props?.id ?? index)}>{component.render(block.props ?? {})}</div> : null;
  })}</>;
}

export function Puck({ config, data, onPublish }: { config: Config; data: Data; onPublish?: (data: Data) => void | Promise<void> }) {
  return (
    <div className="min-h-[680px] bg-white">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
        <strong className="text-sm text-slate-700">Puck Editor</strong>
        <button type="button" onClick={() => onPublish?.(data)} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-black text-white">Publish</button>
      </div>
      <Render config={config} data={data} />
    </div>
  );
}
