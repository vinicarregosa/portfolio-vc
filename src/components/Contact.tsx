import { useState, type SubmitEventHandler } from 'react';
import { FaGithub, FaLinkedin, FaInstagram,  FaPaperPlane, FaCircleCheck, FaCircleExclamation} from 'react-icons/fa6'
import './Contact.css';

export function Contact () {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    
    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
        
        e.preventDefault();
        setError('');
    
        if(name.trim().length < 2) {
            setError('Por favor, preencha seu nome (mínimo de 2 caracteres).');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email.trim())) {
            setError('Por favor, insira um endereço de e-mail válido.');
            return;
        }
        if (message.trim().length < 10) {
            setError('A mensagem deve ter pelo menos 10 caracteres.');
            return;
        }
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
    }
   return (
    
    <footer id="contato" className='contact-section'>

        <div className='contact-container'>

            <h2>Vamos conversar?</h2>
            <p className='contact-description'> 
                Tem alguma dúvida, proposta ou oportunidade? Envie uma mensagem pelo formulário abaixo.
            </p>
            <form className='contact-form' onSubmit={handleSubmit}>

                <div className='form-row'>

                    <div className='form-group'>

                        <label htmlFor='name'>Nome</label>
                        <input
                            id='name' type='text' placeholder='Seu nome' value={name}
                            onChange={e => { 
                                setName (e.target.value);
                                if(error) setError('');

                             }}

                        />
                    </div>

                    <div className='form-group'>

                        <label htmlFor='email'>Email</label>
                        <input 
                            id='email' type='email' placeholder='seuemail@exemplo.com' value={email} 
                            onChange={e => { 
                                setEmail(e.target.value);
                                if(error) setError('');
                            }}
                        />

                    </div>

                    <div className='form-group'>

                        <label htmlFor='message'>Mensagem</label>
                        <input
                        
                            id='message' type='text' placeholder='Escreva sua mensagem...' value={message}
                            onChange={e => { 
                                setMessage(e.target.value);
                                if(error) setError('');
                            }} 
                        
                        />

                    </div>

                    <button type='submit' className='contact-submit-btn'>
                        <FaPaperPlane size={15}/>
                        <span>Enviar mensagem</span>
                    </button>

                    {error && (
                        <div className='form-error' role='alert'>
                            <FaCircleExclamation size={18}/>
                            <span>{error}</span>
                        </div>
                    )}

                    {submitted && (
                        <div className='form-feedback'>
                            <FaCircleCheck size={18} />
                            <span>Mensagem enviada com sucesso.</span>

                        </div>
                    )}
                </div>
            </form>
                <div className='contact-socials'>
                
                    <a href='https://github.com/vinicarregosa' target='_blank' rel='noreferrer'>
                    <FaGithub size={20}/>
                    </a>
                    <a href='https://linkedin.com/in/viniciuscarregosa/' target='_blank' rel='noreferrer'>
                    <FaLinkedin size={20}/>
                    </a>
                    <a href='https://www.instagram.com/vinicius.carregosa/' target='_blank' rel='noreferrer'>
                    <FaInstagram size={20}/>
                    </a>

                </div>

                <div className='footer-bottom'>
                    <p>© {new Date().getFullYear()} Vinícius Carregosa. Desenvolvido com React & Typescript.</p>
                </div>
        
        </div>
   </footer>

   );
}