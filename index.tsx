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
  TrendingUp,
  Target,
  Eye,
  Layers,
  Zap,
  Star,
  Home,
  Tent,
  MailQuestion,
  Heart,
  ArrowRight
} from 'lucide-react';

/**
 * useOnScreen Hook for fade-in animations
 */
function useOnScreen<T extends HTMLElement>(ref: React.RefObject<T | null>, rootMargin = '0px') {
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
}

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
          <span className="text-xl font-black tracking-[0.2em] uppercase italic text-white">JOSEPH MADDOX</span>
        </a>

        <div className="hidden lg:flex items-center space-x-10">
          {links.map(l => (
            <a key={l.name} href={l.href} className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 hover:text-[#D4AF37] transition-colors">{l.name}</a>
          ))}
          <a 
            href="#" 
            className="bg-[#D4AF37] text-[#001233] px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg rounded-sm"
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
            <a key={l.name} href={l.href} onClick={() => setMobileMenu(false)} className="text-3xl font-black uppercase italic tracking-tighter text-white">{l.name}</a>
          ))}
          <a href="#" className="text-3xl font-black uppercase italic text-[#D4AF37]">Resume</a>
          <button onClick={() => setMobileMenu(false)} className="p-4 border border-white/10 rounded-full mt-12 text-white"><X /></button>
        </div>
      )}
    </nav>
  );
};

