import './index.css';
import { Hero } from "./components/Hero"
import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';

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
