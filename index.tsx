
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Anchor, 
  Mail, 
  FileText,
  Menu,
  X,
  Eye,
  Zap,
  Layers,
  Plus,
  Minus,
  Shield,
  Maximize2,
  Command,
  Waves,
  Trophy,
  BarChart3,
  TrendingUp,
  Target,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

const useOnScreen = (ref: React.RefObject<HTMLElement>, rootMargin = '0px') => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { rootMargin, threshold: 0.05 }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref, rootMargin]);
  return isVisible;
};

const AnimatedOnScroll: React.FC<{
  children?: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: string;
}> = ({ children, delay = 0, className = '', threshold = '0px' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, threshold);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
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
        <p 
          key={idx} 
          className={`transition-all duration-1000 ease-out mb-6 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          style={{ transitionDelay: `${idx * 200}ms` }}
        >
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

  const tickerItems = [...items, ...items];

  return (
    <div className="w-full bg-[#D4AF37] py-8 overflow-hidden mt-20 relative shadow-2xl">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {tickerItems.map((item, idx) => (
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
    <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-[#001233]/98 py-3 border-b border-[#D4AF37]/20 backdrop-blur-md shadow-2xl' : 'bg-transparent py-8 md:py-10'}`}>
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-5 group">
          <div className="relative">
             <Anchor className="w-8 h-8 md:w-10 md:h-10 text-[#D4AF37] relative z-10 transition-transform group-hover:rotate-12" />
             <div className="absolute inset-0 bg-[#D4AF37]/20 blur-2xl scale-0 group-hover:scale-150 transition-transform"></div>
          </div>
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
          <button className="bg-[#D4AF37] text-[#001233] px-10 py-3.5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl">
            Resume
          </button>
        </div>

        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#001233] pt-32 md:pt-48 pb-10">
      <div className="absolute inset-0 bg-cover bg-center opacity-30 bg-[url('https://images.unsplash.com/photo-1543722530-d2c32013a181?q=80&w=2940&auto=format&fit=crop')]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001233]/60 to-[#001233]"></div>
      
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>

      <div className="relative z-10 max-w-[1600px] w-full mx-auto px-8 md:px-12 flex-1 flex flex-col justify-center">
        <div className="max-w-7xl">
          <AnimatedOnScroll className="mb-8 flex items-center space-x-6">
            <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.8em]">Operational Directive // USNA Command</span>
            <div className="h-px w-24 bg-[#D4AF37]/40"></div>
          </AnimatedOnScroll>
          <AnimatedOnScroll delay={200}>
            <h1 className="text-7xl md:text-[12rem] xl:text-[15rem] text-white font-black uppercase leading-[0.8] tracking-tighter mb-10 italic">
              COMMAND THE <br />TRADITION
            </h1>
          </AnimatedOnScroll>
          <AnimatedOnScroll delay={400} className="border-l-4 border-[#D4AF37] pl-10 max-w-4xl">
            <p className="text-2xl md:text-5xl text-white/90 serif italic leading-[1.2]">
              "Where the Blue and Gold color scheme isn't décor—it's a promise."
            </p>
          </AnimatedOnScroll>
        </div>
      </div>

      <AnimatedOnScroll delay={600} className="w-full relative z-10">
        <AccomplishmentsTicker />
      </AnimatedOnScroll>
    </section>
  );
};