const ProcessSection = () => {
  const steps = [
    {
      title: "SEE",
      icon: <Eye className="w-12 h-12 text-[#D4AF37]" />,
      subtitle: "Data & Cultural Intelligence",
      description: "A comprehensive audit of the hyper-local market. For Annapolis, this means mapping the Naval Academy's 12-month rhythm—from I-Day to Commissioning Week—identifying where local traditions intersect with revenue gaps."
    },
    {
      title: "SHAPE",
      icon: <Layers className="w-12 h-12 text-[#D4AF37]" />,
      subtitle: "The Activation Framework",
      description: "Transforming the physical asset into a 'living room' for the community. We design experiences, not just menus, ensuring the lobby and F&B outlets feel like an extension of the Severn River waterfront culture."
    },
    {
      title: "SELL",
      icon: <Zap className="w-12 h-12 text-[#D4AF37]" />,
      subtitle: "Community Deployment",
      description: "High-impact sales strategies that prioritize civic partnerships. We don't just wait for RFPs; we actively embed the hotel into the fabric of Annapolis heritage, driving loyalty and market share."
    }
  ];

  return (
    <section id="process" className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <FadeIn>
          <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">The Methodology</span>
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-none mb-32 text-[#001233]">THE <br />PROCESS.</h2>
        </FadeIn>
        
        <div className="space-y-32">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 200}>
              <div className="flex flex-col md:flex-row gap-12 border-t-2 border-[#001233] pt-12 group">
                <div className="flex-shrink-0 flex items-start space-x-8 md:w-1/3">
                  <div className="mt-2 group-hover:scale-110 transition-transform duration-500">{step.icon}</div>
                  <h3 className="text-7xl md:text-8xl font-black italic tracking-tighter text-[#001233]">{step.title}</h3>
                </div>
                <div className="md:w-2/3">
                  <p className="text-[#D4AF37] text-[12px] font-black uppercase tracking-[0.5em] mb-6">{step.subtitle}</p>
                  <p className="text-[#001233]/80 text-2xl leading-relaxed serif italic">
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const TemplateSection = () => {
  const items = [
    { label: "Tentpole", description: "Signature monthly event", icon: <Star className="w-5 h-5" /> },
    { label: "Outlets", description: "Activation in each venue", icon: <Home className="w-5 h-5" /> },
    { label: "Rooms", description: "Themed package", icon: <Tent className="w-5 h-5" /> },
    { label: "Email", description: "Month-specific campaign", icon: <MailQuestion className="w-5 h-5" /> },
    { label: "Charity", description: "Local partner tie-in", icon: <Heart className="w-5 h-5" /> },
    { label: "Capstone", description: "Month-ending experience", icon: <Zap className="w-5 h-5" /> }
  ];

  return (
    <section className="py-32 bg-[#f8f9fa] border-t border-[#001233]/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Standard Operating System</span>
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-none mb-4 text-[#001233]">THE MONTHLY <br />TEMPLATE.</h2>
          <p className="text-xl md:text-3xl serif italic text-[#001233]/60 mb-20">"Same structure. Different theme. Repeatable every year."</p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="group border-l-2 border-[#D4AF37]/20 pl-8 hover:border-[#D4AF37] transition-colors duration-500 bg-white p-10 shadow-sm hover:shadow-xl rounded-sm h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#001233] text-[#D4AF37] rounded-sm shadow-lg transform group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="text-3xl font-black uppercase italic tracking-tighter text-[#001233]">{item.label}</h4>
                </div>
                <p className="text-[#001233]/70 text-lg leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const MissionDossier = () => {
  const [active, setActive] = useState<number | null>(0);
  const missions = [
    {
      title: "The Community Relaunch",
      metric: "2,000+",
      role: "The Warrior Hotel, Autograph Collection",
      see: "The Warrior Hotel opened during the height of COVID — a masterpiece hidden behind masks and mandates. The building was beautiful, the brand was strong, but the community never had the chance to celebrate it. The opportunity wasn't just to relaunch a hotel — it was to reignite civic pride and reintroduce The Warrior as a symbol of Sioux City's strength and revival.",
      shape: "We began with a roundtable: What potential are we trying to actualize? The answer was clear — reconnection. The team envisioned The Warrior not as a luxury landmark standing apart, but as a gathering place standing with the city. We used the Chamber of Commerce as a bridge between business and community — transforming a single ribbon cutting into a six-week celebration of renewal.",
      sell: "For six consecutive weeks, the city came alive. Over 2,000 guests joined in the celebrations, rediscovering a place that felt both brand new and deeply familiar. $200K in auxiliary spend followed over five months. The Warrior reentered the community not through advertising, but through authentic connection.",
      images: [
        "./rooftop-party.jpg", 
        "./ribbon-lobby.jpg", 
        "./ribbon-rooftop.jpg", 
        "./live-music.jpg", 
        "./lounge-packed.jpg", 
        "./rooftop-crowd.jpg", 
        "./crowd-selfie.jpg"
      ]
    },
    {
      title: "Building Teams That Stay",
      metric: "80%",
      role: "80% Retention | 27-Point Engagement Increase",
      see: "Hospitality turnover hovers near 80% industry-wide. But behind every resignation is a person who never felt seen, never felt developed, never felt like their future was here. The potential wasn't just retention — it was transformation. What if we built a culture where people actually wanted to stay?",
      shape: "We created a multi-layered recognition and development system. Monthly: Employee of the Month with real rewards. Weekly: department-level shoutouts. Annually: service anniversary celebrations, holiday parties, summer outings. But recognition without development rings hollow. So we built career pathing infrastructure: identified high-potential associates early, created mentorship tracks, mapped clear promotion pathways.",
      sell: "Retention climbed to 80%. Leadership retention increased 24%. We promoted 8 associates internally and mentored 14 team members into supervisor and management positions. Engagement scores jumped 27 points. Teams that stay together learn together — and guests feel the difference in every interaction.",
      images: [
        "./housekeeping-week.jpg", 
        "./trolley-outing.jpg", 
        "./trolley-interior.jpg", 
        "./pizza-party.jpg", 
        "./meeting-ballroom.jpg", 
        "./certificates.jpg"
      ]
    },
    {
      title: "The Activation Engine",
      metric: "$1M+",
      role: "Campaign Driven Growth since 2022",
      see: "Hotels in regional markets don't get foot traffic by accident — they earn it. The potential wasn't to compete for the travelers already coming; it was to manufacture demand by giving people a reason to arrive in the first place. The question we asked: What if the hotel itself became the destination?",
      shape: "We built a systematic programming engine with three layers. First, recurring series that create habit and fill midweek gaps: Ladies Night every Thursday ($8K+ per event), Trivia Wednesdays, Sizzling Thursdays steak specials. Second, seasonal tentpoles: 12 Days of Christmas (200+ room nights annually), NYE Masquerade Ball (400+ guests), Valentine's couples retreats.",
      sell: "Over $1M in activation and campaign-driven revenue since 2022. Across a 4-property portfolio, 22 activations drove a 6% TRevPAR lift. The properties went from competing on rate to competing on experience. The hotel became the heartbeat of the city — not just another room to book.",
      images: [
        "./act-12days.jpg", 
        "./act-nye.jpg", 
        "./act-ladies.jpg", 
        "./act-trivia.jpg", 
        "./act-eclipse.jpg", 
        "./act-halloween.jpg", 
        "./act-football.jpg", 
        "./act-brides-night.jpg", 
        "./act-sizzling.jpg", 
        "./act-heroes.jpg", 
        "./act-skincare.jpg"
      ]
    }
  ];

  return (
    <section id="track-record" className="py-32 bg-[#001233] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Case Studies</span>
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-none mb-24 text-white">RESULTS IN <br />ACTION.</h2>
        </FadeIn>
        
        <div className="space-y-4">
          {missions.map((m, i) => (
            <div key={i} className={`border border-white/10 transition-all duration-500 overflow-hidden ${active === i ? 'bg-white/[0.03] border-[#D4AF37]' : 'hover:bg-white/[0.01]'}`}>
              <button 
                onClick={() => setActive(active === i ? null : i)}
                className="w-full text-left py-12 px-8 flex items-center justify-between group text-white"
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
                <div className="px-8 pb-16 animate-fadeIn">
                  <div className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em]">Operational Evidence</span>
                      <div className="flex items-center space-x-2 text-[#D4AF37]/50 text-[10px] font-bold uppercase tracking-widest">
                        <span>Swipe to Browse</span> <ArrowRight size={14} />
                      </div>
                    </div>
                    <div className="flex overflow-x-auto hide-scrollbar snap-x gap-6 -mx-4 px-4 pb-8">
                      {m.images.map((img, idx) => (
                        <div key={idx} className="flex-shrink-0 w-[450px] h-[350px] snap-start overflow-hidden border border-white/10 shadow-2xl rounded-sm bg-black/20">
                          <img 
                            src={img} 
                            alt={`${m.title} evidence ${idx + 1}`} 
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 transform hover:scale-105"
                            loading="lazy"
                            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=60&w=800"; }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* VERTICALLY STACKED NARRATIVE BLOCKS */}
                  <div className="max-w-4xl space-y-24">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-px bg-[#D4AF37]"></div>
                        <span className="text-[#D4AF37] text-[12px] font-black uppercase tracking-[0.6em]">SEE</span>
                      </div>
                      <p className="text-white/90 text-2xl font-medium leading-relaxed italic border-l-4 border-[#D4AF37]/20 pl-8 serif">
                        {m.see}
                      </p>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-px bg-[#D4AF37]"></div>
                        <span className="text-[#D4AF37] text-[12px] font-black uppercase tracking-[0.6em]">SHAPE</span>
                      </div>
                      <p className="text-white/90 text-2xl font-medium leading-relaxed italic border-l-4 border-[#D4AF37]/20 pl-8 serif">
                        {m.shape}
                      </p>
                    </div>
                    
                    <div className="space-y-6 bg-white/[0.03] p-12 border border-[#D4AF37]/20 relative overflow-hidden group rounded-sm">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Zap className="text-[#D4AF37] w-32 h-32" />
                      </div>
                      <div className="flex items-center space-x-4 relative z-10">
                        <div className="w-12 h-px bg-[#D4AF37]"></div>
                        <span className="text-[#D4AF37] text-[12px] font-black uppercase tracking-[0.6em]">SELL</span>
                      </div>
                      <p className="text-white text-2xl font-bold leading-relaxed italic relative z-10 serif">
                        {m.sell}
                      </p>
                    </div>
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
    <div className="min-h-screen selection:bg-[#D4AF37] selection:text-[#001233] bg-[#001233]">
      <Navbar />
      
      <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 z-10">
          <FadeIn>
            <div className="flex items-center space-x-6 mb-8">
              <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.8em]">A Strategic Vision for Graduate Annapolis</span>
              <div className="h-px w-20 bg-[#D4AF37]/30"></div>
            </div>
            <h1 className="text-7xl md:text-[13rem] font-black uppercase italic leading-[0.75] tracking-tighter mb-12 text-white">
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
      <ProcessSection />
      <TemplateSection />
      
      <MissionDossier />
      <CalendarSection />

      <section className="py-48 text-center bg-[#001233]">
        <h2 className="text-7xl md:text-[14rem] font-black italic tracking-tighter leading-[0.75] mb-20 uppercase text-white">ACTIVATE <br />ANNAPOLIS.</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 px-6">
          <a href="mailto:josephmaddox@outlook.com" className="bg-[#D4AF37] text-[#001233] px-16 py-8 text-xs font-black uppercase tracking-[0.4em] hover:bg-white transition-all shadow-2xl flex items-center justify-center space-x-4 rounded-sm">
            <Mail size={18} /> <span>Email Briefing</span>
          </a>
          <button className="border-2 border-white/10 hover:border-[#D4AF37] px-16 py-8 text-xs font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center space-x-4 text-white rounded-sm">
            <FileText size={18} /> <span>Download Resume</span>
          </button>
        </div>
      </section>

      <footer className="py-16 border-t border-white/5 bg-black text-center opacity-20 hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Joseph Maddox Strategic Ops Briefing © 2025 // Graduate Annapolis</p>
      </footer>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}