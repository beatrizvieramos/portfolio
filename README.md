# Portfólio — Beatriz Vieira Ramos

Vite + React + TypeScript + React Router. Saída 100% estática (pasta `dist`).

## Comandos

```bash
npm install
npm run dev      # http://localhost:4180
npm run build    # typecheck + gera dist/
npm run preview  # testa o build
```

## Onde editar

- Projetos, textos dos cases e links: `src/data/projects.ts`
- Páginas: `src/pages/` (Home, About, Projects = lista completa, ProjectPage)
- Componentes: `src/components/` (Layout com nav/rodapé, ProjectCard com animação de carregamento ao rolar)
- Estilos: `src/styles.css` · Imagens e currículo: `public/assets/`
- `_legacy/`: versão anterior em HTML estático (referência).

## Publicar (hospedagem gratuita)

Build command: `npm run build` · Output: `dist` (use Node 20+).

- **Cloudflare Pages** ou **Netlify**: conecte o repositório (ou envie a pasta `dist`). `public/_redirects` já faz o fallback das rotas.
- **Vercel**: `vercel.json` já tem o rewrite.
- Domínio próprio: registre em registro.br e aponte o DNS para o provedor.
