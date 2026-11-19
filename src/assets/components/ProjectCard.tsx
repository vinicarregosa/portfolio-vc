import { FaArrowUpRightFromSquare, FaGithub, FaLock } from "react-icons/fa6";

export interface ProjectProps {
    title: string;
    description: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
}

export function ProjectCard({title, description, tags, githubUrl, liveUrl}: ProjectProps) {

     return ( 
     <article className="project-card">

        <div className="project-header">
            <h3>{title}</h3>
        </div>

        <p className="project-descripition"> {description} </p>

        <div className="project-tags">

            {tags.map((tag) => (
                <span key={tag} className="project-tag" > {tag} </span>
            ))}
        </div>

        <div className="project-links">
            {githubUrl? (
                <a href={githubUrl} target="_blank" rel="noreferrer" className="project-link"><FaGithub size={12}/>
                <span>Code</span>
                </a>
            ) : ( 
            <span className="project-private"> <FaLock size={14}/> 
                <span>Privado</span>
            </span> 
        )}

        {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noreferrer" className="project-link project-link-primary">
                <FaArrowUpRightFromSquare size={14}/>
                    <span> 
                        Demo
                    </span>
 
            </a>
        )}

        </div>

    </article>
     )
}