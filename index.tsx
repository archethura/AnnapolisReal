
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

const StaggeredText: React.FC<{ lines: string[]; className?: string }> = ({ lines, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-50px');
  return (
    <div ref={ref} className={className}>
      {lines.map((line, idx) => (
        <p key={idx} className={`transition-all duration-1000 ease-out mb-6 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: `${idx * 200}ms` }}>
          {line}
        </p>
      ))}
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
          <div className="flex flex-col text-left">
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
      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#001233] absolute top-full left-0 w-full border-b border-[#D4AF37]/20 p-8 flex flex-col space-y-6">
          {links.map(link => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-xl font-black text-white uppercase tracking-widest">{link.name}</a>
          ))}
        </div>
      )}
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
      see: "The Warrior Hotel opened during the height of COVID — a masterpiece hidden behind masks and mandates. The opportunity wasn't just to relaunch a hotel — it was to reignite civic pride and reintroduce The Warrior as a symbol of Sioux City's strength.",
      shape: "We began with a roundtable: What potential are we trying to actualize? The answer was reconnection. We used the Chamber of Commerce as a bridge between business and community — transforming a single ribbon cutting into a six-week celebration of renewal.",
      sell: "For six consecutive weeks, the city came alive. Over 2,000 guests joined in the celebrations, rediscovering a place that felt both brand new and deeply familiar. $200K in auxiliary spend followed over five months.",
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
      see: "Hotels in regional markets don't get foot traffic by accident — they earn it. The potential wasn't to compete for the travelers already coming; it was to manufacture demand by giving people a reason to arrive.",
      shape: "We built a systematic programming engine: recurring series like Ladies Night ($8K+ per event) and seasonal tentpoles like the NYE Masquerade Ball (400+ guests), and Valentine's couples retreats.",
      sell: "Over $1M in activation and campaign-driven revenue since 2022. Across a 4-property portfolio, 22 activations drove a 6% TRevPAR lift. The hotel became the heartbeat of the city.",
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
      see: "Hospitality turnover hovers near 80% industry-wide. The potential wasn't just retention — it was transformation. What if we built a culture where people actually wanted to stay?",
      shape: "We created a multi-layered recognition system and development infrastructure: identified high-potential associates early, created mentorship tracks, and mapped clear promotion pathways.",
      sell: "Retention climbed to 80%. Leadership retention increased 24%. We promoted 8 associates internally and mentored 14 team members into management positions. Engagement scores jumped 27 points.",
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
                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4 italic group-hover:text-[#D4AF37] transition-colors">{m.title}</h3>
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
                    <div className="space-y-8"><span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.4em]">The See</span><p className="text-white/60 text-xl serif italic leading-relaxed">{m.see}</p></div>
                    <div className="space-y-8"><span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.4em]">The Shape</span><p className="text-white text-xl font-black italic tracking-tight">{m.shape}</p></div>
                    <div className="space-y-8 bg-[#D4AF37]/5 p-8 border-l-4 border-[#D4AF37]"><span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.4em]">The Sell</span><p className="text-white text-xl font-black italic tracking-tight">{m.sell}</p></div>
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

const Roadmap = () => {
  const months = [
    { name: 'JAN', title: 'THE STILL WATCH', tag: 'Winter vigil', desc: 'The harbor goes quiet. The Academy keeps watch. Fireside cocktails at the bar. Oyster stew Saturdays.' },
    { name: 'FEB', title: 'WHAT THE HEART KNOWS', tag: 'Love letters shipped for centuries', desc: "Annapolis has always been a port of departure. Valentine's packages for midshipmen stationed abroad." },
    { name: 'MAR', title: 'FIRST CANVAS', tag: 'Sails go up', desc: 'The sailboats return to the harbor. Spring racing season begins. Nautical cocktail menu launches.' },
    { name: 'APR', title: 'THE FLEET RETURNS', tag: 'Boat show homecoming', desc: 'Spring Sailboat Show anchors downtown. Marina partnerships. Dockside happy hours.' },
    { name: 'MAY', title: 'ANCHORS AWEIGH', tag: 'Commissioning Week', desc: 'The biggest week of the year. Parents, admirals, the Blue Angels overhead. Graduation brunch packages.' },
    { name: 'JUN', title: 'WHAT FREEDOM COSTS', tag: 'Why they train here', desc: 'Summer tourism peaks. First responder weeks. Military family rates. Freedom isn’t free.' },
    { name: 'JUL', title: 'WHERE CONGRESS GATHERED', tag: 'The capital before the capital', desc: 'Before D.C., there was Annapolis. Colonial heritage programming. History walks.' },
    { name: 'AUG', title: 'PLEBE SUMMER', tag: 'Next generation arrives', desc: 'New midshipmen flood the Yard. Parents need somewhere to stay. I-Day recovery brunch.' },
    { name: 'SEP', title: 'THE FAITHFUL', tag: 'Navy Football', desc: 'Football season opens. Tailgate partnerships. Pre-game brunch. Navy-Marine Corps Memorial Stadium is one mile away.' },
    { name: 'OCT', title: 'ALL HANDS', tag: 'The biggest month', desc: 'Powerboat Show. Homecoming. Fall colors on the Severn. The month that pays for winter.' },
    { name: 'NOV', title: 'THOSE WHO SERVE', tag: 'Veterans Day', desc: 'The town that trains them honors those who served. Veteran recognition week.' },
    { name: 'DEC', title: 'BEAT ARMY', tag: 'The rivalry, at attention', desc: 'The game that stops the nation. Army-Navy watch parties. Alumni reunions.' },
  ];
  return (
    <section id="calendar" className="py-40 bg-[#f9f9f9] overflow-hidden border-b border-black/5 relative">
       <div className="max-w-[1600px] mx-auto px-8 md:px-12 mb-32 relative z-10">
          <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[1em] mb-6 block">Deployment</span>
          <h2 className="text-7xl md:text-[11rem] font-black text-[#001233] uppercase tracking-tighter leading-none italic">THE CALENDAR.</h2>
       </div>
       <div className="flex overflow-x-auto pb-20 hide-scrollbar px-8 md:px-12 gap-12 snap-x relative z-10">
          {months.map((m, i) => (
            <div key={i} className="flex-shrink-0 w-[350px] md:w-[500px] snap-center">
              <div className="bg-[#001233] text-white p-12 md:p-16 h-[550px] flex flex-col justify-between border-t-[16px] border-[#D4AF37] relative group overflow-hidden shadow-2xl transition-all duration-700">
                <div className="text-[12rem] font-black text-white/5 absolute -bottom-20 -right-20 italic leading-none">{i+1}</div>
                <div>
                   <div className="text-[#D4AF37] text-xs font-black tracking-[0.5em] mb-4">{m.name}</div>
                   <h4 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-[0.9] mb-4 group-hover:text-[#D4AF37] transition-colors">{m.title}</h4>
                   <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em] mb-8 italic">{m.tag}</p>
                </div>
                <div>
                   <p className="text-white/60 text-xl font-medium italic serif leading-relaxed border-l border-white/20 pl-6 group-hover:text-white transition-colors">"{m.desc}"</p>
                </div>
              </div>
            </div>
          ))}
       </div>
    </section>
  );
};

const TheWhy = () => (
  <section id="vision" className="py-40 bg-white relative overflow-hidden border-b border-black/5">
    <div className="max-w-[1600px] mx-auto px-8 md:px-12 relative z-10">
      <div className="max-w-5xl text-left">
           <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[1em] mb-12 block">The Mandate // Mission Briefing</span>
           <h2 className="text-6xl md:text-[8rem] font-black text-[#001233] uppercase tracking-tighter leading-[0.85] italic mb-16">CELEBRATE <br />GLORY <br />DAYS.</h2>
           <StaggeredText 
              className="text-[#001233]/70 text-2xl md:text-3xl leading-relaxed font-medium serif italic border-l-2 border-[#D4AF37] pl-10"
              lines={[
                "Graduate Hotels exist to celebrate glory days. My career has been spent creating them.",
                "Commissioning Week books two years out. That's not a constraint—it's a foundation. The question is what happens the other fifty-one weeks.",
                "Graduate Annapolis can own the Naval Academy family lifecycle: I-Day arrivals, parents' weekends, reunions, and weddings."
              ]} 
           />
      </div>
    </div>
  </section>
);

const App = () => (
  <div className="min-h-screen bg-[#001233] selection:bg-[#D4AF37] selection:text-[#001233]">
    <Navbar />
    <main>
      <section className="relative min-h-screen flex flex-col justify-center bg-[#001233] pt-32 pb-20">
        <div className="max-w-[1600px] mx-auto px-8 md:px-12 relative z-10 text-left">
          <AnimatedOnScroll className="mb-8 flex items-center space-x-6">
            <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.8em]">Operational Directive</span>
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
        <AccomplishmentsTicker />
      </section>
      <TheWhy />
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
      <MissionDossiers />
      <Roadmap />
      <section className="py-60 bg-[#001233] text-white text-center">
        <h2 className="text-7xl md:text-[15rem] font-black uppercase tracking-tighter mb-24 italic leading-[0.75]">ACTIVATE <br />ANNAPOLIS.</h2>
        <div className="flex flex-col md:flex-row justify-center gap-12 px-8">
          <a href="mailto:josephmaddox@outlook.com" className="bg-[#D4AF37] text-[#001233] px-20 py-10 text-sm font-black uppercase tracking-[0.5em] hover:bg-white transition-all shadow-2xl flex items-center justify-center space-x-5">
             <Mail size={24} /> <span>Email Briefing</span>
          </a>
          <button className="border-4 border-white/10 hover:border-[#D4AF37] px-20 py-10 text-sm font-black uppercase tracking-[0.5em] transition-all flex items-center justify-center space-x-5">
             <FileText size={24} /> <span>Detailed Vision</span>
          </button>
        </div>
      </section>
    </main>
    <footer className="py-24 bg-black text-white/20 border-t border-white/5 text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.6em]">Joseph Maddox Strategic Ops Briefing © 2025 // Graduate Annapolis</p>
    </footer>
  </div>
);

createRoot(document.getElementById('root')!).render(<App />);
