import './index.css';
import { Hero } from "./assets/components/Hero"
import { Navbar } from "./assets/components/Navbar";
import { About } from "./assets/components/About";
import { Projects } from './assets/components/Projects';
import { Contact } from './assets/components/Contact';

function App() {


  return (
    <>
      <Navbar />
      <main> 
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
     
    </>
  );
    
}
export default App