const TheWhy = () => {
  const briefingLines = [
    "Graduate Hotels exist to celebrate glory days. My career has been spent creating them.",
    "Graduate's thesis—that college-town hotels win by celebrating place—is exactly how I operate.",
    "Commissioning Week books two years out. That's not a constraint—it's a foundation. The question is what happens the other fifty-one weeks.",
    "With the largest event footprint in Annapolis and Hilton's distribution engine now behind the brand, Graduate can own the Naval Academy family lifecycle: I-Day arrivals, parents' weekends, reunions, and weddings.",
    "I'm the GM who turned a 148-key Autograph property into the U.S. News & World Report #1 Hotel in Iowa—twice.",
    "Graduate Annapolis deserves that same energy. A property where families return, where midshipmen celebrate, and where the most activated space on the Chesapeake lives."
  ];

  return (
    <section id="vision" className="py-40 bg-white relative overflow-hidden border-b border-black/5">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#001233 1px, transparent 1px), linear-gradient(90deg, #001233 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 relative z-10">
        <div className="max-w-5xl">
             <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[1em] mb-12 block">The Mandate // Mission Briefing</span>
             <h2 className="text-6xl md:text-[8rem] font-black text-[#001233] uppercase tracking-tighter leading-[0.85] italic mb-16 text-left">CELEBRATE <br />GLORY <br />DAYS.</h2>
             
             <div className="flex justify-start">
                <StaggeredText 
                    lines={briefingLines} 
                    className="text-[#001233]/70 text-2xl md:text-3xl leading-relaxed font-medium serif italic max-w-4xl text-left border-l-2 border-[#D4AF37] pl-10"
                />
             </div>
        </div>
      </div>
    </section>
  );
};

