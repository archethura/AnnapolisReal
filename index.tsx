
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
  Target,
  ChevronRight
} from 'lucide-react';

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

const AccomplishmentsTicker = () => {
  const items = [
    { text: "#1 HOTEL IN IOWA: U.S. NEWS & WORLD REPORT (2X)", icon: <Trophy size={14} /> },
    { text: "18% TREVPAR GROWTH ACROSS LUXURY PORTFOLIO", icon: <TrendingUp size={14} /> },
    { text: "70% ROOMS FLOW-THROUGH PERFORMANCE", icon: <BarChart3 size={14} /> },
    { text: "$1M+ ANNUAL YIELD FROM TARGETED PROGRAMMING", icon: <Target size={14} /> },
    { text: "24% INCREASE IN LEADERSHIP RETENTION", icon: <Command size={14} /> },
  ];
  return (
    <div className="w-full bg-[#D4AF37] py-8 overflow-hidden mt-20 relative shadow-2xl">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center mx-12">
            <span className="text-[#001233] mr-4">{item.icon}</span>
            <span className="text-[#001233] text-sm md:text-base font-black uppercase tracking-[0.4em] italic">{item.text}</span>
            <div className="ml-12 h-2 w-2 rounded-full bg-[#001233]/20"></div>
          </div>
        ))}
      </div>
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
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Vision', href: '#vision' },
    { name: 'Calendar', href: '#calendar' },
  ];
  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-[#001233]/98 py-3 border-b border-[#D4AF37]/20 backdrop-blur-md' : 'bg-transparent py-8 md:py-10'}`}>
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-5 group">
          <Anchor className="w-8 h-8 md:w-10 md:h-10 text-[#D4AF37] transition-transform group-hover:rotate-12" />
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-[0.25em] text-white leading-none uppercase italic">JOSEPH MADDOX</span>
            <span className="text-[8px] md:text-[9px] tracking-[0.6em] text-[#D4AF37] uppercase font-black mt-1">Graduate Annapolis Briefing</span>
          </div>
        </a>
        <div className="hidden lg:flex items-center space-x-12">
          {links.map(link => (
            <a key={link.name} href={link.href} className="text-[10px] font-black text-white/50 hover:text-[#D4AF37] transition-all uppercase tracking-[0.4em] relative group">
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" className="bg-[#D4AF37] text-[#001233] px-10 py-3.5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl">Resume</a>
        </div>
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={28} /> : <Menu size={28} />}</button>
      </div>
    </nav>
  );
};

const MissionDossiers = () => {
  const [active, setActive] = useState<number | null>(0);
  const missions = [
    {
      metric: '2,000+',
      title: 'THE COMMUNITY RELAUNCH',
      subtitle: 'The Warrior Hotel, Autograph Collection',
      see: "The Warrior Hotel opened during the height of COVID — a masterpiece hidden behind masks and mandates. The opportunity wasn't just to relaunch a hotel — it was to reignite civic pride.",
      shape: "We used the Chamber of Commerce as a bridge between business and community — transforming a single ribbon cutting into a six-week celebration of renewal.",
      sell: "For six consecutive weeks, the city came alive. Over 2,000 guests joined in the celebrations. $200K in auxiliary spend followed over five months.",
      evidence: [
        'images/rooftop-party.jpg', 'images/ribbon-lobby.jpg', 'images/ribbon-rooftop.jpg',
        'images/ribbon-spa.jpg', 'images/live-music.jpg', 'images/lounge-packed.jpg',
        'images/rooftop-crowd.jpg', 'images/crowd-selfie.jpg'
      ]
    },
    {
      metric: '$1M+',
      title: 'THE ACTIVATION ENGINE',
      subtitle: 'The Warrior Hotel & Hotel Julien Dubuque',
      see: "Hotels in regional markets don't get foot traffic by accident — they earn it. We asked: What if the hotel itself became the destination?",
      shape: "We built a systematic programming engine: recurring series like Ladies Night ($8K+ per event) and seasonal tentpoles like the NYE Masquerade Ball.",
      sell: "Over $1M in activation and campaign-driven revenue since 2022. Across a 4-property portfolio, 22 activations drove a 6% TRevPAR lift.",
      evidence: [
        'images/act-12days.jpg', 'images/act-nye.jpg', 'images/act-ladies.jpg', 'images/act-trivia.jpg',
        'images/act-eclipse.jpg', 'images/act-halloween.jpg', 'images/act-football.jpg',
        'images/act-brides-night.jpg', 'images/act-sizzling.jpg', 'images/act-heroes.jpg', 'images/act-skincare.jpg'
      ]
    },
    {
      metric: '80%',
      title: 'BUILDING TEAMS THAT STAY',
      subtitle: '80% Retention | 27-Point Engagement Increase',
      see: "Hospitality turnover is industry-wide. What if we built a culture where people actually wanted to stay?",
      shape: "Created a multi-layered recognition system and identified high-potential associates early for clear promotion pathways.",
      sell: "Retention climbed to 80%. Leadership retention increased 24%. Promoted 8 associates internally and mentored 14 team members into management.",
      evidence: [
        'images/housekeeping-week.jpg', 'images/trolley-1.jpg', 'images/trolley-2.jpg',
        'images/pizza-party.jpg', 'images/group-dinner.jpg', 'images/team-meeting.jpg',
        'images/certificate-presentation.jpg'
      ]
    }
  ];

  return (
    <section id="case-studies" className="bg-[#001233] text-white py-40 border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12">
        <h2 className="text-7xl md:text-[11rem] font-black uppercase tracking-tighter italic leading-none mb-32">RESULTS <br />IN ACTION.</h2>
        <div className="space-y-4">
          {missions.map((m, i) => (
            <div key={i} className={`border border-white/10 transition-all duration-700 ${active === i ? 'bg-white/[0.02] border-[#D4AF37]' : 'hover:bg-white/[0.01]'}`}>
              <button onClick={() => setActive(active === i ? null : i)} className="w-full text-left py-16 px-8 md:px-12 flex items-center justify-between group">
                <div className="flex items-center space-x-12">
                  <span className="text-4xl md:text-7xl font-black italic opacity-10 group-hover:opacity-100 transition-opacity">{m.metric}</span>
                  <div>
                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4 italic group-hover:text-[#D4AF37]">{m.title}</h3>
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">{m.subtitle}</div>
                  </div>
                </div>
                <div className={`p-4 border border-white/10 group-hover:border-[#D4AF37] transition-all transform ${active === i ? 'rotate-180 text-[#D4AF37]' : ''}`}>
                   {active === i ? <Minus size={40} /> : <Plus size={40} />}
                </div>
              </button>
              {active === i && (
                <div className="px-8 md:px-12 pb-24 animate-fadeIn">
                  <div className="grid lg:grid-cols-3 gap-16 mb-24">
                    <div className="space-y-8"><span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.4em]">The See</span><p className="text-white/60 text-xl serif italic">{m.see}</p></div>
                    <div className="space-y-8"><span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.4em]">The Shape</span><p className="text-white text-xl font-black italic">{m.shape}</p></div>
                    <div className="space-y-8 bg-[#D4AF37]/5 p-8 border-l-4 border-[#D4AF37]"><span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.4em]">The Sell</span><p className="text-white text-xl font-black italic">{m.sell}</p></div>
                  </div>
                  <div className="flex overflow-x-auto gap-6 hide-scrollbar pb-8 snap-x">
                    {m.evidence.map((img, idx) => (
                      <div key={idx} className="flex-shrink-0 w-[300px] md:w-[450px] aspect-[16/10] bg-white/5 relative overflow-hidden border border-white/10 snap-center group/img">
                        <img src={img} className="w-full h-full object-cover grayscale brightness-50 group-hover/img:grayscale-0 group-hover/img:brightness-100 transition-all duration-700" alt="Evidence" />
                      </div>
                    ))}
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

const App = () => (
  <div className="min-h-screen bg-[#001233]">
    <Navbar />
    <main>
      <section className="relative min-h-screen flex flex-col justify-center bg-[#001233] pt-32">
        <div className="max-w-[1600px] mx-auto px-8 md:px-12 relative z-10">
          <AnimatedOnScroll className="mb-8 flex items-center space-x-6"><span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.8em]">Operational Directive</span><div className="h-px w-24 bg-[#D4AF37]/40"></div></AnimatedOnScroll>
          <AnimatedOnScroll delay={200}><h1 className="text-7xl md:text-[12rem] text-white font-black uppercase leading-[0.8] tracking-tighter italic mb-10">COMMAND THE <br />TRADITION</h1></AnimatedOnScroll>
        </div>
        <AccomplishmentsTicker />
      </section>
      <MissionDossiers />
    </main>
  </div>
);

createRoot(document.getElementById('root')!).render(<App />);
