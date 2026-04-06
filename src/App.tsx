import { useEffect, useState } from 'react';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('expertise');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const observerOption = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          // Update active section state based on ID
          if (e.target.id) setActiveSection(e.target.id);
        }
      });
    }, observerOption);

    document.querySelectorAll('section[id], .reveal').forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [exp1Slide, setExp1Slide] = useState(0);
  const [exp2Slide, setExp2Slide] = useState(0);
  const [doscomSlide, setDoscomSlide] = useState(0);
  const exp1Photos = ['teknologiserverindonesia1.jpeg', 'teknologiserverindonesia2.jpeg'];
  const exp2Photos = ['rsud1.jpg', 'rsud2.jpg', 'rsud3.jpg', 'rsud4.jpeg', 'rsud5.jpeg'];
  const doscomPhotos = ['doscom2.jpeg', 'doscom3.jpeg', 'doscom4.jpeg', 'doscom5.jpeg', 'doscom6.jpeg', 'doscom7.jpeg', 'doscom8.jpeg', 'doscom9.jpeg'];

  const achievements = [
    { company: 'OpenAI', logo: 'https://logo.clearbit.com/openai.com', year: '2026', desc: 'Inducted into the OpenAI Hall of Fame for reporting valid security vulnerabilities within their infrastructure.', type: 'Hall of Fame Inductee', img: 'hof-openai.jpg' },
    { company: 'Perplexity AI', logo: 'https://logo.clearbit.com/perplexity.ai', year: '2026', desc: 'Recognized in the Perplexity AI Hall of Fame for contributing successful security bug submissions.', type: 'Hall of Fame', img: 'hof-perplexity.jpg' },
    { company: 'Samsung Mobile', logo: 'https://logo.clearbit.com/samsung.com', year: 'Bounty', desc: 'Awarded a bounty by Samsung Mobile for identifying vulnerabilities in their self-hosted bug bounty program.', type: 'Bug Bounty Award', isBounty: true, img: 'hof-samsung.jpg' },
    { company: 'Arc Browser', logo: 'https://logo.clearbit.com/arc.net', year: '2025', desc: 'Achieved the #10 spot in "The Browser of NYC" Hall of Fame for reporting multiple valid flaws in Arc Browser.', type: 'Top 10 Researcher', img: 'hof-browsercompany.webp' },
    { company: 'Brave Software', logo: 'https://logo.clearbit.com/brave.com', year: '2025', desc: 'Listed in the Brave Software Bug Hunter Hall of Fame following successful vulnerability disclosures.', type: 'Bug Hunter Hall of Fame', img: 'hof-brave.jpg' },
  ];

  const certs = [
    { cert: 'CEH', name: 'Certified Ethical Hacker', org: 'EC-Council' },
    { cert: 'CRTA', name: 'Certified Red Team Analyst', org: 'CyberWarfare Labs' },
    { cert: 'CNSP', name: 'Network Security Practitioner', org: 'The SecOps Group', img: 'CNSP.jpg' },
    { cert: 'C3SA', name: 'Cyber Security Analyst', org: 'CyberWarfare Labs', img: 'C3SA.jpg' },
    { cert: 'FCA', name: 'Fortinet Certified Associate', org: 'Fortinet', img: 'FCA.jpg' },
    { cert: 'JWD', name: 'Junior Web Developer', org: 'BNSP' },
  ];

  return (
    <div className="font-body antialiased">

      {/* ─── NAVBAR ─── */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out px-4 md:px-8 py-4 ${scrolled ? 'md:py-3' : 'md:py-6'}`}>
        <nav 
          className={`flex justify-between items-center max-w-[1400px] mx-auto px-6 h-[68px] transition-all duration-500 rounded-[2rem] 
          ${scrolled 
            ? 'bg-white/80 backdrop-blur-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-white/50 w-full' 
            : 'bg-transparent border border-transparent w-[95%]'}`}
        >
          {/* Logo Section */}
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <span className="text-white text-xl font-black font-headline relative z-10">A</span>
            </div>
            <span className="hidden sm:block text-lg font-headline font-black tracking-tight text-navy-900 group-hover:text-accent transition-colors">
              UTOMO<span className="text-accent group-hover:text-navy-900 transition-colors">.</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center bg-navy-900/5 p-1 rounded-full border border-navy-900/[0.03] backdrop-blur-md">
            {[
              { label: 'Expertise', id: 'expertise' },
              { label: 'Achievements', id: 'achievements' },
              { label: 'Experience', id: 'experience' },
              { label: 'Projects', id: 'projects' },
              { label: 'Write-ups', id: 'writeups' },
              { label: 'Credentials', id: 'credentials' }
            ].map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                className={`px-5 py-2 text-[11px] font-bold transition-all duration-300 tracking-widest uppercase rounded-full
                ${activeSection === item.id 
                  ? 'text-white bg-navy-900 shadow-lg scale-105' 
                  : 'text-navy-900/60 hover:text-navy-900 hover:bg-white'}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                // Logic untuk download file CV
                alert('Tautan Download CV akan segera aktif!');
              }}
              className="hidden md:flex items-center gap-2 text-[11px] font-black tracking-tighter text-navy-900 hover:text-accent transition-all group px-3"
            >
              <span className="material-symbols-outlined text-[18px] group-hover:translate-y-0.5 transition-transform">download</span>
              RESUME.PDF
            </a>
            
            <a 
              href="mailto:utomoa448@gmail.com" 
              className="relative px-6 py-3 bg-navy-900 text-white text-[12px] font-bold rounded-full overflow-hidden group hover:scale-105 active:scale-[0.98] transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(15,23,42,0.4)]"
            >
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
              <div className="flex items-center gap-2 relative z-10 transition-colors duration-500 group-hover:text-white">
                <span>HIRE ME</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* ─── HERO ─── */}
        <section id="expertise" className="relative pt-36 pb-24 md:pt-44 md:pb-32 px-6 bg-gradient-to-b from-surface-alt to-surface overflow-hidden">
          {/* Subtle elegant gradient flares */}
          <div className="absolute top-0 right-0 w-[45%] h-full bg-gradient-to-bl from-accent/[0.04] to-transparent rounded-bl-[120px] pointer-events-none" />
          <div className="absolute -left-[20%] top-[20%] w-[500px] h-[500px] bg-accent/[0.02] rounded-full blur-[80px]" />

          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-14 items-center relative z-10">
            <div className="lg:col-span-7 space-y-7">
              <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-border-subtle rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-navy-900 font-bold tracking-[0.15em] text-[10px] uppercase">Arya Widyanto Utomo</span>
              </div>
              <h1 className="reveal reveal-delay-1 text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] font-headline font-extrabold text-navy-900 tracking-tight leading-[1.05] drop-shadow-sm">
                Cyber Security Analyst<br className="hidden md:block" />
                <span className="text-muted font-semibold text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] tracking-normal">& Penetration Tester.</span>
              </h1>
              <p className="reveal reveal-delay-2 text-base md:text-lg text-muted max-w-lg leading-relaxed">
                Specializing in vulnerability research, incident response, and securing enterprise infrastructure. Over 2 years of experience identifying critical vulnerabilities globally.
              </p>
              <div className="reveal reveal-delay-3 flex flex-wrap gap-3 pt-1">
                {[{icon:'shield_locked',label:'Pentester'},{icon:'monitoring',label:'SOC Analyst'},{icon:'bug_report',label:'Bug Hunter'}].map((t) => (
                  <span key={t.label} className="inline-flex items-center gap-1.5 bg-white border border-border-subtle px-4 py-2 rounded-full text-xs font-semibold text-navy-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-accent/30 transition-all duration-300 cursor-default">
                    <span className="material-symbols-outlined text-accent text-[16px]" style={{fontVariationSettings:"'FILL' 1"}}>{t.icon}</span>
                    {t.label}
                  </span>
                ))}
              </div>
              <div className="reveal reveal-delay-4 flex flex-wrap items-center gap-4 pt-4">
                <a href="mailto:utomoa448@gmail.com" className="bg-navy-900 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-navy-800 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(10,16,31,0.2)] active:scale-[0.97] transition-all duration-300 flex items-center justify-center">
                  Connect With Me
                </a>
                <a href="cv-arya.pdf" download className="bg-white text-navy-900 border border-border-subtle px-8 py-3.5 rounded-full font-bold text-sm hover:bg-surface-alt hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)] active:scale-[0.97] transition-all duration-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  Download CV
                </a>
              </div>
            </div>
            
            <div className="reveal reveal-delay-3 lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center">
              <div className="relative w-full max-w-md aspect-square group">
                {/* Lighter glow behind */}
                <div className="absolute -inset-6 bg-gradient-to-tr from-accent/20 via-transparent to-gold/20 rounded-full blur-[40px] group-hover:blur-[60px] group-hover:scale-105 transition-all duration-700 pointer-events-none" />
                <div className="relative h-full w-full bg-white border-4 border-white rounded-full overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] group-hover:shadow-[0_30px_50px_-10px_rgba(0,0,0,0.2)] group-hover:-translate-y-2 transition-all duration-700">
                  <img src={`${import.meta.env.BASE_URL}profile.jpg`} alt="Arya Widyanto" className="absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-110 transition-transform duration-1000 ease-out" />
                </div>
                
                {/* Floating Premium Light Badge */}
                <div className="absolute bottom-6 -left-4 bg-white/95 backdrop-blur-xl border border-white shadow-[0_15px_30px_-5px_rgba(0,0,0,0.15)] p-3.5 pr-6 rounded-[1.5rem] flex items-center gap-4 z-20 hover:-translate-y-2 group-hover:scale-105 transition-all duration-500">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-light/40 to-yellow-100 rounded-xl flex items-center justify-center shrink-0 border border-gold/20">
                    <span className="material-symbols-outlined text-gold-dark text-2xl" style={{fontVariationSettings:"'FILL' 1"}}>workspace_premium</span>
                  </div>
                  <div>
                    <p className="text-navy-900 font-extrabold text-[15px] leading-tight font-headline">Award-Winning</p>
                    <p className="text-[10px] text-muted font-bold tracking-[0.1em] uppercase mt-0.5">Top Tier Security</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── EXPERTISE ─── */}
        <section className="py-28 px-6 bg-surface relative overflow-hidden" id="expertise">
          {/* Very faint background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.03)_1px,transparent_0)]" style={{ backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-5 mb-16 border-b border-border-subtle pb-6 relative group">
              <div className="absolute bottom-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-accent to-transparent" />
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[2px] bg-accent rounded-full group-hover:w-16 transition-all duration-500" />
                  <span className="text-accent font-bold text-[11px] tracking-[0.25em] uppercase">Core Competencies</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-black text-navy-900 tracking-tight">Security Expertise<span className="text-accent">.</span></h2>
              </div>
              <p className="text-muted text-[15px] leading-relaxed max-w-md md:text-right font-medium">
                Delivering enterprise-grade security assessments, proactive threat hunting, and rapid incident response to safeguard digital assets.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: 'policy', title: 'Web & Network Pentesting', desc: 'Comprehensive security assessments, vulnerability exploitation, and infrastructure hardening with a focus on access control and misconfigurations.' },
                { icon: 'monitoring', title: 'Incident Response & SIEM', desc: 'Continuous threat monitoring, end-to-end incident lifecycle management, and SIEM optimization to mitigate unauthorized access attempts.' },
                { icon: 'bug_report', title: 'Vulnerability Research', desc: 'Actively discovering zero-day flaws and reporting to global bug bounty programs, validating critical vulnerabilities across web and mobile.' },
              ].map((item, i) => (
                <div key={i} className={`reveal ${i > 0 ? `reveal-delay-${i}` : ''} bg-white p-10 rounded-[2rem] border border-border-subtle shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-3 transition-all duration-500 group relative overflow-hidden`}>
                  
                  {/* Subtle top accent line */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="w-14 h-14 bg-surface-alt rounded-[1.2rem] flex items-center justify-center mb-8 border border-border-subtle group-hover:bg-accent/10 group-hover:border-accent/30 group-hover:scale-110 transition-all duration-500">
                    <span className="material-symbols-outlined text-[28px] text-navy-600 group-hover:text-accent transition-colors duration-500" style={{fontVariationSettings:"'FILL' 0"}}>{item.icon}</span>
                  </div>
                  
                  <h3 className="text-2xl font-extrabold mb-4 font-headline text-navy-900 group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                  <p className="text-muted text-[15px] leading-relaxed relative z-10">{item.desc}</p>
                  
                  {/* Glowing backdrop on hover */}
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/[0.02] rounded-full blur-2xl group-hover:bg-accent/[0.08] transition-colors duration-500 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── HALL OF FAME ─── */}
        <section className="py-28 px-6 bg-navy-950 text-white" id="achievements">
          <div className="max-w-7xl mx-auto">
            <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-5 mb-14 border-b border-white/10 pb-6 relative group">
              <div className="absolute bottom-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-gold to-transparent" />
              <div className="max-w-2xl text-left">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[2px] bg-gold rounded-full group-hover:w-16 transition-all duration-500" />
                  <span className="text-gold font-bold text-[11px] tracking-[0.25em] uppercase">Security Recognition</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-black text-white tracking-tight">Hall of Fame<span className="text-gold">.</span></h2>
              </div>
              <p className="text-muted-light text-[15px] leading-relaxed max-w-md md:text-right font-medium text-left">
                Recognized by world-class tech companies for identifying and responsibly disclosing critical security vulnerabilities.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.map((a, i) => (
                <div key={i} className={`reveal ${i > 0 ? `reveal-delay-${Math.min(i, 5)}` : ''} relative group rounded-[2rem] overflow-visible flex flex-col transition-all duration-500 hover:-translate-y-3 hover:-translate-x-1 hover:shadow-[-25px_25px_50px_-15px_rgba(0,0,0,0.8),inset_0_2px_15px_rgba(255,255,255,0.15)] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] border-t border-l border-white/10 hover:border-white/30 border-r border-b border-black/40 bg-navy-900/90 backdrop-blur-3xl`}>
                  
                  {/* 3D Physical Ribbon Flag */}
                  <div className="absolute top-6 -right-3 z-30 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-105 transition-all duration-500 flex flex-col">
                     <div className={`relative flex items-center gap-2 pl-4 pr-6 py-2 shadow-[-10px_10px_20px_rgba(0,0,0,0.4)] border-y border-l rounded-l-lg overflow-hidden ${a.isBounty ? 'bg-gradient-to-r from-emerald-600 to-emerald-400 border-emerald-300 text-white' : 'bg-gradient-to-r from-yellow-600 to-yellow-400 border-yellow-200 text-white'}`}>
                        {/* Shine Effect in Ribbon */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                        <span className={`w-2 h-2 rounded-full animate-pulse shadow-lg ${a.isBounty ? 'bg-emerald-100' : 'bg-yellow-100'}`} />
                        <span className="font-headline font-black text-[12px] tracking-[0.2em] uppercase drop-shadow-md relative z-10">
                           {a.year}
                        </span>
                     </div>
                     {/* The realistic ribbon folded tail */}
                     <div className={`w-3 h-3 self-end clip-path-polygon-[100%_0,0_0,0_100%] brightness-50 ${a.isBounty ? 'bg-emerald-700' : 'bg-yellow-700'}`} style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
                  </div>

                  {/* Full Card Image presentation */}
                  <div className="w-full aspect-[16/10] relative overflow-hidden rounded-t-[2rem]">
                    <img src={a.img} alt={a.company} className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out" />
                    
                    {/* Dramatic Gradients for 3D depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent z-10" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-tr from-transparent via-white/80 w-[200%] to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 z-10 mix-blend-overlay" />
                    <div className="absolute inset-0 shadow-[inset_0_-20px_40px_rgba(0,0,0,0.8)] z-10 pointer-events-none" />
                  </div>

                  {/* Content Area */}
                  <div className="p-8 pt-0 flex flex-col flex-grow relative z-20">
                    <h3 className="font-headline font-extrabold text-[28px] mb-3 text-white drop-shadow-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-300 transform group-hover:translate-x-1">{a.company}</h3>
                    <p className="text-white/60 text-[15px] leading-relaxed flex-grow drop-shadow-sm">{a.desc}</p>
                    
                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-start group-hover:border-white/20 transition-colors duration-300">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white/40 uppercase tracking-[0.25em] mb-1 font-semibold block transition-colors group-hover:text-white/60">Achievement Class</span>
                        <div className="flex items-center gap-2">
                           <span className="material-symbols-outlined text-[16px] text-white/40 group-hover:text-white/80" style={{fontVariationSettings:"'FILL' 1"}}>{a.isBounty ? 'verified_user' : 'military_tech'}</span>
                           <span className={`text-[13px] font-bold uppercase tracking-widest ${a.isBounty ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-gold group-hover:text-yellow-300'} transition-colors`}>{a.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Enhanced 6th Card */}
              <div className="reveal reveal-delay-5 relative group rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-3 hover:-translate-x-1 hover:shadow-[-25px_25px_50px_-15px_rgba(0,0,0,0.8),inset_0_2px_15px_rgba(255,255,255,0.15)] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] border-t border-l border-white/10 hover:border-accent/40 border-r border-b border-black/40 bg-navy-900/90 backdrop-blur-3xl items-center justify-center text-center p-10 min-h-[400px]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.15),transparent_60%)] opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Simulated Radar/Scanning lines */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse shadow-[0_0_20px_#38bdf8]" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative w-28 h-28 mb-8 flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-700">
                    <div className="absolute inset-0 rounded-[2.5rem] bg-accent/20 border border-accent/30 rotate-12 group-hover:rotate-[60deg] transition-transform duration-700 shadow-[0_0_40px_rgba(56,189,248,0.2)]" />
                    <div className="absolute inset-0 rounded-[2.5rem] bg-accent/20 border border-accent/30 -rotate-12 group-hover:-rotate-[60deg] transition-transform duration-700 shadow-[0_0_40px_rgba(56,189,248,0.2)]" />
                    <span className="material-symbols-outlined text-[48px] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] relative z-10" style={{fontVariationSettings:"'FILL' 1"}}>public</span>
                  </div>
                  
                  <h3 className="font-headline font-extrabold text-[5rem] mb-1 text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] leading-none tracking-tighter group-hover:scale-110 transition-transform duration-500">5+</h3>
                  <div className="w-12 h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mb-5 mt-3 group-hover:w-20 transition-all duration-500 opacity-60 group-hover:opacity-100" />
                  <p className="text-accent font-black text-sm tracking-[0.3em] uppercase mb-4 drop-shadow-md">Global Programs</p>
                  <p className="text-white/60 text-[15px] leading-relaxed max-w-[260px] group-hover:text-white/80 transition-colors">Proven track record across leading international bug bounty platforms worldwide.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── EXPERIENCE ─── */}
        <section className="py-28 px-6 bg-surface-alt" id="experience">
          <div className="max-w-7xl mx-auto">
            <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-5 mb-14 border-b border-border-subtle pb-6 relative group">
              <div className="absolute bottom-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-accent to-transparent" />
              <div className="max-w-2xl text-left">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[2px] bg-accent rounded-full group-hover:w-16 transition-all duration-500" />
                  <span className="text-accent font-bold text-[11px] tracking-[0.25em] uppercase">Professional</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-black text-navy-900 tracking-tight">Work Experience<span className="text-accent">.</span></h2>
              </div>
              <p className="text-muted text-[15px] leading-relaxed max-w-md md:text-right font-medium">
                A proven operational history of identifying critical risks and mitigating advanced threats in production environments.
              </p>
            </div>
            <div className="space-y-8">
              {/* Exp 1 */}
              <div className="reveal bg-white rounded-[2.5rem] p-3 md:p-5 border border-border-subtle shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-700 relative group overflow-hidden">
                {/* Decorative backdrop glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                {/* Photo Carousel Art Frame */}
                <div className="relative w-full aspect-[4/3] md:aspect-[3/2] bg-surface-alt rounded-[2rem] overflow-hidden shadow-inner group-hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] transition-shadow duration-500">
                  <div className="absolute inset-0 flex items-center justify-center text-border-subtle z-[1]">
                    <span className="material-symbols-outlined text-3xl">photo_library</span>
                    <p className="ml-2 text-xs font-medium text-muted">Dokumentasi Kerja ({exp1Slide + 1}/{exp1Photos.length})</p>
                  </div>
                  
                  {/* Smooth Sliding Track */}
                  <div className="absolute inset-0 flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-10" style={{ transform: `translateX(-${exp1Slide * 100}%)` }}>
                    {exp1Photos.map((src, i) => (
                      <div key={i} className="min-w-full h-full relative overflow-hidden">
                        <img src={src} alt={`TSI Doc ${i+1}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                      </div>
                    ))}
                  </div>

                  {exp1Photos.length > 1 && (
                    <>
                      <button onClick={() => setExp1Slide((p) => (p - 1 + exp1Photos.length) % exp1Photos.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/40 hover:bg-white/90 backdrop-blur-md border border-white/50 shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-center transition-all duration-300 hover:scale-110">
                        <span className="material-symbols-outlined text-navy-900 text-[20px]">chevron_left</span>
                      </button>
                      <button onClick={() => setExp1Slide((p) => (p + 1) % exp1Photos.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/40 hover:bg-white/90 backdrop-blur-md border border-white/50 shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-center transition-all duration-300 hover:scale-110">
                        <span className="material-symbols-outlined text-navy-900 text-[20px]">chevron_right</span>
                      </button>
                      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 p-2 bg-black/20 backdrop-blur-md rounded-full border border-white/20">
                        {exp1Photos.map((_, idx) => (<button key={idx} onClick={() => setExp1Slide(idx)} className={`h-1.5 rounded-full outline-none transition-all duration-500 shadow-sm ${idx === exp1Slide ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'}`} />))}
                      </div>
                      {/* Subtle Vignette Overlay for premium look */}
                      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent z-[15] pointer-events-none mix-blend-overlay" />
                    </>
                  )}
                </div>
                
                {/* Content Area */}
                <div className="p-6 md:p-8 lg:p-10 relative z-10">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
                    <div className="w-full">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-6 h-px bg-accent" />
                        <h4 className="text-[11px] text-accent font-black tracking-[0.2em] uppercase">PT. Teknologi Server Indonesia</h4>
                      </div>
                      <h3 className="text-2xl md:text-3xl lg:text-[2rem] font-headline font-black text-navy-900 tracking-tight leading-tight group-hover:text-accent transition-colors duration-500">
                        Penetration Tester & SOC Analyst
                      </h3>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-surface-alt border border-border-subtle rounded-xl text-navy-800 font-bold text-xs tracking-wider uppercase shadow-sm">
                      <span className="material-symbols-outlined text-[16px] text-accent">schedule</span>
                      Jul 2025 – Sep 2025
                    </span>
                  </div>

                  <ul className="grid md:grid-cols-3 gap-5 text-muted text-[14px] leading-relaxed">
                    {[
                      { icon: 'shield_locked', text: 'Managed end-to-end incident response for crypto-mining bot infections, isolating threats and restoring integrity.' },
                      { icon: 'bug_report', text: 'Identified 12+ critical vulnerabilities on a production platform during pre-launch testing assessments.' },
                      { icon: 'monitoring', text: 'Maintained continuous security monitoring for 5+ enterprise servers using advanced SIEM configurations.' }
                    ].map((item, i) => (
                      <li key={i} className="flex flex-col gap-3 items-start bg-white p-5 rounded-2xl border border-surface-alt hover:border-border-subtle hover:bg-surface-alt/30 transition-colors duration-300 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
                        <div className="w-10 h-10 bg-accent/5 border border-accent/10 rounded-xl flex items-center justify-center text-accent mb-1 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                          <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings:"'FILL' 0"}}>{item.icon}</span>
                        </div>
                        <span className="font-medium text-navy-900/80">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Exp 2 */}
              <div className="reveal reveal-delay-1 bg-white rounded-[2.5rem] p-3 md:p-5 border border-border-subtle shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-700 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="relative w-full aspect-[4/3] md:aspect-[3/2] bg-surface-alt rounded-[2rem] overflow-hidden shadow-inner group-hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] transition-shadow duration-500">
                  <div className="absolute inset-0 flex items-center justify-center text-border-subtle z-[1]">
                    <span className="material-symbols-outlined text-3xl">photo_library</span>
                    <p className="ml-2 text-xs font-medium text-muted">Dokumentasi Kerja ({exp2Slide + 1}/{exp2Photos.length})</p>
                  </div>
                  
                  {/* Smooth Sliding Track */}
                  <div className="absolute inset-0 flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-10" style={{ transform: `translateX(-${exp2Slide * 100}%)` }}>
                    {exp2Photos.map((src, i) => (
                      <div key={i} className="min-w-full h-full relative overflow-hidden">
                        <img src={src} alt={`RSUD Doc ${i+1}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                      </div>
                    ))}
                  </div>

                  {exp2Photos.length > 1 && (
                    <>
                      <button onClick={() => setExp2Slide((p) => (p - 1 + exp2Photos.length) % exp2Photos.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/40 hover:bg-white/90 backdrop-blur-md border border-white/50 shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-center transition-all duration-300 hover:scale-110">
                        <span className="material-symbols-outlined text-navy-900 text-[20px]">chevron_left</span>
                      </button>
                      <button onClick={() => setExp2Slide((p) => (p + 1) % exp2Photos.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/40 hover:bg-white/90 backdrop-blur-md border border-white/50 shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-center transition-all duration-300 hover:scale-110">
                        <span className="material-symbols-outlined text-navy-900 text-[20px]">chevron_right</span>
                      </button>
                      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 p-2 bg-black/20 backdrop-blur-md rounded-full border border-white/20">
                        {exp2Photos.map((_, idx) => (<button key={idx} onClick={() => setExp2Slide(idx)} className={`h-1.5 rounded-full outline-none transition-all duration-500 shadow-sm ${idx === exp2Slide ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'}`} />))}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent z-[15] pointer-events-none mix-blend-overlay" />
                    </>
                  )}
                </div>
                
                <div className="p-6 md:p-8 lg:p-10 relative z-10">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
                    <div className="w-full">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-6 h-px bg-accent" />
                        <h4 className="text-[11px] text-accent font-black tracking-[0.2em] uppercase">RSUD RAA Soewondo Pati</h4>
                      </div>
                      <h3 className="text-2xl md:text-3xl lg:text-[2rem] font-headline font-black text-navy-900 tracking-tight leading-tight group-hover:text-accent transition-colors duration-500">
                        Penetration Tester
                      </h3>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-surface-alt border border-border-subtle rounded-xl text-navy-800 font-bold text-xs tracking-wider uppercase shadow-sm">
                      <span className="material-symbols-outlined text-[16px] text-accent">schedule</span>
                      Jan 2025 – Mar 2025
                    </span>
                  </div>

                  <ul className="grid md:grid-cols-3 gap-5 text-muted text-[14px] leading-relaxed">
                    {[
                      { icon: 'manage_search', text: 'Conducted in-depth security assessments on internal servers, identifying 15+ exploitable vulnerabilities and effectively reducing the attack surface.' },
                      { icon: 'database', text: 'Secured critical healthcare data by isolating and validating leaked database credentials within the internal network.' },
                      { icon: 'hub', text: 'Designed and developed a complete secure network topology for the hospital’s operational and administrative needs.' }
                    ].map((item, i) => (
                      <li key={i} className="flex flex-col gap-3 items-start bg-white p-5 rounded-2xl border border-surface-alt hover:border-border-subtle hover:bg-surface-alt/30 transition-colors duration-300 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
                        <div className="w-10 h-10 bg-accent/5 border border-accent/10 rounded-xl flex items-center justify-center text-accent mb-1 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                          <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings:"'FILL' 0"}}>{item.icon}</span>
                        </div>
                        <span className="font-medium text-navy-900/80">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── EDUCATION & LEADERSHIP ─── */}
        <section className="py-28 px-6 bg-surface" id="education">
          <div className="max-w-7xl mx-auto">
            <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-5 mb-14 border-b border-border-subtle pb-6 relative group">
              <div className="absolute bottom-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-accent to-transparent" />
              <div className="max-w-2xl text-left">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[2px] bg-accent rounded-full group-hover:w-16 transition-all duration-500" />
                  <span className="text-accent font-bold text-[11px] tracking-[0.25em] uppercase">Academic</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-black text-navy-900 tracking-tight">Education & Leadership<span className="text-accent">.</span></h2>
              </div>
              <p className="text-muted text-[15px] leading-relaxed max-w-md md:text-right font-medium">
                Academic foundation and community involvement shaping a security-first mindset.
              </p>
            </div>
              <div className="reveal relative rounded-[2.5rem] p-[1.5px] bg-gradient-to-br from-border-subtle via-white to-accent/30 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_100px_-20px_rgba(56,189,248,0.2)] flex flex-col group transition-all duration-1000 hover:-translate-y-2 z-10">
                <div className="absolute inset-[1.5px] bg-white z-0 rounded-[2.4rem] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]" />
                <div className="relative z-10 flex flex-col grow overflow-hidden rounded-[2.4rem]">
                
                {/* ── TOP: Ultra-wide Photo Carousel ── */}
                <div className="w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9] bg-surface-alt relative overflow-hidden flex items-center justify-center border-b border-border-subtle">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-border-subtle z-[1] bg-surface-alt">
                    <span className="material-symbols-outlined text-4xl mb-2">add_photo_alternate</span>
                    <p className="text-[11px] font-bold tracking-wider uppercase text-muted">Documentation Journey</p>
                  </div>
                  
                  {/* Smooth Sliding Track */}
                  <div className="absolute inset-0 flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-10" style={{ transform: `translateX(-${doscomSlide * 100}%)` }}>
                    {doscomPhotos.map((src, i) => (
                      <div key={i} className="min-w-full h-full relative overflow-hidden">
                        <img src={src} alt={`Documentation ${i+1}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                      </div>
                    ))}
                  </div>

                  {doscomPhotos.length > 1 && (
                    <>
                      <button onClick={() => setDoscomSlide((p) => (p - 1 + doscomPhotos.length) % doscomPhotos.length)} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/40 hover:bg-white/90 backdrop-blur-md border border-white/50 shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-center transition-all duration-300 hover:scale-110">
                        <span className="material-symbols-outlined text-navy-900 text-[20px]">chevron_left</span>
                      </button>
                      <button onClick={() => setDoscomSlide((p) => (p + 1) % doscomPhotos.length)} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/40 hover:bg-white/90 backdrop-blur-md border border-white/50 shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-center transition-all duration-300 hover:scale-110">
                        <span className="material-symbols-outlined text-navy-900 text-[20px]">chevron_right</span>
                      </button>
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 p-1.5 bg-black/20 backdrop-blur-md rounded-full border border-white/20">
                        {doscomPhotos.map((_, idx) => (<button key={idx} onClick={() => setDoscomSlide(idx)} className={`h-1.5 rounded-full outline-none transition-all duration-500 shadow-sm ${idx === doscomSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'}`} />))}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent z-[15] pointer-events-none mix-blend-overlay" />
                    </>
                  )}
                </div>

                {/* ── BOTTOM: Split Content Area ── */}
                <div className="flex flex-col lg:flex-row relative z-20 bg-white/70 backdrop-blur-xl">
                  
                  {/* Left Column: DOSCOM */}
                  <div className="p-8 md:p-12 lg:w-1/2 flex flex-col items-start relative group/col1 transition-all duration-700 hover:bg-white/90">
                    <div className="absolute right-0 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-border-subtle to-transparent hidden lg:block" />
                    
                    <div className="w-20 h-20 bg-gradient-to-br from-white to-surface rounded-[1.5rem] border border-white/80 ring-1 ring-border-subtle/40 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center mb-8 relative group/logo overflow-hidden transition-all duration-700 shrink-0 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-5px_rgba(56,189,248,0.15)] hover:ring-accent/40">
                      <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 to-accent/10 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-700" />
                      <img src="/doscom1.png" alt="DOSCOM Logo" className="absolute inset-0 w-full h-full object-contain p-2 scale-110 z-10 bg-transparent mix-blend-darken" />
                    </div>

                    <span className="inline-flex px-4 py-1.5 bg-gradient-to-r from-navy-900 to-navy-800 text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-5 rounded-full shadow-md shadow-navy-900/20 border border-white/10">Community Leadership</span>
                    <h3 className="text-2xl lg:text-[2rem] font-black font-headline text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-700 mb-2 leading-tight group-hover/col1:from-accent group-hover/col1:to-accent/70 transition-all duration-700">Dinus Open Source Community</h3>
                    <h4 className="text-[13px] md:text-[15px] text-muted mb-6 font-medium bg-surface-alt/70 px-4 py-2 rounded-xl inline-flex items-center gap-2 border border-border-subtle/40"><span className="material-symbols-outlined text-[16px] text-accent">badge</span> Network Division Coordinator</h4>
                    
                    <div className="flex flex-col w-full flex-1 mt-4 gap-4 lg:gap-5 justify-between">
                      <div className="bg-gradient-to-r from-surface to-white p-5 lg:p-6 rounded-[1.25rem] border border-white/80 ring-1 ring-border-subtle/40 shadow-[0_5px_15px_rgba(0,0,0,0.03)] flex flex-row items-center gap-4 lg:gap-5 group/item hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-5px_rgba(56,189,248,0.1)] transition-all duration-500 cursor-default flex-1">
                        <div className="w-12 h-12 bg-accent/5 rounded-[0.85rem] border border-accent/10 flex items-center justify-center shrink-0 group-hover/item:bg-accent group-hover/item:border-accent transition-all duration-500">
                          <span className="material-symbols-outlined text-[22px] text-accent group-hover/item:text-white transition-colors duration-500">groups</span>
                        </div>
                        <p className="text-[13.5px] md:text-[14.5px] text-muted font-medium leading-snug pr-2">Led a technical team of <span className="text-navy-900 font-extrabold">10+ members</span> executing 5+ internal workshops.</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-surface to-white p-5 lg:p-6 rounded-[1.25rem] border border-white/80 ring-1 ring-border-subtle/40 shadow-[0_5px_15px_rgba(0,0,0,0.03)] flex flex-row items-center gap-4 lg:gap-5 group/item hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-5px_rgba(56,189,248,0.1)] transition-all duration-500 cursor-default flex-1">
                        <div className="w-12 h-12 bg-accent/5 rounded-[0.85rem] border border-accent/10 flex items-center justify-center shrink-0 group-hover/item:bg-accent group-hover/item:border-accent transition-all duration-500">
                          <span className="material-symbols-outlined text-[22px] text-accent group-hover/item:text-white transition-colors duration-500">co_present</span>
                        </div>
                        <p className="text-[13.5px] md:text-[14.5px] text-muted font-medium leading-snug pr-2">Mentored <span className="text-navy-900 font-extrabold">20+ public participants</span> in Web Pentesting & OSINT bootcamps.</p>
                      </div>

                      <div className="bg-gradient-to-r from-surface to-white p-5 lg:p-6 rounded-[1.25rem] border border-white/80 ring-1 ring-border-subtle/40 shadow-[0_5px_15px_rgba(0,0,0,0.03)] flex flex-row items-center gap-4 lg:gap-5 group/item hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-5px_rgba(56,189,248,0.1)] transition-all duration-500 cursor-default flex-1">
                        <div className="w-12 h-12 bg-accent/5 rounded-[0.85rem] border border-accent/10 flex items-center justify-center shrink-0 group-hover/item:bg-accent group-hover/item:border-accent transition-all duration-500">
                          <span className="material-symbols-outlined text-[22px] text-accent group-hover/item:text-white transition-colors duration-500">code_blocks</span>
                        </div>
                        <p className="text-[13.5px] md:text-[14.5px] text-muted font-medium leading-snug pr-2">Managed <span className="text-navy-900 font-extrabold">3 open-source projects</span>: Recon, CTF Platform, & BadUSB.</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Universitas Dian Nuswantoro */}
                  <div className="p-8 md:p-12 lg:w-1/2 flex flex-col items-start relative group/col2 transition-all duration-700 hover:bg-white/90">
                    <div className="w-20 h-20 bg-gradient-to-br from-white to-surface rounded-[1.5rem] border border-white/80 ring-1 ring-border-subtle/40 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center mb-8 relative group/logo overflow-hidden transition-all duration-700 shrink-0 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-5px_rgba(56,189,248,0.15)] hover:ring-accent/40">
                      <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 to-accent/10 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-700" />
                      <img src={`${import.meta.env.BASE_URL}/udinus.png`} alt="Universitas Dian Nuswantoro Logo" className="absolute inset-0 w-full h-full object-contain p-3 z-10 bg-transparent mix-blend-multiply" />
                    </div>

                    <span className="inline-flex px-4 py-1.5 bg-surface-alt border border-white/50 ring-1 ring-border-subtle/30 text-navy-900 text-[10px] font-bold tracking-[0.2em] uppercase mb-5 rounded-full shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] backdrop-blur-md">Academic Background</span>
                    <h3 className="text-2xl lg:text-[2rem] font-black font-headline text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-700 mb-2 leading-tight group-hover/col2:from-accent group-hover/col2:to-accent/70 transition-all duration-700">Universitas Dian Nuswantoro</h3>
                    <h4 className="text-[13px] md:text-[15px] text-muted mb-8 font-medium bg-surface-alt/70 px-4 py-2 rounded-xl inline-flex items-center gap-2 border border-border-subtle/40"><span className="material-symbols-outlined text-[16px] text-accent">school</span> Bachelor's Degree <span className="font-semibold text-navy-900 ml-1">in Informatic Eng.</span></h4>
                    
                    <div className="flex flex-col gap-3 w-full mb-8">
                      <div className="bg-gradient-to-r from-surface to-white p-4 rounded-[1.25rem] border border-white/80 ring-1 ring-border-subtle/40 shadow-[0_5px_15px_rgba(0,0,0,0.03)] flex items-center gap-4 group/item hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-5px_rgba(56,189,248,0.1)] transition-all duration-500 cursor-default">
                        <div className="w-11 h-11 bg-accent/5 rounded-[0.85rem] border border-accent/10 flex items-center justify-center shrink-0 group-hover/item:bg-accent group-hover/item:border-accent transition-all duration-500">
                          <span className="material-symbols-outlined text-[20px] text-accent group-hover/item:text-white transition-colors duration-500">monitoring</span>
                        </div>
                        <p className="text-[13px] md:text-[14px] text-muted font-medium leading-snug pr-2">Maintained strong academic performance securing a <span className="text-navy-900 font-extrabold">GPA of 3.40 / 4.00</span>.</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-surface to-white p-4 rounded-[1.25rem] border border-white/80 ring-1 ring-border-subtle/40 shadow-[0_5px_15px_rgba(0,0,0,0.03)] flex items-center gap-4 group/item hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-5px_rgba(56,189,248,0.1)] transition-all duration-500 cursor-default">
                        <div className="w-11 h-11 bg-accent/5 rounded-[0.85rem] border border-accent/10 flex items-center justify-center shrink-0 group-hover/item:bg-accent group-hover/item:border-accent transition-all duration-500">
                          <span className="material-symbols-outlined text-[20px] text-accent group-hover/item:text-white transition-colors duration-500">calendar_month</span>
                        </div>
                        <p className="text-[13px] md:text-[14px] text-muted font-medium leading-snug pr-2">Active undergraduate academic period from <span className="text-navy-900 font-extrabold">Sep 2022 – Apr 2026</span>.</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-white to-surface relative p-7 lg:p-8 rounded-[2rem] border border-white/80 ring-1 ring-border-subtle/40 mt-auto w-full transition-all duration-700 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] group/pub hover:shadow-[0_25px_50px_-20px_rgba(56,189,248,0.2)] hover:ring-accent/30 hover:-translate-y-2 overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/5 rounded-full blur-[40px] pointer-events-none group-hover/pub:bg-accent/10 transition-colors duration-500" />
                      <span className="material-symbols-outlined text-accent/20 text-4xl absolute -right-2 -bottom-2 pointer-events-none rotate-[-15deg] group-hover/pub:rotate-0 transition-transform duration-500">local_library</span>
                      <p className="text-[13px] text-muted leading-relaxed font-medium relative z-10 pr-6">
                        Authored the research journal <br/><span className="text-navy-900 font-bold italic block mt-1">"Analisis Tripartit Keamanan Docker: Evaluasi Metode Deteksi Kerentanan, Registry, dan Layanan"</span>
                      </p>
                      <a href="https://doi.org/10.33364/algoritma/v.22-2.2983" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-accent hover:text-navy-900 transition-colors relative z-10 w-fit group/btn">
                        View Publication <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform">arrow_outward</span>
                      </a>
                    </div>
                  </div>
                </div>
                </div>
              </div>
          </div>
        </section>

        {/* ─── TRAINING CERTIFICATES ─── */}
        <section className="py-28 px-6 bg-surface-alt" id="training">
          <div className="max-w-7xl mx-auto">
            <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-5 mb-14 border-b border-border-subtle pb-6 relative group">
              <div className="absolute bottom-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-accent to-transparent" />
              <div className="max-w-2xl text-left">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[2px] bg-accent rounded-full group-hover:w-16 transition-all duration-500" />
                  <span className="text-accent font-bold text-[11px] tracking-[0.25em] uppercase">Professional Development</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-black text-navy-900 tracking-tight">Bootcamp & Course<span className="text-accent">.</span></h2>
              </div>
              <p className="text-muted text-[15px] leading-relaxed max-w-md md:text-right font-medium">
                Continuous learning through specialized cybersecurity training programs and workshops.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Certified Ethical Hacker Academy', org: 'Metrodata', date: '2026', desc: 'Intensive academy program covering advanced ethical hacking techniques, vulnerability assessment, and comprehensive penetration testing methodologies.' },
                { title: 'SOC Analyst L1', org: 'TryHackMe', date: '2026', desc: 'Hands-on defensive security training focusing on threat monitoring, triage execution, SIEM utilization, and practical incident response techniques via interactive learning labs.' },
                { title: 'Penetration Testing', org: 'Redlimit - Meta4sec', date: '2025', desc: 'Training for website penetration, learning several information gathering techniques, recon, and various types of attacks with a bug hunting approach and best practice exploitation.', img: '/Penetration Testing - Redlimit.jpg' },
                { title: 'Web Security Academy', org: 'PortSwigger', date: '2025', desc: 'Advanced hands-on web vulnerability training covering complex attack vectors like SQLi, XSS, CSRF, and Server-Side Request Forgery developed by industry experts.', img: '/Web Security Academy  - Portswigger.png' },
                { title: 'Advanced Cyber Security - Threats and Governance', org: 'Great Learning', date: '2024', desc: 'Focused on understanding complex cyber threats, assessing risks, implementing governance frameworks, and aligning security operations with business objectives at a strategic level.', img: '/Advanced Cyber Security Threats and Governance  -  Great Learning.jpg' },
                { title: 'Junior SOC Analyst', org: 'Kominfo', date: '2024', desc: 'Training to understand SOC operations including traffic analysis with Wireshark, log analysis, and the use of Kibana/Elastic based on Cisco Cyber Associate standards.', img: '/Junior SOC Analyst - Kominfo.jpg' },
                { title: 'SOC Analyst L1', org: 'Jadi Hacker', date: '2024', desc: 'Practical training on SOC Tier 1 methodologies, covering traffic analysis via Wireshark, advanced log analysis, and Wazuh deployment.', img: '/SOC L1 - Jadi Hackers.jpg' },
                { title: 'Cyber Threat Management', org: 'Cisco Networking Academy', date: '2024', desc: 'Advanced principles of threat management, covering continuous monitoring, proactive incident response, and strategic risk evaluation to maintain robust cybersecurity.', img: '/Cyber Threat Management - Cisco.jpg' },
                { title: 'Endpoint Security', org: 'Cisco Networking Academy', date: '2024', desc: 'Comprehensive training on securing endpoints against advanced threats, focusing on malwares, host-based intrusions, and effective mitigation strategies.', img: '/Endpoint Security  - Cisco.jpg' },
                { title: 'Network Defense', org: 'Cisco Networking Academy', date: '2024', desc: 'In-depth course on designing structured network defense mechanisms, securing network perimeters, and thwarting attacks targeting enterprise infrastructures.', img: '/Network Defense - Cisco.jpg' },
                { title: 'OSINT Analyst', org: 'Cyber Academy Indonesia', date: '2024', desc: 'Comprehensive training to conduct deep-dive investigations and intelligence gathering on open-source platforms.', img: '/Osint Analyst - Cyber Academy.jpg' },
                { title: 'Web Penetration Testing', org: 'Jadi Hacker', date: '2023', desc: 'Basic to intermediate training for website penetration covering information gathering, recon techniques, diverse attack vectors, up to the reporting stage.', img: '/Web Pentesting - Jadi Hacker.jpg' },
                { title: 'CCNA 200-301', org: 'ID-Networkers', date: '2023', desc: 'Network engineering training designed to deepen the understanding and configuration of Cisco network devices based on CCNA 200-301 standards.', img: '/CCNA 200-301  - ID Networkers.jpg' },
                { title: 'Computer Network Basic', org: 'ITBOX', date: '2023', desc: 'Fundamental networking concepts encompassing basic network topologies, communication protocols, IP addressing, and fundamental infrastructure troubleshooting.', img: '/Computer  Network - ITBOX.jpg' },
                { title: 'Cyber Security Basic', org: 'ITBOX', date: '2023', desc: 'Foundational cybersecurity course covering core concepts of information security, threat landscapes, basic access controls, and essential security hygiene.', img: '/Cyber Security Basic - ITBOX.jpg' },
              ].map((item, i) => {
                const isBootcamp = ['ID-Networkers', 'Cyber Academy Indonesia', 'Jadi Hacker', 'Metrodata', 'Redlimit - Meta4sec', 'Kominfo'].includes(item.org);
                return (
                <div key={i} className={`reveal ${i > 0 ? `reveal-delay-${Math.min((i%3), 2)}` : ''} relative p-2 bg-white rounded-[2.5rem] border border-border-subtle shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] hover:border-accent/30 overflow-hidden flex flex-col group transition-all duration-700 hover:-translate-y-2`}>
                  
                  {/* Backdrop Glow */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* 3D Showcase Image Frame */}
                  <div className="w-full aspect-[4/3] bg-gradient-to-br from-surface to-surface-alt rounded-[2rem] overflow-hidden flex items-center justify-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] relative ring-1 ring-border-subtle/50 group-hover:ring-accent/20 transition-all duration-500">
                    

                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.03)_1px,transparent_0)]" style={{backgroundSize: '20px 20px'}} />
                    
                    {item.img ? (
                      <div className="relative w-full h-full p-4 md:p-6 flex items-center justify-center">
                         {/* Subtle shadow matching the image bounds using drop-shadow on the image itself */}
                         <img src={`${import.meta.env.BASE_URL}${item.img}`} alt={item.title} className="w-full h-full object-contain relative z-10 drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] group-hover:scale-110 group-hover:drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-navy-900/40 group-hover:text-accent/60 transition-colors z-10 relative">
                        <span className="material-symbols-outlined text-[3.5rem] mb-2 drop-shadow-sm group-hover:scale-110 transition-transform duration-500" style={{fontVariationSettings:"'FILL' 1"}}>workspace_premium</span>
                        <p className="text-[11px] font-bold tracking-[0.2em] uppercase drop-shadow-sm">Certificate Pending</p>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/[0.03] to-transparent pointer-events-none" />
                  </div>

                  {/* Content Layout */}
                  <div className="px-5 py-7 md:px-7 flex flex-col flex-grow relative z-20">
                    <div className="flex flex-col gap-3 mb-5">
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-1 text-[9px] uppercase font-black tracking-[0.15em] rounded border shadow-sm flex items-center gap-1.5 w-max ${
                          isBootcamp ? 'bg-accent/10 text-accent border-accent/20' : 'bg-surface-alt text-navy-600 border-border/60'
                        }`}>
                          <span className="material-symbols-outlined text-[14px]">{isBootcamp ? 'local_fire_department' : 'menu_book'}</span>
                          {isBootcamp ? 'BOOTCAMP' : 'COURSE'}
                        </span>
                        <span className="text-[11px] font-black text-navy-800 bg-surface-alt border border-border-subtle/60 px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px] text-accent">flare</span>{item.date}</span>
                      </div>
                      <span className="text-[11px] text-muted font-bold uppercase tracking-wider">{item.org}</span>
                    </div>
                    <h3 className="font-headline font-black text-lg md:text-[1.35rem] text-navy-900 mb-3 leading-tight group-hover:text-accent transition-colors duration-300 drop-shadow-sm">{item.title}</h3>
                    <p className="text-muted text-[13px] md:text-[14px] leading-relaxed flex-grow">{item.desc}</p>
                  </div>
                </div>
              );
              })}
            </div>
          </div>
        </section>

        {/* ─── PROJECTS ─── */}
        <section className="py-28 px-6 bg-navy-950 text-white" id="projects">
          <div className="max-w-7xl mx-auto">
            <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-5 mb-14 border-b border-white/10 pb-6 relative group">
              <div className="absolute bottom-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-accent to-transparent" />
              <div className="max-w-2xl text-left">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[2px] bg-accent rounded-full group-hover:w-16 transition-all duration-500" />
                  <span className="text-accent font-bold text-[11px] tracking-[0.25em] uppercase">Portfolio</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-black text-white tracking-tight">Projects<span className="text-accent">.</span></h2>
              </div>
              <p className="text-muted-light text-[15px] leading-relaxed max-w-md md:text-right font-medium">
                Security tools and open-source projects built to solve real-world cybersecurity challenges.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'SentraMind', tech: 'AI · Cybersecurity', desc: 'SentraMind combines advanced AI technology with cybersecurity expertise to provide comprehensive threat detection, log analysis, and security insights for your organization.', icon: 'memory', link: 'https://sentramind.biz.id/', img: 'sentramind.png' },
                { title: 'S1C0N', tech: 'Reconnaissance · Security', desc: 'Simple recon tool to help you search for vulnerabilities and execute automated reconnaissance on target web servers.', icon: 'radar', link: 'https://github.com/Kentox493/sicon-web', img: 'S1C0N.png' },
                { title: 'Sercing', tech: 'Python · SerpAPI', desc: 'Automated File Search & Download Tool! 🚀 Your go-to solution for searching and downloading specific files from a given domain, powered by Google Dorking via SerpAPI.', icon: 'search', link: 'https://github.com/Kentox493/Sercing', img: 'sercing.png' },
                { title: 'ScanexEZ', tech: 'Python · Automation', desc: 'ScanexEZ is an advanced, yet user-friendly, penetration testing tool designed to automate the scanning of URL parameters for common web vulnerabilities.', icon: 'security', link: 'https://github.com/Kentox493/ScanexEZ', img: 'scanexez.png' },
                { title: 'Ransom-Simulator', tech: 'Cryptography · RSA-4096', desc: 'A ransomware simulator using the RSA-4096 bits algorithm. It simulates how ransomware works, where victim files are encrypted using RSA encryption and decrypted via private key.', icon: 'lock', link: 'https://github.com/Kentox493/Ransom-Simulator', img: 'ransom.png' },
                { title: 'OSecure', tech: 'GUI · Firewall Config', desc: 'OSecure is a user-friendly GUI application designed to simplify the management and configuration of firewalls across different systems without requiring deep technical knowledge.', icon: 'shield', link: 'https://github.com/Kentox493/OSecure', img: 'osecure.png' },
                { title: 'AESTXT', tech: 'Python · AES', desc: 'AESTXT is a Python tool for AES encryption and decryption, supporting multiple modes of operation (ECB, CBC, CTR, GCM). It securely encrypts/decrypts data with customizable parameters.', icon: 'key', link: 'https://github.com/Kentox493/AESTXT', img: 'AESTXT.jpg' },
              ].map((item, i) => (
                <div key={i} className={`reveal ${i > 0 ? `reveal-delay-${Math.min((i%3), 2)}` : ''} relative p-[1px] rounded-[2.5rem] bg-gradient-to-b from-white/15 via-white/5 to-transparent hover:from-accent/50 hover:via-accent/10 transition-all duration-700 group hover:-translate-y-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,1)] hover:shadow-[0_40px_60px_-20px_rgba(0,0,0,1)]`}>
                  
                  {/* Actual Card Body holding content */}
                  <div className="relative w-full h-full bg-navy-950/90 backdrop-blur-3xl p-2 md:p-3 rounded-[calc(2.5rem-1px)] flex flex-col overflow-hidden z-10 transition-colors duration-700">
                    
                    {/* Omni-Light that follows hover inside the card */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-40 bg-accent/15 blur-[60px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Top Display/Logo Box */}
                    <div className="w-full aspect-[2/1] bg-black/60 rounded-[2rem] overflow-hidden flex flex-col items-center justify-center relative shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)] ring-1 ring-white/5 group-hover:ring-accent/30 transition-all duration-500 mb-2 z-20">
                       {/* Background Grid Pattern inside Logo Box */}
                       <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)]" style={{backgroundSize: '16px 16px'}} />
                       
                       {/* Logo/Image Placement */}
                       {item.img ? (
                         <img src={`${import.meta.env.BASE_URL}/${item.img}`} alt={item.title} className="w-full h-full object-contain p-4 relative z-10 group-hover:scale-110 drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                       ) : (
                         <div className="flex flex-col items-center justify-center z-10 opacity-30 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                           <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-3 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)] border border-white/5">
                             <span className="material-symbols-outlined text-[2.5rem] text-accent drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]" style={{fontVariationSettings:"'FILL' 0"}}>{item.icon}</span>
                           </div>
                           <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/50">Application Core</span>
                         </div>
                       )}
                       <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent z-10 pointer-events-none" />
                    </div>

                    {/* Content Layout */}
                    <div className="px-5 py-6 md:px-6 flex flex-col flex-grow relative z-20">
                       <p className="text-[10px] text-accent font-black tracking-[0.15em] uppercase mb-3 drop-shadow-sm flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.5)]" /> {item.tech}</p>
                       <h3 className="font-headline font-black text-xl text-white mb-3 leading-snug group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                       <p className="text-muted-light text-[13px] md:text-[14px] leading-relaxed flex-grow">{item.desc}</p>
                       
                       <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                         <a href={item.link} className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wider font-bold text-white hover:text-accent transition-colors group/link">
                           View Source 
                           <span className="material-symbols-outlined text-[14px] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">arrow_outward</span>
                         </a>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WRITE-UPS ─── */}
        <section className="py-28 px-6 bg-surface" id="writeups">
          <div className="max-w-7xl mx-auto">
            <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-5 mb-14 border-b border-border-subtle pb-6 relative group">
              <div className="absolute bottom-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-accent to-transparent" />
              <div className="max-w-2xl text-left">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[2px] bg-accent rounded-full group-hover:w-16 transition-all duration-500" />
                  <span className="text-accent font-bold text-[11px] tracking-[0.25em] uppercase">Knowledge Sharing</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-black text-navy-900 tracking-tight">Write-ups<span className="text-accent">.</span></h2>
              </div>
              <p className="text-muted text-[15px] leading-relaxed max-w-md md:text-right font-medium">
                Detailed technical write-ups documenting vulnerability discoveries, CTF solutions, and security research.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Zerobank Lab Pentest', category: 'Web Pentest', date: 'Mar 2026', desc: 'A lab penetration testing report on the Zero Bank security environment, detailing discovery and exploitation of critical vulnerabilities.', tag: 'Lab', link: 'https://docs.google.com/document/d/1CBzjlEOUZx5HShZWMG9aT-OmagdKzjkv/edit' },
                { title: 'Wazuh SIEM Deployment: SOC Lab Setup Guide', category: 'SOC Operations', date: 'Feb 2026', desc: 'A technical step-by-step guide on the deployment and configuration of Wazuh SIEM within a simulated SOC laboratory environment, focusing on the setup and integration process.', tag: 'Guide', link: 'https://drive.google.com/file/d/1juSU0ALh7sluLPbIi7N83WgdyvT8WFGY/view?usp=sharing' },
                { title: 'Removable Media Forensics: Suspicious USB Artifact Recovery', category: 'Digital Forensic', date: 'Jan 2026', desc: 'A digital forensic examination of a suspicious USB drive, detailing bit-stream imaging and file carving to recover hidden artifacts and identify potential indicators of compromise.', tag: 'Forensic', link: 'https://docs.google.com/document/d/1HLeld6BUaaWGiYgWNAHWK6pdiW7pkn-r/edit?usp=sharing&ouid=101223023870245930597&rtpof=true&sd=true' },
                { title: 'Digital Image Forensics: Metadata Analysis & Source Verification', category: 'Digital Forensic', date: 'Dec 2025', desc: 'Technical forensic analysis of digital images utilizing metadata extraction and hex-level examination to trace origins and identify manipulation attempts.', tag: 'Analysis', link: 'https://docs.google.com/document/d/1zA9IwMc41y55aXBN4Z2THU9n5o_tW1FF/edit?usp=sharing&ouid=101223023870245930597&rtpof=true&sd=true' },
                { title: 'Identifying Internal Intruders via Network and File Analysis', category: 'Digital Forensic', date: 'Oct 2025', desc: 'A formal forensic investigation identifying an internal intruder through network traffic decryption (PCAP), credential recovery, and steganalysis using Wireshark and Steghide.', tag: 'Pro Justitia', link: 'https://docs.google.com/document/d/1VP7MZlxXiRGuFMXlFa6psOqn14ktm-Sb/edit?usp=sharing&ouid=101223023870245930597&rtpof=true&sd=true' },
                { title: 'Leveraging OSINT Methodologies for Target Profiling', category: 'OSINT · Recon', date: 'Sep 2025', desc: 'A technical OSINT investigation on target profiling and digital footprint analysis using Google Dorking, Spiderfoot, and Wayback Machine to map target relationships.', tag: 'Recon', link: 'https://drive.google.com/file/d/16DdlbTDEpY1djrrCGm_XyxCmiN_q-GVk/view?usp=sharing' },
                { title: 'SOC Incident Triage & Log Analysis: Monitoring System Exploitation Attempts', category: 'SOC Ops · Triage', date: 'Aug 2025', desc: 'A security log analysis and triage report identifying multi-vector attacks including SSH Brute Forcing and Nikto scans, focusing on True Positive validation.', tag: 'Blue Team', link: 'https://docs.google.com/spreadsheets/d/1JwKvvVSYWvpcMNKLUtpAC8pRZ0zOadUB/edit?usp=sharing&ouid=101223023870245930597&rtpof=true&sd=true' },
                { title: 'Memory Forensics: Wanacrypt0r (WannaCry) Lifecycle Analysis', category: 'Incident Response', date: 'Nov 2025', desc: 'A volatile memory investigation of a system compromised by the Wanacrypt0r ransomware, dissecting malicious injects and cryptographic artifacts to reconstruct the infection lifecycle.', tag: 'Forensic', link: 'https://drive.google.com/file/d/1KoYAIIC-NRcG5BJDXLq6BOjyPaBZ8KMp/view?usp=sharing' },
                { title: 'Investigating Internal SSH Log Anomalies & User Enumeration', category: 'Digital Forensic · SSH', date: 'Jul 2025', desc: 'A formal digital forensic investigation under a Pro Justitia framework to analyze SSH log activity, reconstructing the attack timeline and identifying source internal IPs.', tag: 'Pro Justitia', link: 'https://docs.google.com/document/d/1BUpJQ9_6cnVGezdZ9VnRoQ-drHDs8VIb/edit?usp=sharing&ouid=101223023870245930597&rtpof=true&sd=true' },
              ].map((item, i) => (
                <div key={i} className={`reveal ${i > 0 ? `reveal-delay-${Math.min(i, 5)}` : ''} relative p-[1px] rounded-[2rem] bg-gradient-to-br from-white/10 via-white/5 to-transparent hover:from-accent/40 hover:via-accent/5 transition-all duration-700 group hover:-translate-y-2 shadow-[0_15px_35px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_rgba(34,211,238,0.1)]`}>
                  
                  <div className="relative w-full h-full bg-white rounded-[calc(2rem-1px)] p-6 md:p-8 flex flex-col overflow-hidden z-10 transition-all duration-500 group-hover:bg-surface-alt/50">
                    
                    {/* Subtle Holographic Grid Backdrop in Card */}
                    <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,1)_1px,transparent_0)]" style={{backgroundSize: '16px 16px'}} />
                    
                    {/* Meta info row */}
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full border ${
                          item.tag === 'Pro Justitia' ? 'bg-red-50 border-red-200 text-red-600' :
                          item.tag === 'Forensic' ? 'bg-purple-50 border-purple-200 text-purple-600' :
                          'bg-accent/5 border-accent/20 text-accent'
                        }`}>{item.tag}</span>
                      </div>
                      <span className="text-[10px] text-muted font-bold tracking-tighter flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                        {item.date}
                      </span>
                    </div>

                    {/* Main Title & Category */}
                    <div className="flex-grow space-y-3 relative z-10">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-accent tracking-[0.25em] uppercase mb-1">{item.category}</span>
                        <h3 className="font-headline font-black text-lg md:text-xl text-navy-900 group-hover:text-accent transition-colors duration-300 leading-tight">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-muted text-[14px] leading-relaxed line-clamp-4 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                        {item.desc}
                      </p>
                    </div>

                    {/* Interaction Footer */}
                    <div className="mt-8 pt-6 border-t border-border-subtle/50 flex items-center justify-between relative z-10">
                      <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.15em] text-navy-900/60 group-hover:text-accent transition-all uppercase">
                        Expand Report 
                        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">north_east</span>
                      </a>
                      
                      {/* Decorative Digital Signature line */}
                      <div className="w-12 h-[1px] bg-border-subtle group-hover:w-20 group-hover:bg-accent transition-all duration-700" />
                    </div>

                    {/* Glossy Overlay Reflection */}
                    <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CREDENTIALS ─── */}
        <section className="py-28 px-6 bg-navy-950 text-white" id="credentials">
          <div className="max-w-7xl mx-auto">
            <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-5 mb-14 border-b border-white/10 pb-6 relative group">
              <div className="absolute bottom-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-accent to-transparent" />
              <div className="max-w-2xl text-left">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[2px] bg-accent rounded-full group-hover:w-16 transition-all duration-500" />
                  <span className="text-accent font-bold text-[11px] tracking-[0.25em] uppercase">Verified</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-black text-white tracking-tight">Professional Credentials<span className="text-accent">.</span></h2>
              </div>
              <p className="text-muted-light text-[15px] leading-relaxed max-w-md md:text-right font-medium">
                Rigorous industry certifications validating deep technical proficiency in offensive and defensive cybersecurity.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certs.map((item, i) => (
                <div key={i} className={`reveal ${i > 0 ? `reveal-delay-${Math.min(i, 5)}` : ''} relative group rounded-[2rem] overflow-visible flex flex-col transition-all duration-500 hover:-translate-y-3 hover:-translate-x-1 hover:shadow-[-25px_25px_50px_-15px_rgba(0,0,0,0.8),inset_0_2px_15px_rgba(8,145,178,0.3)] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] border-t border-l border-white/10 hover:border-cyan-400/50 border-r border-b border-black/40 bg-navy-900/90 backdrop-blur-3xl`}>
                  
                  {/* 3D Physical Ribbon Flag */}
                  <div className="absolute top-6 -right-3 z-30 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-105 transition-all duration-500 flex flex-col">
                     <div className="relative flex items-center gap-2 pl-4 pr-6 py-2 shadow-[-10px_10px_20px_rgba(0,0,0,0.4)] border-y border-l rounded-l-lg overflow-hidden bg-gradient-to-r from-cyan-600 to-cyan-400 border-cyan-300 text-white">
                        {/* Shine Effect in Ribbon */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                        <span className="w-2 h-2 rounded-full animate-pulse shadow-lg bg-cyan-100" />
                        <span className="font-headline font-black text-[12px] tracking-[0.2em] uppercase drop-shadow-md relative z-10">
                           VERIFIED
                        </span>
                     </div>
                     {/* The realistic ribbon folded tail */}
                     <div className="w-3 h-3 self-end clip-path-polygon-[100%_0,0_0,0_100%] brightness-50 bg-cyan-700" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
                  </div>

                  {/* Full Card Image presentation */}
                  <div className="w-full aspect-[1.35/1] relative overflow-hidden rounded-t-[2rem] bg-gradient-to-br from-white to-gray-200">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)]" style={{backgroundSize: '12px 12px'}} />
                    
                    {/* @ts-ignore */}
                    {item.img ? (
                      /* @ts-ignore */
                      <img src={`${import.meta.env.BASE_URL}${item.img}`} alt={item.cert} className="absolute inset-0 w-full h-full object-contain p-6 z-0 group-hover:scale-[1.05] group-hover:rotate-1 transition-transform duration-700 ease-out mix-blend-multiply" />
                    ) : (
                      <div className="flex flex-col items-center justify-center absolute inset-0 z-10 opacity-70 group-hover:opacity-100 transition-all duration-500">
                        <div className="w-20 h-20 bg-cyan-50 rounded-2xl flex items-center justify-center mb-3 shadow-[inset_0_2px_15px_rgba(6,182,212,0.2)] border border-cyan-200">
                           <span className="material-symbols-outlined text-[3rem] text-cyan-600" style={{fontVariationSettings:"'FILL' 1"}}>workspace_premium</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-navy-900/50">Verified Credential</span>
                      </div>
                    )}
                    
                    {/* Dramatic Gradients for 3D depth (Cleaned up for clarity) */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-60 bg-gradient-to-tr from-transparent via-white/80 w-[200%] to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 z-10 mix-blend-overlay pointer-events-none" />
                    <div className="absolute inset-0 shadow-[inset_0_2px_15px_rgba(0,0,0,0.1)] z-10 pointer-events-none" />
                  </div>

                  {/* Content Area */}
                  <div className="p-8 pt-0 flex flex-col flex-grow relative z-20">
                    <h3 className="font-headline font-extrabold text-[24px] mb-2 text-white drop-shadow-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-cyan-500 transition-all duration-300 transform group-hover:translate-x-1">{item.cert}</h3>
                    <p className="text-white/70 text-[15px] font-semibold leading-relaxed flex-grow drop-shadow-sm">{item.name}</p>
                    
                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-start group-hover:border-white/20 transition-colors duration-300">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white/40 uppercase tracking-[0.25em] mb-1 font-semibold block transition-colors group-hover:text-white/60">Issuing Organization</span>
                        <div className="flex items-center gap-2">
                           <span className="material-symbols-outlined text-[16px] text-white/40 group-hover:text-white/80" style={{fontVariationSettings:"'FILL' 1"}}>account_balance</span>
                           <span className="text-[13px] font-bold uppercase tracking-widest text-cyan-400 group-hover:text-cyan-300 transition-colors">{item.org}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="py-10 bg-navy-900 text-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="text-center md:text-left">
            <span className="text-lg font-headline font-extrabold tracking-tight">AWU<span className="text-accent">.</span></span>
            <p className="text-xs text-white/40 mt-1">© {new Date().getFullYear()} Arya Widyanto Utomo. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a className="text-xs font-medium text-white/50 hover:text-white transition-colors" href="mailto:utomoa448@gmail.com">Email</a>
            <a className="text-xs font-medium text-white/50 hover:text-white transition-colors" href="https://tinyurl.com/mry5bad3" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