const TrackRecord = () => {
  const cards = [
    { metric: '18%', label: 'Growth', title: 'TRevPAR Performance', body: "Delivered 18% TRevPAR growth and 70% rooms flow-through in underperforming luxury assets." },
    { metric: '$1M+', label: 'Yield', title: 'Activation Revenue', body: 'Proven track record of building twelve-month calendars that turn outlets into destinations.' },
    { metric: '24%', label: 'Retention', title: 'Leadership Continuity', body: 'Increased retention by 24% through recognition systems and mission-driven culture.' }
  ];

  return (
    <section id="track-record" className="py-40 bg-[#001233] text-white relative border-y border-white/5">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 relative z-10">
        <div className="mb-32">
          <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[1em] mb-6 block">Section 01 // Executive Performance</span>
          <h2 className="text-7xl md:text-[11rem] font-black uppercase tracking-tighter leading-none italic">THE RECORD.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {cards.map((c, i) => (
            <div key={i} className="bg-[#001233] p-16 hover:bg-[#D4AF37]/5 transition-all duration-700 group">
              <div className="flex items-baseline mb-12">
                <span className="text-7xl md:text-9xl font-black italic tracking-tighter group-hover:text-[#D4AF37] transition-colors">{c.metric}</span>
                <span className="text-xs font-black uppercase tracking-[0.4em] text-[#D4AF37] ml-4">{c.label}</span>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 italic">{c.title}</h3>
              <p className="text-white/40 text-xl font-medium leading-relaxed italic serif">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MethodologyProtocol = () => {
  const [activeStage, setActiveStage] = useState(0);
  const stages = [
    { 
      label: 'SEE', 
      desc: 'THE OPPORTUNITY', 
      detail: 'Analyzing the Naval Academy family lifecycle. I see the 21,000 square feet not as empty space, but as the future epicenter of Annapolis celebrations.',
    },
    { 
      label: 'SHAPE', 
      desc: 'THE PROGRAMMING', 
      detail: 'Building traditions that sell out annually. From eclipse viewing to charity watch parties, we tie every activation to the local identity.',
    },
    { 
      label: 'SELL', 
      desc: 'THE EXPERIENCE', 
      detail: 'Turning foot traffic into destination loyalty. Ensuring the Trophy Room is the default home for midshipmen milestones.',
    }
  ];

  return (
    <section id="protocol" className="bg-[#001233] text-white py-40 overflow-hidden relative border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 relative z-10">
        <div className="mb-32">
          <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[1em] mb-6 block">Section 02 // Strategic Protocol</span>
          <h2 className="text-7xl md:text-[11rem] font-black uppercase tracking-tighter leading-none italic">HOW I ACTIVATE.</h2>
        </div>

        <div className="max-w-5xl">
          <div className="space-y-16">
            {stages.map((stage, i) => (
              <button 
                key={i} 
                onMouseEnter={() => setActiveStage(i)}
                className={`w-full text-left group transition-all duration-700 ${activeStage === i ? 'opacity-100' : 'opacity-20 hover:opacity-50'}`}
              >
                <div className="flex items-center space-x-12">
                   <span className="text-8xl md:text-[10rem] font-black italic tracking-tighter leading-none">{stage.label}</span>
                   <div className="pt-4 flex-1">
                      <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em] mb-4">{stage.desc}</p>
                      <p className="text-xl md:text-3xl font-medium leading-relaxed italic serif">{stage.detail}</p>
                   </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const MissionDossiers = () => {
  const [active, setActive] = useState<number | null>(0);
  const missions = [
    {
      metric: '2,000+',
      title: 'THE COMMUNITY RELAUNCH',
      subtitle: 'The Warrior Hotel, Autograph Collection',
      see: "The Warrior Hotel opened during the height of COVID — a masterpiece hidden behind masks and mandates. The building was beautiful, the brand was strong, but the community never had the chance to celebrate it. The opportunity wasn't just to relaunch a hotel — it was to reignite civic pride and reintroduce The Warrior as a symbol of Sioux City's strength and revival.",
      shape: "We began with a roundtable: What potential are we trying to actualize? The answer was clear — reconnection. The team envisioned The Warrior not as a luxury landmark standing apart, but as a gathering place standing with the city. We used the Chamber of Commerce as a bridge between business and community — transforming a single ribbon cutting into a six-week celebration of renewal.",
      sell: "For six consecutive weeks, the city came alive. Over 2,000 guests joined in the celebrations, rediscovering a place that felt both brand new and deeply familiar. $200K in auxiliary spend followed over five months. The Warrior reentered the community not through advertising, but through authentic connection.",
      evidence: [
        'images/rooftop-party.jpg',
        'images/ribbon-lobby.jpg',
        'images/ribbon-rooftop.jpg',
        'images/ribbon-spa.jpg',
        'images/live-music.jpg',
        'images/lounge-packed.jpg',
        'images/rooftop-crowd.jpg',
        'images/crowd-selfie.jpg'
      ]
    },
    {
      metric: '$1M+',
      title: 'THE ACTIVATION ENGINE',
      subtitle: 'The Warrior Hotel & Hotel Julien Dubuque',
      see: "Hotels in regional markets don't get foot traffic by accident — they earn it. The potential wasn't to compete for the travelers already coming; it was to manufacture demand by giving people a reason to arrive in the first place. The question we asked: What if the hotel itself became the destination?",
      shape: "We built a systematic programming engine with three layers. First, recurring series that create habit and fill midweek gaps: Ladies Night every Thursday ($8K+ per event), Trivia Wednesdays, Sizzling Thursdays steak specials. Second, seasonal tentpoles: 12 Days of Christmas (200+ room nights annually), NYE Masquerade Ball (400+ guests), Valentine's couples retreats. Third, premium experiences: winemaker dinners, chef's table events, spa skincare nights, bourbon tastings.",
      sell: "Over $1M in activation and campaign-driven revenue since 2022. Across a 4-property portfolio, 22 activations drove a 6% TRevPAR lift. The properties went from competing on rate to competing on experience. The hotel became the heartbeat of the city — not just another room to book.",
      evidence: [
        'images/act-12days.jpg',
        'images/act-nye.jpg',
        'images/act-ladies.jpg',
        'images/act-trivia.jpg',
        'images/act-eclipse.jpg',
        'images/act-halloween.jpg',
        'images/act-football.jpg',
        'images/act-brides-night.jpg',
        'images/act-sizzling.jpg',
        'images/act-heroes.jpg',
        'images/act-skincare.jpg'
      ]
    },
    {
      metric: '80%',
      title: 'BUILDING TEAMS THAT STAY',
      subtitle: '80% Retention | 27-Point Engagement Increase',
      see: "Hospitality turnover hovers near 80% industry-wide. But behind every resignation is a person who never felt seen, never felt developed, never felt like their future was here. The potential wasn't just retention — it was transformation. What if we built a culture where people actually wanted to stay?",
      shape: "We created a multi-layered recognition and development system. Monthly: Employee of the Month with real rewards. Weekly: department-level shoutouts. Annually: service anniversary celebrations, holiday parties, summer outings. But recognition without development rings hollow. So we built career pathing infrastructure: identified high-potential associates early, created mentorship tracks, mapped clear promotion pathways.",
      sell: "Retention climbed to 80%. Leadership retention increased 24%. We promoted 8 associates internally and mentored 14 team members into supervisor and management positions. Engagement scores jumped 27 points. Teams that stay together learn together — and guests feel the difference in every interaction.",
      evidence: [
        'images/housekeeping-week.jpg',
        'images/trolley-1.jpg',
        'images/trolley-2.jpg',
        'images/pizza-party.jpg',
        'images/group-dinner.jpg',
        'images/team-meeting.jpg',
        'images/certificate-presentation.jpg'
      ]
    }
  ];

  return (
    <section id="case-studies" className="bg-[#001233] text-white py-40 border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12">
        <div className="mb-32">
          <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[1em] mb-6 block">Label // Case Studies</span>
          <h2 className="text-7xl md:text-[11rem] font-black uppercase tracking-tighter italic leading-none">RESULTS <br />IN ACTION.</h2>
        </div>

        <div className="space-y-4">
          {missions.map((m, i) => (
            <div key={i} className={`border border-white/10 transition-all duration-700 ${active === i ? 'bg-white/[0.02] border-[#D4AF37]' : 'hover:bg-white/[0.01]'}`}>
              <button 
                onClick={() => setActive(active === i ? null : i)}
                className="w-full text-left py-16 px-8 md:px-12 flex items-center justify-between group"
              >
                <div className="flex items-center space-x-12">
                  <span className="text-4xl md:text-7xl font-black italic opacity-10 group-hover:opacity-100 transition-opacity">{m.metric}</span>
                  <div>
                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4 italic group-hover:text-[#D4AF37] transition-colors">{m.title}</h3>
                    <div className="flex items-center space-x-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">
                      <span>{m.subtitle}</span>
                    </div>
                  </div>
                </div>
                <div className={`p-4 border border-white/10 group-hover:border-[#D4AF37] transition-all transform ${active === i ? 'rotate-180 text-[#D4AF37]' : ''}`}>
                   {active === i ? <Minus size={40} /> : <Plus size={40} />}
                </div>
              </button>

              <div className={`transition-all duration-1000 ease-in-out ${active === i ? 'max-h-[5000px] opacity-100 pb-24' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="px-8 md:px-12">
                   {/* Strategic Framework Grid */}
                   <div className="grid lg:grid-cols-3 gap-16 mb-24">
                      <div className="space-y-8">
                        <div className="flex items-center space-x-4 text-[#D4AF37]">
                          <span className="text-xs font-black uppercase tracking-[0.4em]">The See</span>
                          <div className="h-px flex-1 bg-[#D4AF37]/30"></div>
                        </div>
                        <p className="text-white/60 text-xl md:text-2xl italic serif leading-relaxed">
                          {m.see}
                        </p>
                      </div>

                      <div className="space-y-8">
                        <div className="flex items-center space-x-4 text-[#D4AF37]">
                          <span className="text-xs font-black uppercase tracking-[0.4em]">The Shape</span>
                          <div className="h-px flex-1 bg-[#D4AF37]/30"></div>
                        </div>
                        <p className="text-white text-xl md:text-2xl font-black italic tracking-tight">
                          {m.shape}
                        </p>
                      </div>

                      <div className="space-y-8 bg-[#D4AF37]/5 p-8 border-l-4 border-[#D4AF37]">
                        <div className="flex items-center space-x-4 text-[#D4AF37]">
                          <span className="text-xs font-black uppercase tracking-[0.4em]">The Sell</span>
                          <div className="h-px flex-1 bg-[#D4AF37]/30"></div>
                        </div>
                        <p className="text-white text-xl md:text-2xl font-black italic tracking-tight">
                          {m.sell}
                        </p>
                      </div>
                   </div>

                   {/* Compact Horizontal Image Scroll */}
                   <div className="relative group">
                      <div className="flex overflow-x-auto gap-6 hide-scrollbar pb-8 snap-x">
                        {m.evidence.map((img, idx) => (
                          <div key={idx} className="flex-shrink-0 w-[300px] md:w-[450px] aspect-[16/10] bg-white/5 relative overflow-hidden border border-white/10 shadow-2xl snap-center group/img">
                            <img 
                              src={img} 
                              className="w-full h-full object-cover grayscale brightness-50 group-hover/img:grayscale-0 group-hover/img:brightness-100 transition-all duration-700" 
                              alt="Operational Evidence"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity p-8 flex items-end">
                               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Evidence Field Recording // {idx + 1}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="absolute top-1/2 -right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#D4AF37] p-4 text-[#001233] pointer-events-none">
                         <ChevronRight size={24} />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Roadmap = () => {
  const months = [
    { name: 'JAN', title: 'THE STILL WATCH', tag: 'Winter vigil', desc: 'The harbor goes quiet. The Academy keeps watch. Fireside cocktails at the bar. Oyster stew Saturdays. The discipline of stillness — honored in the off-season.' },
    { name: 'FEB', title: 'WHAT THE HEART KNOWS', tag: 'Love letters shipped for centuries', desc: "Annapolis has always been a port of departure. Valentine's packages for midshipmen stationed abroad. Love letters reading series. Couples weekends in a town that understands distance." },
    { name: 'MAR', title: 'FIRST CANVAS', tag: 'Sails go up', desc: 'The sailboats return to the harbor. Spring racing season begins. Nautical cocktail menu launches. The first warm weekend belongs to whoever gets here first.' },
    { name: 'APR', title: 'THE FLEET RETURNS', tag: 'Boat show homecoming', desc: 'Spring Sailboat Show anchors downtown. Marina partnerships. Dockside happy hours. The town fills with people who know their knots.' },
    { name: 'MAY', title: 'ANCHORS AWEIGH', tag: 'Commissioning Week', desc: 'The biggest week of the year. Parents, admirals, the Blue Angels overhead. Graduation brunch packages. The moment four years becomes a commission. The hotel as headquarters for families who came to watch.' },
    { name: 'JUN', title: 'WHAT FREEDOM COSTS', tag: 'Why they train here', desc: 'Summer tourism peaks. But this month honors the reason the Academy exists. First responder weeks. Military family rates. Freedom isn’t free — and Annapolis knows the price.' },
    { name: 'JUL', title: 'WHERE CONGRESS GATHERED', tag: 'The capital before the capital', desc: 'Before D.C., there was Annapolis. Colonial heritage programming. History walks departing from the lobby. Declaration Day celebration. The statehouse that ratified the Treaty of Paris.' },
    { name: 'AUG', title: 'PLEBE SUMMER', tag: 'Next generation arrives', desc: 'New midshipmen flood the Yard. Parents need somewhere to stay — and somewhere to exhale. Plebe parent packages. I-Day recovery brunch. The beginning of everything.' },
    { name: 'SEP', title: 'THE FAITHFUL', tag: 'Navy Football', desc: 'Football season opens. Tailgate partnerships. Pre-game brunch. Post-game bourbon. Navy-Marine Corps Memorial Stadium is one mile away. The hotel becomes the rally point.' },
    { name: 'OCT', title: 'ALL HANDS', tag: 'The biggest month', desc: 'Powerboat Show. Homecoming. Fall colors on the Severn. Every room booked, every seat filled. The month that pays for winter.' },
    { name: 'NOV', title: 'THOSE WHO SERVE', tag: 'Veterans Day', desc: 'The town that trains them honors those who served. Veteran recognition week. Gratitude menu at the restaurant. Military appreciation rates. A month to say thank you.' },
    { name: 'DEC', title: 'BEAT ARMY', tag: 'The rivalry, at attention', desc: 'The game that stops the nation. Army-Navy watch parties. Alumni reunions. The bar packed with people who still remember their company. Win or lose, they sing second.' },
  ];

  return (
    <section id="calendar" className="py-40 bg-[#f9f9f9] overflow-hidden border-b border-black/5 relative">
       <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#001233 1px, transparent 1px), linear-gradient(90deg, #001233 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
       <div className="max-w-[1600px] mx-auto px-8 md:px-12 mb-32 relative z-10">
          <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[1em] mb-6 block">Section 04 // Deployment</span>
          <h2 className="text-7xl md:text-[11rem] font-black text-[#001233] uppercase tracking-tighter leading-none italic">THE CALENDAR.</h2>
          <p className="text-[#001233]/40 text-2xl font-medium mt-10 italic uppercase tracking-[0.2em] max-w-2xl border-l-2 border-[#D4AF37] pl-10">
            Owning the 51 weeks that happen between Commissioning ceremonies.
          </p>
       </div>
       <div className="flex overflow-x-auto pb-20 hide-scrollbar px-8 md:px-12 gap-12 snap-x relative z-10">
          {months.map((m, i) => (
            <div key={i} className="flex-shrink-0 w-[350px] md:w-[500px] snap-center">
              <div className="bg-[#001233] text-white p-12 md:p-16 h-[650px] flex flex-col justify-between border-t-[16px] border-[#D4AF37] relative group overflow-hidden shadow-2xl transition-all duration-700 border-x border-white/5">
                <div className="text-[12rem] md:text-[18rem] font-black text-white/5 absolute -bottom-20 -right-20 italic select-none leading-none group-hover:text-[#D4AF37]/5 transition-colors">{i+1}</div>
                <div className="relative z-10">
                   <div className="text-[#D4AF37] text-xs font-black tracking-[0.5em] mb-4">{m.name} // PHASE {i+1}</div>
                   <h4 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-[0.9] mb-4 group-hover:text-[#D4AF37] transition-colors">{m.title}</h4>
                   <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em] mb-8 italic">{m.tag}</p>
                </div>
                <div className="relative z-10">
                   <p className="text-white/60 text-xl md:text-2xl font-medium italic serif leading-relaxed border-l border-white/20 pl-6 group-hover:text-white transition-colors">
                     "{m.desc}"
                   </p>
                </div>
              </div>
            </div>
          ))}
       </div>
    </section>
  );
};

const Contact = () => (
  <section className="py-60 bg-[#001233] text-white text-center relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(212, 175, 55, .1) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, .1) 1px, transparent 1px)', backgroundSize: '150px 150px' }}></div>
    <div className="relative z-10 max-w-6xl mx-auto px-8">
       <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[1em] mb-12 block animate-pulse italic">Ready to command the Chesapeake?</span>
       <h2 className="text-7xl md:text-[15rem] font-black uppercase tracking-tighter mb-24 italic leading-[0.75]">ACTIVATE <br />ANNAPOLIS.</h2>
       <div className="flex flex-col md:flex-row justify-center gap-12">
          <a href="mailto:josephmaddox@outlook.com" className="bg-[#D4AF37] text-[#001233] px-20 py-10 text-sm font-black uppercase tracking-[0.5em] hover:bg-white transition-all transform hover:-translate-y-4 shadow-2xl flex items-center justify-center space-x-5">
             <Mail size={24} /> <span>Email Briefing</span>
          </a>
          <button className="border-4 border-white/10 hover:border-[#D4AF37] px-20 py-10 text-sm font-black uppercase tracking-[0.5em] transition-all transform hover:-translate-y-4 shadow-2xl flex items-center justify-center space-x-5">
             <FileText size={24} /> <span>Detailed Vision</span>
          </button>
       </div>
    </div>
  </section>
);

const App = () => {
  return (
    <div className="min-h-screen bg-[#001233] selection:bg-[#D4AF37] selection:text-[#001233]">
      <Navbar />
      <main>
        <Hero />
        <TheWhy />
        <TrackRecord />
        <MethodologyProtocol />
        <MissionDossiers />
        <Roadmap />
        <Contact />
      </main>
      <footer className="py-24 bg-black text-white/20 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12 text-[11px] font-black uppercase tracking-[0.6em]">
           <div className="flex items-center space-x-6">
              <Command size={24} className="text-[#D4AF37]" />
              <span className="text-white tracking-[0.4em]">Joseph Maddox</span>
           </div>
           <span>Strategic Ops Briefing © 2025 // Graduate Annapolis</span>
        </div>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
