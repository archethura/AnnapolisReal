
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Anchor, 
  Mail, 
  FileText,
  Menu,
  X,
  Plus,
  Minus,
  Command,
  Trophy,
  BarChart3,
  TrendingUp,
  Target
} from 'lucide-react';

console.log("System: React sequence initiated.");

const useOnScreen = (ref: React.RefObject<HTMLElement>, rootMargin = '0px') => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { rootMargin, threshold: 0.05 }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [ref, rootMargin]);
  return isVisible;
};

const AnimatedOnScroll: React.FC<{ children?: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);
  return (
    <div ref={ref} className={`${className} transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const links = [
    { name: 'Track Record', href: '#track-record' },
    { name: 'Vision', href: '#vision' },
    { name: 'Calendar', href: '#calendar' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-[#001233]/98 py-3 border-b border-[#D4AF37]/20 backdrop-blur-md' : 'bg-transparent py-8 md:py-10'}`}>
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-5 group">
          <Anchor className="w-8 h-8 md:w-10 md:h-10 text-[#D4AF37] transition-transform group-hover:rotate-12" />
          <div className="flex flex-col text-left">
            <span className="text-xl md:text-2xl font-black tracking-[0.25em] text-white leading-none uppercase italic">JOSEPH MADDOX</span>
          </div>
        </a>
        
        <div className="hidden lg:flex items-center space-x-12">
          {links.map(link => (
            <a key={link.name} href={link.href} className="text-[10px] font-black text-white/50 hover:text-[#D4AF37] transition-all uppercase tracking-[0.4em] relative group">
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href="/resume.pdf" 
            target="_blank" 
            className="bg-[#D4AF37] text-[#001233] px-10 py-3.5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl"
          >
            Resume
          </a>
        </div>
        
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-[#001233] absolute top-full left-0 w-full border-b border-[#D4AF37]/20 p-8 flex flex-col space-y-6">
          {links.map(link => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-xl font-black text-white uppercase tracking-widest">{link.name}</a>
          ))}
          <a href="/resume.pdf" target="_blank" className="text-xl font-black text-[#D4AF37] uppercase tracking-widest">Resume</a>
        </div>
      )}
    </nav>
  );
};

const App = () => (
  <div className="min-h-screen bg-[#001233] selection:bg-[#D4AF37] selection:text-[#001233]">
    <Navbar />
    <main>
      <section className="relative min-h-screen flex flex-col justify-center bg-[#001233] pt-32 pb-20">
        <div className="max-w-[1600px] mx-auto px-8 md:px-12 relative z-10 text-left">
          <AnimatedOnScroll className="mb-8 flex items-center space-x-6">
            <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.8em]">A Strategic Vision for Graduate Annapolis</span>
            <div className="h-px w-24 bg-[#D4AF37]/40"></div>
          </AnimatedOnScroll>
          <AnimatedOnScroll delay={200}>
            <h1 className="text-7xl md:text-[12rem] xl:text-[15rem] text-white font-black uppercase leading-[0.8] tracking-tighter italic mb-10">
              COMMAND THE <br />TRADITION
            </h1>
          </AnimatedOnScroll>
          <AnimatedOnScroll delay={400} className="border-l-4 border-[#D4AF37] pl-10 max-w-4xl">
            <p className="text-2xl md:text-5xl text-white/90 serif italic leading-[1.2]">"Where the Blue and Gold color scheme isn't décor—it's a promise."</p>
          </AnimatedOnScroll>
        </div>
      </section>

      <div id="track-record" className="py-40 bg-[#001233] text-white border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-8 md:px-12">
          <h2 className="text-7xl md:text-[11rem] font-black uppercase tracking-tighter leading-none italic mb-20">THE RECORD.</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-12 border border-white/10 hover:border-[#D4AF37] transition-all"><span className="text-7xl font-black italic text-[#D4AF37]">18%</span><h3 className="text-2xl font-black mt-6 uppercase">TRevPAR Growth</h3></div>
            <div className="p-12 border border-white/10 hover:border-[#D4AF37] transition-all"><span className="text-7xl font-black italic text-[#D4AF37]">$1M+</span><h3 className="text-2xl font-black mt-6 uppercase">Activation Revenue</h3></div>
            <div className="p-12 border border-white/10 hover:border-[#D4AF37] transition-all"><span className="text-7xl font-black italic text-[#D4AF37]">24%</span><h3 className="text-2xl font-black mt-6 uppercase">Team Retention</h3></div>
          </div>
        </div>
      </div>

      <section id="vision" className="py-40 bg-white relative overflow-hidden border-b border-black/5">
        <div className="max-w-[1600px] mx-auto px-8 md:px-12 relative z-10 text-[#001233]">
           <h2 className="text-7xl md:text-[11rem] font-black uppercase tracking-tighter leading-none italic mb-20">THE VISION.</h2>
           <p className="text-4xl serif italic max-w-4xl">Creating "Glory Days" experiences for the Naval Academy family.</p>
        </div>
      </section>

      <section id="calendar" className="py-40 bg-[#f9f9f9]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-12">
          <h2 className="text-7xl md:text-[11rem] font-black uppercase tracking-tighter leading-none italic mb-20 text-[#001233]">THE CALENDAR.</h2>
          <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl">
            <span className="text-gray-400 font-bold uppercase tracking-widest">Calendar Grid Coming Soon</span>
          </div>
        </div>
      </section>

      <section className="py-60 bg-[#001233] text-white text-center">
        <h2 className="text-7xl md:text-[15rem] font-black uppercase tracking-tighter mb-24 italic leading-[0.75]">ACTIVATE <br />ANNAPOLIS.</h2>
        <div className="flex flex-col md:flex-row justify-center gap-12 px-8">
          <a href="mailto:josephmaddox@outlook.com" className="bg-[#D4AF37] text-[#001233] px-20 py-10 text-sm font-black uppercase tracking-[0.5em] hover:bg-white transition-all shadow-2xl flex items-center justify-center space-x-5">
             <Mail size={24} /> <span>Email Briefing</span>
          </a>
        </div>
      </section>
    </main>
    <footer className="py-24 bg-black text-white/20 border-t border-white/5 text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.6em]">Joseph Maddox Strategic Ops Briefing © 2025 // Graduate Annapolis</p>
    </footer>
  </div>
);

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
  console.log("System: App rendered successfully.");
} else {
  console.error("System Failure: Root container not found.");
}
