import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa6';
import './Hero.css';

export function Hero(){

    return (
        <section id='home' className='hero-section'>
            <img
                src='public/perfil.jpeg' alt='Foto de Vinícius Carregosa' className='hero-avatar'
            />

        <div className='hero-content'>

            <h1>Oi, eu sou Vinícius Carregosa</h1>

            <p className='hero-subtitle'>
            Desenvolvedor Full-Stack & Arquiteto de Software!
            </p>

            <div className='hero-socials'>
        
            <a href='https://github.com/vinicarregosa' target='_blank' rel='noreferrer' 
            className='social-link' aria-label='Github'><FaGithub size={22} /></a>

            <a href='https://www.linkedin.com/in/viniciuscarregosa/' target='_blank' rel='noreferrer' 
            className='social-link' aria-label='Linkedin'><FaLinkedin size={22}/> </a>

            <a href='https://www.instagram.com/vinicius.carregosa/' target='_blank' rel='noreferrer'
             className='social-link' aria-label='Instagram'><FaInstagram size={22}/></a>
             
            </div>
    </div>

        </section>
    )
}