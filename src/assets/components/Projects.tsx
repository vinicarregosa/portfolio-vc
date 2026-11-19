import { ProjectCard, type ProjectProps } from './ProjectCard';
import './Projects.css';

const projects: ProjectProps[] = [
  {
    title: 'Gestão de Catálogo E-Commerce',
    description:
      'Aplicação CRUD modular para cadastro, filtragem e controle de inventário de produtos com tipagem estática.',
    tags: ['TypeScript', 'HTML5', 'CSS3'],
    githubUrl: 'https://github.com/vinicarregosa/fashiontrends',
  },
  {
    title: 'Assistente Pessoal Inteligente',
    description:
      'API de automação e organização pessoal com validação estrita de esquemas, persistência relacional e integração com modelos de linguagem.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'AI Agents'],
  },
  {
    title: 'API Center — Gestão de Gateways',
    description:
      'Plataforma para gerenciamento e configuração de API Gateways, com foco em arquitetura modular, integração de serviços e controle de acesso.',
    tags: ['Angular', 'TypeScript', 'Keycloak', 'Microfrontends', 'Arquitetura'],
    githubUrl: 'https://github.com/vinicarregosa/dynamic-gateway-config',
  },
  {
    title: 'FinTrack — Gestão Financeira',
    description:
      'Aplicação para gerenciamento financeiro pessoal, com funcionalidades de controle de receitas, despesas e acompanhamento da movimentação financeira.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'REST API'],
    githubUrl: 'https://github.com/vinicarregosa/fintrack',
  },
  {
    title: 'Member Manager — Gestão de Membros',
    description:
      'Aplicação web para gerenciamento e cadastro de membros com interface componentizada e integração com API REST.',
    tags: ['Angular', 'TypeScript', 'Angular Material', 'REST API', 'Microfrontends'],
    githubUrl: 'https://github.com/Residencias-Faculdade/crud-member-manager',
  },
  {
    title: 'Jogo da Lâmpada',
    description:
      'Aplicação interativa em que o usuário controla o estado de uma lâmpada por meio de cliques, explorando eventos e manipulação do DOM.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Lista de Tarefas',
    description:
      'Aplicação web para criação, visualização e gerenciamento de tarefas, utilizando manipulação do DOM e eventos JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Calculadora',
    description:
      'Calculadora web com operações aritméticas básicas e interface interativa, desenvolvida com JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
];

export function Projects() {
  return (
    <section id="projetos" className="projects-section">
      <div className="projects-container">
        <h2>Projetos</h2>
        <p className="projects-subtitle">
          Sistemas e arquiteturas desenvolvidos com foco em regras de negócio, consistência de dados e código limpo.
        </p>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}