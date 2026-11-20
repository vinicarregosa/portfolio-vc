# Portfólio — Vinícius Carregosa

Portfólio pessoal de desenvolvedor, construído com React e TypeScript. Reúne apresentação, stacks, projetos e contato em uma página única com navegação por âncoras, além de uma coleção de demos estáticos hospedados no próprio site.

## Stack

| Camada | Tecnologia |
|---|---|
| UI | React 19 |
| Linguagem | TypeScript 6 |
| Build | Vite 8 (com React Compiler habilitado via Babel) |
| Estilo | CSS puro, escopado por componente |
| Ícones | react-icons (Font Awesome 6) |
| Lint | ESLint 10 + typescript-eslint |

Não há framework de CSS, biblioteca de componentes ou roteador — a página é única e a navegação usa âncoras (`#home`, `#skills`, `#projetos`, `#contato`).

## Requisitos

- **Node.js** `^20.19.0` ou `>=22.12.0` — exigência do Vite 8
- **Bun** `1.4+` (recomendado) ou **npm**

O projeto versiona `bun.lock`, então o Bun é o gerenciador de pacotes de referência. Com npm, as versões resolvidas podem divergir do lockfile.

## Como rodar

```bash
git clone git@github.com:vinicarregosa/portfolio-vc.git
cd portfolio-vc
bun install
bun run dev
```

O servidor de desenvolvimento sobe em **http://localhost:5173** com hot reload. Se a porta estiver ocupada, o Vite escolhe automaticamente a próxima livre (5174, 5175…) e informa a URL no terminal.

### Usando npm

```bash
npm install
npm run dev
```

### Build de produção

```bash
bun run build     # tsc -b && vite build  ->  gera dist/
bun run preview   # serve o dist/ localmente
```

O `build` roda a checagem de tipos do TypeScript (`tsc -b`, em modo de project references) antes do empacotamento. Se houver erro de tipo, o build falha e o Vite nem chega a executar.

## Scripts

| Script | Comando | Descrição |
|---|---|---|
| `dev` | `vite` | Servidor de desenvolvimento com HMR |
| `build` | `tsc -b && vite build` | Type-check + build de produção em `dist/` |
| `preview` | `vite preview` | Serve o conteúdo de `dist/` |
| `lint` | `eslint .` | Análise estática de todo o projeto |

## Estrutura

```
.
├── public/                  # servido na raiz do site, sem processamento
│   ├── perfil.jpeg          # foto exibida no Hero
│   ├── curriculo.pdf        # download do CV no Navbar
│   └── projetos/            # demos estáticos (HTML/CSS/JS puro)
│       ├── calculadora/
│       ├── fashionTrends/
│       ├── jogo-da-lampada/
│       └── lista_de_tarefas/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx       # navegação por âncoras + download do CV
│   │   ├── Hero.tsx         # apresentação e links sociais
│   │   ├── About.tsx        # texto de perfil + grid de stacks
│   │   ├── TechCard.tsx     # card de tecnologia com barra de nível
│   │   ├── Projects.tsx     # lista de projetos
│   │   ├── ProjectCard.tsx  # card de projeto com links
│   │   └── Contact.tsx      # formulário com validação + rodapé
│   ├── App.tsx              # composição das seções
│   ├── index.css            # reset, variáveis de cor e tipografia
│   └── main.tsx             # ponto de entrada
├── index.html
├── vite.config.ts
└── tsconfig.json            # project references (app + node)
```

Cada componente tem seu próprio arquivo `.css` ao lado do `.tsx`.

### Sobre os caminhos em `public/`

Arquivos em `public/` são copiados para a **raiz** do build — o prefixo `public/` não faz parte da URL. Por isso o código referencia `/perfil.jpeg`, e não `public/perfil.jpeg`. O mesmo vale para os demos: `/projetos/<slug>/index.html`.

Para funcionar também em deploys sob subpath, os caminhos são montados com `import.meta.env.BASE_URL` em `Hero.tsx`, `Navbar.tsx` e `Projects.tsx`.

## Demos de projetos

Os diretórios em `public/projetos/` são aplicações independentes em HTML, CSS e JavaScript, sem build próprio. Elas são servidas como arquivos estáticos e abertas em nova aba a partir dos cards em `Projects.tsx`.

Para adicionar um novo demo, crie `public/projetos/<slug>/index.html` e registre a entrada no array `projects` em `src/components/Projects.tsx` — a URL é montada automaticamente.

## Deploy na Vercel

O projeto não precisa de `vercel.json`: a Vercel detecta o preset **Vite** automaticamente.

1. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório `portfolio-vc`.
2. Confirme as configurações detectadas:
   - **Framework preset:** Vite
   - **Install command:** `bun install` (detectado pela presença de `bun.lock`)
   - **Build command:** `bun run build`
   - **Output directory:** `dist`
3. Faça o deploy.

O site é publicado na raiz do domínio, então `BASE_URL` resolve para `/` e os caminhos de `public/` funcionam sem ajuste.

Se em algum momento o deploy for feito sob subpath (ex.: GitHub Pages em `/portfolio-vc/`), defina `base: '/portfolio-vc/'` em `vite.config.ts`.

## Formulário de contato

O formulário em `Contact.tsx` faz **apenas validação no cliente** — nome com no mínimo 2 caracteres, e-mail em formato válido e mensagem com no mínimo 10 caracteres. Não há backend nem serviço de e-mail integrado; o estado de sucesso é local. Para receber mensagens de fato, é necessário conectar um serviço como Formspree, Resend ou uma API própria.

## Autor

**Vinícius Carregosa**

- GitHub: [@vinicarregosa](https://github.com/vinicarregosa)
- LinkedIn: [viniciuscarregosa](https://www.linkedin.com/in/viniciuscarregosa/)
- Instagram: [@vinicius.carregosa](https://www.instagram.com/vinicius.carregosa/)
