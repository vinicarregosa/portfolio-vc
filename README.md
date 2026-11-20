# Portfólio — Vinícius Carregosa

Site pessoal de apresentação profissional. Reúne quem eu sou, as tecnologias que estudo, os projetos que desenvolvi e as formas de entrar em contato.

**Site publicado:** https://viniciuscarregosa.vercel.app/

## Tecnologias

| O que | Com |
|---|---|
| Interface | React 19 |
| Linguagem | TypeScript |
| Build e servidor | Vite |
| Estilo | CSS puro |
| Ícones | react-icons |

## Como rodar o projeto

**Pré-requisito:** Node.js 20.19+ ou 22.12+.

```bash
# 1. instalar as dependências
bun install

# 2. iniciar o servidor de desenvolvimento
bun run dev
```

Depois abra **http://localhost:5173** no navegador. A página recarrega sozinha a cada alteração no código.

Se preferir usar npm, os comandos são equivalentes:

```bash
npm install
npm run dev
```

## Comandos disponíveis

| Comando | O que faz |
|---|---|
| `bun run dev` | Abre o site para desenvolvimento |
| `bun run build` | Gera a versão final, otimizada, na pasta `dist/` |
| `bun run preview` | Visualiza localmente a versão final gerada |
| `bun run lint` | Verifica a qualidade e os padrões do código |

## O que tem no site

| Seção | Conteúdo |
|---|---|
| **Home** | Apresentação, foto e links para GitHub, LinkedIn e Instagram |
| **Skills** | Texto sobre minha formação e um card por tecnologia, com nível de conhecimento |
| **Projetos** | Cards com descrição, tecnologias usadas e link para ver o projeto |
| **Contato** | Formulário validado e redes sociais |

O botão **Download CV** no topo baixa o currículo em PDF.

## Organização das pastas

```
public/               arquivos usados direto pelo site
├── perfil.jpeg       foto da seção Home
├── curriculo.pdf     currículo para download
└── projetos/         projetos prontos em HTML, CSS e JavaScript

src/                  código do site
├── components/       uma pasta por parte da página
│   ├── Navbar        menu do topo
│   ├── Hero          seção Home
│   ├── About         seção Skills
│   ├── Projects      seção Projetos
│   └── Contact       seção Contato
├── App.tsx           junta todas as seções
├── index.css         estilos gerais
└── main.tsx          ponto de partida
```

Cada componente tem seu próprio arquivo `.tsx` (a estrutura) e `.css` (o visual), mantendo os dois próximos.

## Projetos em `public/projetos/`

São projetos independentes, feitos com HTML, CSS e JavaScript puros, sem precisar de instalação. Ficam dentro do site e abrem em uma nova aba quando clicados na seção Projetos.

## Deploy

O site está publicado na [Vercel](https://vercel.com), conectada ao repositório no GitHub. A cada envio de código para a branch `main`, a Vercel refaz o build e publica a nova versão automaticamente.

## Observação sobre o formulário

O formulário de contato confere se os campos foram preenchidos corretamente (nome, e-mail válido e mensagem com pelo menos 10 caracteres), mas ainda não envia e-mails — não há um serviço de envio conectado. Para contato, use os links das redes sociais no rodapé.

## Autor

**Vinícius Carregosa**

- GitHub: [@vinicarregosa](https://github.com/vinicarregosa)
- LinkedIn: [viniciuscarregosa](https://www.linkedin.com/in/viniciuscarregosa/)
- Instagram: [@vinicius.carregosa](https://www.instagram.com/vinicius.carregosa/)
