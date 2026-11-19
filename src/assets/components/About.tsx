import './About.css';
import { TechCard, type TechCardProps } from "./TechCard";

const technologies: TechCardProps[] = [
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', level: 50, color: '#3178C6' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', level: 40, color: '#00D8FF' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', level: 67, color: '#ED8B00' },
  { name: 'Spring', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg', level: 40, color: '#6DB33F' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', level: 40, color: '#3776AB' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', level: 55, color: '#336791' },
  { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg', level: 42, color: '#DD0031' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', level: 55, color: '#2496ED' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', level: 70, color: '#F05032' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg', level: 60, color: '#FCC624' },
  { name: 'AI Agents', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/claudecode/claudecode-original.svg', level: 70 , color: '#D97757' },
  { name: 'Javascript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', level: 50, color: '#F7DF1E' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', level: 75, color: '#E34F26' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', level: 55, color: '#1572B6' },
];
export function About(){    

    return (
        <section id="skills" className="about-section">
            <div className="about-container">
                <h2>
                    Sobre mim
                </h2>
                <p className="about-description">
                    Desenvolvedor de software em formação, com foco em desenvolvimento Full Stack e arquitetura de software. Interessado na construção de aplicações escaláveis,
                    seguras  e bem estruturadas, utilizando Java, Spring Boot, TypeScript, Angular, React e Python, além de bancos de dados relacionais. 
                    Busco desenvolver soluções eficientes, aplicando boas práticas de programação, princípios de engenharia de software e decisões arquiteturais consistentes.
                </p>

                <h3 className="skills"> Principais Stacks</h3>
                <div className="tech-grid">
                    {technologies.map((tech) => (
                        <TechCard key={tech.name} name={tech.name} icon= {tech.icon} 
                        level= {tech.level} color= {tech.color} 
                        />))}

                </div>

            </div>
        </section>
    )
}