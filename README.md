# AI Workflows

Aplicație React + Vite configurată pentru publicare pe GitHub Pages.

## Dezvoltare locală

```bash
npm install
npm run dev
```

## Build de producție

```bash
npm run build
```

## Publicare pe GitHub Pages

Workflow-ul `.github/workflows/deploy.yml` construiește aplicația și publică folderul `dist` pe GitHub Pages la fiecare push pe branch-ul `main`. În setările repository-ului GitHub, setează **Pages > Source** la **GitHub Actions**.
