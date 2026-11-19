export interface TechCardProps {
    name: string;
    icon: string;
    level: number;
    color: string;
}

export function TechCard({name, icon, level, color}: TechCardProps) {
    return (
        <div className="tech-card">
            <div className="tech-card-header">

                <img src={icon} alt="`Ícone ${name}`" className="tech-icon" />
                <span className="tech-name"> {name} </span>
            </div>

            <div className="tech-bar-track">
                <div className="tech-bar-fill" style={{
                width: `${level}%`,
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}66`,
            }} /> 

            </div>

        </div>
    )
}