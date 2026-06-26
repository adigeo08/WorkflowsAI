import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/WorkflowsAI/',
  plugins: [react()],
  resolve: { alias: { '@measured/puck': '/src/vendor/measuredPuckShim.tsx' } },
});
