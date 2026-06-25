declare module '*.css';
declare module '@measured/puck' {
    export type Config = { components: Record<string, unknown> };
    export type Data = { content: unknown[]; root: { props: Record<string, unknown> } };
}
