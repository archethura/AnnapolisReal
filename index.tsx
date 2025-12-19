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
  Trophy,
  BarChart3,
  TrendingUp,
  Target
} from 'lucide-react';

/**
 * useOnScreen Hook
 * Fixed: Added | null to RefObject to satisfy TypeScript compiler (error TS2345)
 */
const useOnScreen = (ref: React.RefObject<HTMLElement | null>, rootMargin = '0px') => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { rootMargin, threshold: 0.1 }
    );
    const current = ref.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, [ref, rootMargin]);
  return isVisible;
};

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

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
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#001233]/95 backdrop-blur-md py-4 border-b border-[#D4AF37]/20' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-4 group">
          <Anchor className="w-8 h-8 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
          <span className="text-xl font-black tracking-[0.2em] uppercase italic">JOSEPH MADDOX</span>
        </a>

        <div className="hidden lg:flex items-center space-x-10">
          {links.map(l => (
            <a key={l.name} href={l.href} className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-[#D4AF37] transition-colors">{l.name}</a>
          ))}
          <a 
            href="/resume.pdf" 
            target="_blank" 
            className="bg-[#D4AF37] text-[#001233] px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg"
          >
            Resume
          </a>
        </div>

        <button className="lg:hidden text-[#D4AF37]" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle Menu">
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenu && (
        <div className="fixed inset-0 bg-[#001233] z-40 flex flex-col items-center justify-center space-y-8 lg:hidden animate-fadeIn">
          {links.map(l => (
            <a key={l.name} href={l.href} onClick={() => setMobileMenu(false)} className="text-3xl font-black uppercase italic tracking-tighter">{l.name}</a>
          ))}
          <a href="/resume.pdf" className="text-3xl font-black uppercase italic text-[#D4AF37]">Resume</a>
          <button onClick={() => setMobileMenu(false)} className="p-4 border border-white/10 rounded-full mt-12"><X /></button>
        </div>
      )}
    </nav>
  );
};

