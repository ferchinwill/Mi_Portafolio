import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { TechBackground } from './components/TechBackground';
import { CustomCursor } from './components/CustomCursor';

function App() {
  useEffect(() => {
    // Intersection Observer para animaciones de revelación al hacer scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <TechBackground />
      <Header />
      <main className="flex-grow">
        <div className="reveal">
          <Hero />
        </div>
        <div className="reveal">
          <About />
        </div>
        <div className="reveal">
          <Portfolio />
        </div>
        <div className="reveal">
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;