const MissionDossier = () => {
  const [active, setActive] = useState<number | null>(0);
  const missions = [
    {
      title: "THE COMMUNITY RELAUNCH",
      metric: "2,000+ Guests",
      role: "The Warrior Hotel, Autograph Collection",
      context: "Relaunching a luxury asset in a post-lockdown market required a civic homecoming.",
      action: "Orchestrated a six-week high-impact campaign that used Chamber partnerships to bridge the hotel and local business leaders.",
      result: "Generated $200K in auxiliary spend in 5 months and re-established the hotel as the city's primary social hub."
    },
    {
      title: "THE ACTIVATION ENGINE",
      metric: "18% TRevPAR Growth",
      role: "Portfolio Strategy",
      context: "Low-occupancy periods were viewed as lost time. I viewed them as untapped programming windows.",
      action: "Developed a standardized 'Activation Playbook'—from curated Ladies Nights to themed Masquerade events.",
      result: "Drove over $1M in incremental event-based revenue across the portfolio in year one."
    },
    {
      title: "CULTURE OF RETENTION",
      metric: "80% Retention",
      role: "Leadership Development",
      context: "Hospitality is plagued by turnover. To scale, we built a culture that team members actually valued.",
      action: "Created a formal mentorship program for high-potential associates and implemented a data-driven recognition system.",
      result: "Increased leadership retention to 80% and facilitated 8 internal management promotions."
    }
  ];

  return (
    <section id="track-record" className="py-32 bg-[#001233] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Confidential Briefing</span>
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-none mb-24">TRACK <br />RECORD.</h2>
        </FadeIn>
        
        <div className="space-y-4">
          {missions.map((m, i) => (
            <div key={i} className={`border border-white/10 transition-all duration-500 overflow-hidden ${active === i ? 'bg-white/[0.03] border-[#D4AF37]' : 'hover:bg-white/[0.01]'}`}>
              <button 
                onClick={() => setActive(active === i ? null : i)}
                className="w-full text-left py-12 px-8 flex items-center justify-between group"
              >
                <div className="flex flex-col md:flex-row md:items-center md:space-x-12">
                  <span className="text-4xl md:text-6xl font-black italic opacity-20 group-hover:opacity-100 transition-opacity text-[#D4AF37]">{m.metric}</span>
                  <div>
                    <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic">{m.title}</h3>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">{m.role}</p>
                  </div>
                </div>
                <div className={`transition-transform duration-500 ${active === i ? 'rotate-180 text-[#D4AF37]' : ''}`}>
                  {active === i ? <Minus size={32} /> : <Plus size={32} />}
                </div>
              </button>
              
              {active === i && (
                <div className="px-8 pb-16 grid md:grid-cols-3 gap-12 animate-fadeIn">
                  <div className="space-y-4">
                    <span className="text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.3em]">The Vision</span>
                    <p className="text-white/60 serif italic text-lg leading-relaxed">{m.context}</p>
                  </div>
                  <div className="space-y-4">
                    <span className="text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.3em]">The Strategy</span>
                    <p className="text-white text-lg font-bold italic leading-tight">{m.action}</p>
                  </div>
                  <div className="space-y-4 bg-[#D4AF37]/10 p-6 border-l-2 border-[#D4AF37]">
                    <span className="text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.3em]">The Impact</span>
                    <p className="text-white text-lg font-black italic tracking-tight">{m.result}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CalendarSection = () => {
  const events = [
    { month: 'JAN', title: 'THE STILL WATCH', note: 'Fireside sessions & Academy watch nights.' },
    { month: 'FEB', title: 'MIDSHIPMEN LOVE', note: 'Care packages for deployed Academy family.' },
    { month: 'MAR', title: 'FIRST CANVAS', note: 'Sailing season kick-off on the Severn.' },
    { month: 'APR', title: 'FLEET ARRIVAL', note: 'Spring Sailboat Show downtown anchor.' },
    { month: 'MAY', title: 'COMMISSIONING', note: 'The biggest week: Blue Angels & Graduation.' },
    { month: 'JUN', title: 'SUMMER SHORE', note: 'Tourism peak & First Responder weeks.' },
    { month: 'JUL', title: 'HERITAGE MONTH', note: 'Celebrating Annapolis as the 1st Capital.' },
    { month: 'AUG', title: 'PLEBE SUMMER', note: 'Next gen arrival & Induction Day brunch.' },
    { month: 'SEP', title: 'NAVY FOOTBALL', note: 'The Faithful return. Tailgate traditions.' },
    { month: 'OCT', title: 'ALL HANDS', note: 'Powerboat Show. The month that pays for winter.' },
    { month: 'NOV', title: 'THE SERVING', note: 'Veterans Day and alumni reunions.' },
    { month: 'DEC', title: 'BEAT ARMY', note: 'The Rivalry. The watch parties that stop the city.' },
  ];

  return (
    <section id="calendar" className="py-32 bg-white text-[#001233] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <FadeIn>
          <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Strategic Deployment</span>
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-none">THE CALENDAR.</h2>
        </FadeIn>
      </div>

      <div className="flex overflow-x-auto hide-scrollbar snap-x px-6 md:px-12 pb-12 gap-8">
        {events.map((e, i) => (
          <div key={i} className="flex-shrink-0 w-80 md:w-96 snap-center">
            <div className="bg-[#001233] text-white p-10 h-[450px] flex flex-col justify-between border-t-[10px] border-[#D4AF37] shadow-2xl transition-transform hover:-translate-y-2">
              <div>
                <span className="text-[#D4AF37] font-black tracking-widest text-xs">{e.month}</span>
                <h4 className="text-4xl font-black uppercase italic tracking-tighter mt-4 leading-none">{e.title}</h4>
              </div>
              <p className="serif italic text-white/50 text-xl border-l border-white/10 pl-6 leading-relaxed">"{e.note}"</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const VisionSection = () => (
  <section id="vision" className="py-40 bg-white border-b border-[#001233]/5 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-[#D4AF37]/5 -skew-x-12 transform translate-x-20"></div>
    <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
      <FadeIn>
        <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em] mb-8 block">The Mandate</span>
        <h2 className="text-5xl md:text-8xl font-black text-[#001233] uppercase tracking-tighter italic leading-[0.85] mb-12">
          CELEBRATE <br />GLORY DAYS.
        </h2>
        <div className="max-w-4xl space-y-8">
          <p className="text-[#001233] text-2xl md:text-4xl serif italic leading-tight border-l-4 border-[#D4AF37] pl-8">
            "Graduate Hotels exist to celebrate glory days. My mission is to build the living room for the Naval Academy family."
          </p>
          <p className="text-[#001233]/70 text-xl md:text-2xl font-medium leading-relaxed">
            From I-Day arrival to commissioning, weddings, and 50th reunions—Graduate Annapolis owns the family lifecycle. We don't just sell rooms; we curate the milestones of the Blue and Gold tradition.
          </p>
        </div>
      </FadeIn>
    </div>
  </section>
);

const App = () => {
  return (
    <div className="min-h-screen selection:bg-[#D4AF37] selection:text-[#001233]">
      <Navbar />
      
      <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 z-10">
          <FadeIn>
            <div className="flex items-center space-x-6 mb-8">
              <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.8em]">A Strategic Vision for Graduate Annapolis</span>
              <div className="h-px w-20 bg-[#D4AF37]/30"></div>
            </div>
            <h1 className="text-7xl md:text-[13rem] font-black uppercase italic leading-[0.75] tracking-tighter mb-12">
              COMMAND THE <br />TRADITION.
            </h1>
            <p className="text-2xl md:text-5xl serif italic text-white/80 max-w-4xl border-l-4 border-[#D4AF37] pl-10 leading-tight">
              "Where the Blue and Gold color scheme isn't décor—it's a promise."
            </p>
          </FadeIn>
        </div>

        <div className="w-full bg-[#D4AF37] py-8 mt-24 overflow-hidden shadow-2xl">
          <div className="animate-marquee whitespace-nowrap items-center flex">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-12 mx-12">
                <span className="text-[#001233] text-xs font-black uppercase tracking-[0.4em] italic flex items-center">
                  <Trophy className="mr-4 w-4 h-4" /> #1 HOTEL IN IOWA (2X)
                </span>
                <span className="text-[#001233] text-xs font-black uppercase tracking-[0.4em] italic flex items-center">
                  <TrendingUp className="mr-4 w-4 h-4" /> 18% TREVPAR GROWTH
                </span>
                <span className="text-[#001233] text-xs font-black uppercase tracking-[0.4em] italic flex items-center">
                  <Target className="mr-4 w-4 h-4" /> 80% TEAM RETENTION
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VisionSection />
      <MissionDossier />
      <CalendarSection />

      <section className="py-48 text-center bg-[#001233]">
        <h2 className="text-7xl md:text-[14rem] font-black italic tracking-tighter leading-[0.75] mb-20 uppercase">ACTIVATE <br />ANNAPOLIS.</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <a href="mailto:josephmaddox@outlook.com" className="bg-[#D4AF37] text-[#001233] px-16 py-8 text-xs font-black uppercase tracking-[0.4em] hover:bg-white transition-all shadow-2xl flex items-center justify-center space-x-4">
            <Mail size={18} /> <span>Email Briefing</span>
          </a>
          <button className="border-2 border-white/10 hover:border-[#D4AF37] px-16 py-8 text-xs font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center space-x-4">
            <FileText size={18} /> <span>Download Resume</span>
          </button>
        </div>
      </section>

      <footer className="py-16 border-t border-white/5 bg-black text-center opacity-20 hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">Joseph Maddox Strategic Ops Briefing © 2025 // Graduate Annapolis</p>
      </footer>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}