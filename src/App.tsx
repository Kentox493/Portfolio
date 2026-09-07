import { useEffect, useState } from 'react';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('expertise');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const observerOption = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          if (e.target.id) setActiveSection(e.target.id);
        }
      });
    }, observerOption);

    // Give DOM time to paint before querying
    const timer = setTimeout(() => {
      document.querySelectorAll('section[id], .reveal').forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [previewModal, setPreviewModal] = useState<{ img: string; title: string; subtitle?: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [exp1Slide, setExp1Slide] = useState(0);
  const [exp2Slide, setExp2Slide] = useState(0);
  const [doscomSlide, setDoscomSlide] = useState(0);
  const [writeupPage, setWriteupPage] = useState(1);
  const exp1Photos = ['teknologiserverindonesia1.jpeg', 'teknologiserverindonesia2.jpeg'];
  const exp2Photos = ['rsud1.jpg', 'rsud2.jpg', 'rsud3.jpg', 'rsud4.jpeg', 'rsud5.jpeg'];
  const doscomPhotos = ['doscom2.jpeg', 'doscom3.jpeg', 'doscom4.jpeg', 'doscom5.jpeg', 'doscom6.jpeg', 'doscom7.jpeg', 'doscom8.jpeg', 'doscom9.jpeg'];

  const achievements = [
    { company: 'OpenAI', year: 'Top 100', desc: 'Ranked within the Top 100 security researchers globally of all time in OpenAI\'s Bug Bounty Program (#87 K3NT0).', type: 'Top 100 Global (All-Time)', img: 'hof-openai.png' },
    { company: 'TryHackMe', year: 'Top 1%', desc: 'Ranked in the Global Top 1% of cybersecurity practitioners on TryHackMe (#14,959), completing 240+ rooms with 39 badges.', type: 'Global Top 1% Rank', img: 'hof-tryhackme.png' },
    { company: 'The Browser Company of NYC', year: 'Top 11', desc: 'Ranked #11 globally in The Browser Company of NYC (Arc Browser) 2025 Hall of Fame (kento911) for multiple verified vulnerability disclosures.', type: 'Top 11 Researcher (2025)', img: 'hof-browsercompany.png' },
    { company: 'Brave Software', year: 'Top 21', desc: 'Ranked #21 globally in the Brave Software 2025 Bug Hunter Hall of Fame (kento911) following verified vulnerability disclosures.', type: 'Top 21 Researcher (2025)', img: 'hof-brave.png' },
    { company: 'Perplexity AI', year: '2026', desc: 'Inducted into the Perplexity AI Vulnerability Disclosure Program (VDP) Hall of Fame (K3NT0) for responsibly reporting valid security flaws.', type: 'VDP Hall of Fame', img: 'hof-perplexity.png' },
    { company: 'Samsung Mobile', year: '2026', desc: 'Awarded security bounty & appreciation reward by Samsung Mobile Security for valid vulnerability submission (Ticket I-118259).', type: 'Bug Bounty Award', isBounty: true, img: 'hof-samsung.png' },
  ];

  const certs = [
    { cert: 'SAL1', name: 'Security Analyst Level 1 (SAL1)', org: 'TryHackMe', img: 'SAL1.png' },
    { cert: 'SEC1', name: 'Cyber Security 101 (SEC1)', org: 'TryHackMe', img: 'SEC1.png' },
    { cert: 'CNSP', name: 'Network Security Practitioner', org: 'The SecOps Group', img: 'CNSP.jpg' },
    { cert: 'C3SA', name: 'Cyber Security Analyst', org: 'CyberWarfare Labs', img: 'C3SA.jpg' },
    { cert: 'FCA', name: 'Fortinet Certified Associate', org: 'Fortinet', img: 'FCA.jpg' },
    { cert: 'JWD', name: 'Junior Web Developer', org: 'BNSP' },
  ];

  const navItems = [
    { label: 'Expertise', id: 'expertise' },
    { label: 'Credentials', id: 'credentials' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Write-ups', id: 'writeups' },
  ];

  /* Reusable section header */
  const SectionHeader = ({ label, title, description, dark = false }: { label: string; title: string; description: string; dark?: boolean }) => (
    <div className="mb-16">
      <p className={`text-xs font-semibold tracking-[0.2em] uppercase mb-3 ${dark ? 'text-accent' : 'text-accent'}`}>{label}</p>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h2 className={`text-3xl md:text-4xl font-headline font-extrabold tracking-tight ${dark ? 'text-white' : 'text-zinc-900'}`}>{title}</h2>
        <p className={`text-sm leading-relaxed max-w-md md:text-right ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>{description}</p>
      </div>
      <div className={`mt-6 h-px ${dark ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
    </div>
  );

  /* Reusable carousel */
  const Carousel = ({ photos, slide, setSlide, label }: { photos: string[]; slide: number; setSlide: (fn: (p: number) => number) => void; label: string }) => (
    <div className="relative w-full aspect-[3/2] bg-zinc-100 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${slide * 100}%)` }}>
        {photos.map((src, i) => (
          <div key={i} className="min-w-full h-full">
            <img src={`${import.meta.env.BASE_URL}${src}`} alt={`${label} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
      {photos.length > 1 && (
        <>
          <button onClick={() => setSlide((p) => (p - 1 + photos.length) % photos.length)} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors cursor-pointer" aria-label="Previous">
            <span className="material-symbols-outlined text-zinc-700 text-lg">chevron_left</span>
          </button>
          <button onClick={() => setSlide((p) => (p + 1) % photos.length)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors cursor-pointer" aria-label="Next">
            <span className="material-symbols-outlined text-zinc-700 text-lg">chevron_right</span>
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 px-3 py-1.5 bg-black/50 rounded-full">
            {photos.map((_, idx) => (
              <button key={idx} onClick={() => setSlide(() => idx)} className={`rounded-full transition-all duration-300 ${idx === slide ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50'}`} aria-label={`Slide ${idx + 1}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="font-body antialiased text-zinc-700 bg-white">

      {/* ─── NAVBAR ─── */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-zinc-200' : 'bg-transparent'}`}>
        <nav className="flex justify-between items-center max-w-5xl mx-auto px-8 md:px-12 h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-lg font-headline font-extrabold text-zinc-900 tracking-tight">
              AWU<span className="text-accent">.</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-4 py-2 text-xs font-medium tracking-wide transition-colors duration-200 rounded-lg ${
                  activeSection === item.id
                    ? 'text-accent bg-accent/5'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/arya-widyanto-utomo-873100288"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-[#0A66C2] transition-colors cursor-pointer"
              title="LinkedIn Profile"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z"/>
              </svg>
              LinkedIn
            </a>
            <a
              href="https://drive.google.com/file/d/1kJYTXYk1NNJW2_JW-7oMLQ8edajuc1d6/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">download</span>
              Resume
            </a>
            <a
              href="mailto:utomoa448@gmail.com"
              className="px-5 py-2 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition-colors duration-200 cursor-pointer"
            >
              Get in Touch
            </a>
            <button
              className="lg:hidden p-2 text-zinc-700 cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-xl">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-zinc-200 px-8 md:px-12 pb-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 text-sm font-medium transition-colors ${
                  activeSection === item.id ? 'text-accent' : 'text-zinc-600'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-zinc-100 flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/arya-widyanto-utomo-873100288"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-zinc-600 hover:text-[#0A66C2] flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 fill-[#0A66C2]" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="https://drive.google.com/file/d/1kJYTXYk1NNJW2_JW-7oMLQ8edajuc1d6/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-zinc-600 hover:text-zinc-900 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Resume
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ─── HERO ─── */}
        <section className="relative pt-32 pb-20 md:pt-32 md:pb-28 px-8 md:px-12 bg-zinc-50 overflow-hidden">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="reveal flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-zinc-200 rounded-full shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-zinc-600 font-medium text-xs">Available for engagements</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-zinc-200 rounded-full shadow-sm">
                  <span className="material-symbols-outlined text-accent text-sm">military_tech</span>
                  <span className="text-zinc-700 font-medium text-xs">Top 1% Globally on TryHackMe</span>
                </div>
              </div>

              <h1 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-[3.5rem] font-headline font-extrabold text-zinc-900 tracking-tight leading-[1.1]">
                Cyber Security<br className="hidden md:block" />
                <span className="text-zinc-400 font-semibold">Analyst & Pentester.</span>
              </h1>

              <p className="reveal reveal-delay-2 text-base text-zinc-500 max-w-lg leading-relaxed">
                Specializing in vulnerability research, incident response, and securing enterprise infrastructure. Over 2 years of experience identifying critical vulnerabilities globally.
              </p>

              <div className="reveal reveal-delay-3 flex flex-wrap gap-2">
                {[
                  { icon: 'shield', label: 'Pentester' },
                  { icon: 'monitoring', label: 'SOC Analyst' },
                  { icon: 'bug_report', label: 'Bug Hunter' },
                  { icon: 'leaderboard', label: 'THM Top 1%' },
                ].map((t) => (
                  <span key={t.label} className="inline-flex items-center gap-1.5 bg-white border border-zinc-200 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-700">
                    <span className="material-symbols-outlined text-accent text-sm">{t.icon}</span>
                    {t.label}
                  </span>
                ))}
              </div>

              <div className="reveal reveal-delay-4 flex flex-wrap gap-3 pt-2">
                <a href="mailto:utomoa448@gmail.com" className="bg-zinc-900 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-zinc-800 transition-colors duration-200 cursor-pointer">
                  Connect With Me
                </a>
                <a href="https://drive.google.com/file/d/1kJYTXYk1NNJW2_JW-7oMLQ8edajuc1d6/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="bg-white text-zinc-900 border border-zinc-200 px-6 py-3 rounded-lg font-semibold text-sm hover:bg-zinc-50 transition-colors duration-200 flex items-center gap-2 cursor-pointer">
                  <span className="material-symbols-outlined text-base">download</span>
                  Download CV
                </a>
                <a href="https://www.linkedin.com/in/arya-widyanto-utomo-873100288" target="_blank" rel="noopener noreferrer" className="bg-white text-zinc-900 border border-zinc-200 px-5 py-3 rounded-lg font-semibold text-sm hover:bg-zinc-50 hover:border-zinc-300 transition-colors duration-200 flex items-center gap-2 cursor-pointer">
                  <svg className="w-4 h-4 fill-[#0A66C2]" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="reveal reveal-delay-3 lg:col-span-5 flex justify-center items-end mt-12 lg:mt-0 relative -mb-28 md:-mb-40 lg:-mb-[8rem]">
              <img src={`${import.meta.env.BASE_URL}profile_transparent.png`} alt="Arya Widyanto Utomo" className="w-full max-w-[280px] sm:max-w-sm lg:max-w-[125%] lg:-ml-10 h-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] z-10" />
            </div>
          </div>
        </section>

        {/* ─── EXPERTISE ─── */}
        <section className="py-24 px-8 md:px-12 bg-white" id="expertise">
          <div className="max-w-5xl mx-auto">
            <SectionHeader label="Core Competencies" title="Security Expertise" description="Enterprise-grade security assessments, proactive threat hunting, and rapid incident response to safeguard digital assets." />
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: 'policy', title: 'Web & Network Pentesting', desc: 'Comprehensive security assessments, vulnerability exploitation, and infrastructure hardening with a focus on access control and misconfigurations.' },
                { icon: 'monitoring', title: 'Incident Response & SIEM', desc: 'Continuous threat monitoring, end-to-end incident lifecycle management, and SIEM optimization to mitigate unauthorized access attempts.' },
                { icon: 'bug_report', title: 'Vulnerability Research', desc: 'Actively discovering zero-day flaws and reporting to global bug bounty programs, validating critical vulnerabilities across web and mobile.' },
              ].map((item, i) => (
                <div key={i} className={`reveal ${i > 0 ? `reveal-delay-${i}` : ''} bg-zinc-50 p-8 rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group`}>
                  <div className="w-12 h-12 bg-white rounded-xl border border-zinc-200 flex items-center justify-center mb-6 group-hover:border-accent/30 transition-colors duration-300">
                    <span className="material-symbols-outlined text-xl text-zinc-600 group-hover:text-accent transition-colors duration-300">{item.icon}</span>
                  </div>
                  <h3 className="text-lg font-headline font-bold text-zinc-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CREDENTIALS ─── */}
        <section className="py-24 px-8 md:px-12 bg-zinc-900 text-white" id="credentials">
          <div className="max-w-5xl mx-auto">
            <SectionHeader dark label="Verified" title="Professional Credentials" description="Rigorous industry certifications validating deep technical proficiency in offensive and defensive cybersecurity." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certs.map((item, i) => (
                <div
                  key={i}
                  onClick={() => item.img && setPreviewModal({ img: item.img, title: item.name, subtitle: `${item.cert} · ${item.org}` })}
                  className={`reveal ${i > 0 ? `reveal-delay-${Math.min(i, 5)}` : ''} bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden hover:border-zinc-500 transition-all duration-300 flex flex-col ${item.img ? 'cursor-pointer group hover:shadow-xl' : ''}`}
                >
                  <div className="aspect-[4/3] bg-zinc-100 border-b border-zinc-700 relative overflow-hidden flex items-center justify-center">
                    {item.img ? (
                      <>
                        <img src={`${import.meta.env.BASE_URL}${item.img}`} alt={item.cert} className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs text-white font-medium backdrop-blur-[1px]">
                          <span className="material-symbols-outlined text-base">zoom_in</span>
                          Lihat Sertifikat
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-zinc-400">
                        <span className="material-symbols-outlined text-4xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                        <span className="text-[10px] font-medium tracking-wider uppercase">Verified Credential</span>
                      </div>
                    )}
                    <span className="absolute top-4 right-4 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md bg-accent text-white z-10">Verified</span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-headline font-bold text-xl text-white mb-1 group-hover:text-accent transition-colors">{item.cert}</h3>
                    <p className="text-zinc-400 text-sm mb-4">{item.name}</p>
                    <div className="mt-auto pt-4 border-t border-zinc-700 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium block mb-1">Issuing Organization</span>
                        <span className="text-xs font-semibold text-accent">{item.org}</span>
                      </div>
                      {item.img && (
                        <span className="material-symbols-outlined text-sm text-zinc-500 group-hover:text-white transition-colors">open_in_full</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ACHIEVEMENTS ─── */}
        <section className="py-24 px-8 md:px-12 bg-zinc-900 text-white border-t border-zinc-800" id="achievements">
          <div className="max-w-5xl mx-auto">
            <SectionHeader dark label="Proven Track Record" title="Achievements" description="From OpenAI's all-time Top 100 to global bug bounty rewards and Top 1% rankings—security research recognized worldwide." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((a, i) => (
                <div
                  key={i}
                  onClick={() => setPreviewModal({ img: a.img, title: a.company, subtitle: `${a.type} · ${a.year}` })}
                  className={`reveal ${i > 0 ? `reveal-delay-${Math.min(i, 5)}` : ''} bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden hover:border-zinc-500 transition-all duration-300 flex flex-col group cursor-pointer hover:shadow-2xl`}
                >
                  <div className="w-full aspect-[16/10] relative overflow-hidden bg-zinc-900 border-b border-zinc-700">
                    <img
                      src={`${import.meta.env.BASE_URL}${a.img}`}
                      alt={a.company}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs text-white font-medium backdrop-blur-[1px]">
                      <span className="material-symbols-outlined text-base">zoom_in</span>
                      Lihat Bukti Foto
                    </div>
                    <span className="absolute top-4 right-4 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md bg-zinc-100 text-zinc-900 border border-transparent z-10">
                      {a.year}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-headline font-bold text-xl text-white group-hover:text-accent transition-colors">{a.company}</h3>
                      <span className="material-symbols-outlined text-sm text-zinc-500 group-hover:text-white transition-colors">open_in_full</span>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed flex-grow">{a.desc}</p>
                    <div className="mt-5 pt-4 border-t border-zinc-700 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium block mb-1">Achievement</span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">{a.type}</span>
                      </div>
                      <span className="text-xs font-medium text-accent flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        Bukti
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── EXPERIENCE ─── */}
        <section className="py-24 px-8 md:px-12 bg-zinc-50" id="experience">
          <div className="max-w-5xl mx-auto">
            <SectionHeader label="Professional" title="Work Experience" description="A proven operational history of identifying critical risks and mitigating advanced threats in production environments." />
            <div className="space-y-8">
              {/* Exp 1 */}
              <div className="reveal bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-card-hover transition-all duration-300">
                <div className="p-4 md:p-6">
                  <Carousel photos={exp1Photos} slide={exp1Slide} setSlide={setExp1Slide} label="TSI Documentation" />
                </div>
                <div className="px-6 pb-8 md:px-8">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                    <div>
                      <p className="text-xs text-accent font-semibold tracking-wider uppercase mb-1">PT. Teknologi Server Indonesia</p>
                      <h3 className="text-xl md:text-2xl font-headline font-bold text-zinc-900">Penetration Tester & SOC Analyst</h3>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-600">
                      <span className="material-symbols-outlined text-sm text-zinc-400">schedule</span>
                      Jul 2025 – Sep 2025
                    </span>
                  </div>
                  <ul className="grid md:grid-cols-3 gap-4">
                    {[
                      { icon: 'shield', text: 'Managed end-to-end incident response for crypto-mining bot infections, isolating threats and restoring integrity.' },
                      { icon: 'bug_report', text: 'Identified 12+ critical vulnerabilities on a production platform during pre-launch testing assessments.' },
                      { icon: 'monitoring', text: 'Maintained continuous security monitoring for 5+ enterprise servers using advanced SIEM configurations.' },
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 items-start bg-zinc-50 p-4 rounded-xl text-sm text-zinc-600 leading-relaxed">
                        <span className="material-symbols-outlined text-base text-accent mt-0.5 shrink-0">{item.icon}</span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Exp 2 */}
              <div className="reveal reveal-delay-1 bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-card-hover transition-all duration-300">
                <div className="p-4 md:p-6">
                  <Carousel photos={exp2Photos} slide={exp2Slide} setSlide={setExp2Slide} label="RSUD Documentation" />
                </div>
                <div className="px-6 pb-8 md:px-8">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                    <div>
                      <p className="text-xs text-accent font-semibold tracking-wider uppercase mb-1">RSUD RAA Soewondo Pati</p>
                      <h3 className="text-xl md:text-2xl font-headline font-bold text-zinc-900">Penetration Tester</h3>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-600">
                      <span className="material-symbols-outlined text-sm text-zinc-400">schedule</span>
                      Jan 2025 – Mar 2025
                    </span>
                  </div>
                  <ul className="grid md:grid-cols-3 gap-4">
                    {[
                      { icon: 'manage_search', text: 'Conducted in-depth security assessments on internal servers, identifying 15+ exploitable vulnerabilities and reducing the attack surface.' },
                      { icon: 'database', text: 'Secured critical healthcare data by isolating and validating leaked database credentials within the internal network.' },
                      { icon: 'hub', text: 'Designed and developed a complete secure network topology for the hospital\'s operational and administrative needs.' },
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 items-start bg-zinc-50 p-4 rounded-xl text-sm text-zinc-600 leading-relaxed">
                        <span className="material-symbols-outlined text-base text-accent mt-0.5 shrink-0">{item.icon}</span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── EDUCATION & LEADERSHIP ─── */}
        <section className="py-24 px-8 md:px-12 bg-white" id="education">
          <div className="max-w-5xl mx-auto">
            <SectionHeader label="Academic" title="Education & Leadership" description="Academic foundation and community involvement shaping a security-first mindset." />
            <div className="reveal bg-zinc-50 rounded-2xl border border-zinc-100 overflow-hidden">
              <div className="p-4 md:p-6">
                <Carousel photos={doscomPhotos} slide={doscomSlide} setSlide={setDoscomSlide} label="Community Documentation" />
              </div>

              <div className="flex flex-col lg:flex-row">
                {/* DOSCOM */}
                <div className="p-8 md:p-10 lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-200">
                  <img src={`${import.meta.env.BASE_URL}doscom1.png`} alt="DOSCOM Logo" className="w-14 h-14 object-contain mb-6 rounded-xl border border-zinc-200 bg-white p-2" />
                  <span className="inline-flex px-3 py-1 bg-zinc-900 text-white text-[10px] font-semibold tracking-wider uppercase mb-4 rounded-md w-fit">Community Leadership</span>
                  <h3 className="text-xl font-headline font-bold text-zinc-900 mb-1">Dinus Open Source Community</h3>
                  <p className="text-sm text-zinc-500 mb-6 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-accent">badge</span>
                    Network Division Coordinator
                  </p>
                  <div className="space-y-3 mt-auto">
                    {[
                      { icon: 'groups', text: 'Led a technical team of 10+ members executing 5+ internal workshops.' },
                      { icon: 'co_present', text: 'Mentored 20+ public participants in Web Pentesting & OSINT bootcamps.' },
                      { icon: 'code_blocks', text: 'Managed 3 open-source projects: Recon, CTF Platform, & BadUSB.' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 items-start bg-white p-4 rounded-xl border border-zinc-100 text-sm text-zinc-600 leading-relaxed">
                        <span className="material-symbols-outlined text-base text-accent mt-0.5 shrink-0">{item.icon}</span>
                        <span dangerouslySetInnerHTML={{ __html: item.text.replace(/(\d+\+?)/g, '<strong class="text-zinc-900">$1</strong>') }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* University */}
                <div className="p-8 md:p-10 lg:w-1/2 flex flex-col">
                  <img src={`${import.meta.env.BASE_URL}udinus.png`} alt="Universitas Dian Nuswantoro Logo" className="w-14 h-14 object-contain mb-6 rounded-xl border border-zinc-200 bg-white p-2" />
                  <span className="inline-flex px-3 py-1 bg-zinc-100 text-zinc-700 text-[10px] font-semibold tracking-wider uppercase mb-4 rounded-md w-fit border border-zinc-200">Academic Background</span>
                  <h3 className="text-xl font-headline font-bold text-zinc-900 mb-1">Universitas Dian Nuswantoro</h3>
                  <p className="text-sm text-zinc-500 mb-6 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-accent">school</span>
                    Bachelor's Degree in Informatic Engineering
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex gap-3 items-center bg-white p-4 rounded-xl border border-zinc-100 text-sm text-zinc-600">
                      <span className="material-symbols-outlined text-base text-accent shrink-0">monitoring</span>
                      GPA: <strong className="text-zinc-900">3.40 / 4.00</strong>
                    </div>
                    <div className="flex gap-3 items-center bg-white p-4 rounded-xl border border-zinc-100 text-sm text-zinc-600">
                      <span className="material-symbols-outlined text-base text-accent shrink-0">calendar_month</span>
                      Sep 2022 – Apr 2026
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-zinc-100 mt-auto">
                    <p className="text-sm text-zinc-500 leading-relaxed mb-3">
                      <span className="text-zinc-900 font-medium italic">"Analisis Tripartit Keamanan Docker: Evaluasi Metode Deteksi Kerentanan, Registry, dan Layanan"</span>
                    </p>
                    <a href="https://doi.org/10.33364/algoritma/v.22-2.2983" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80 transition-colors cursor-pointer">
                      View Publication <span className="material-symbols-outlined text-sm">arrow_outward</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TRAINING CERTIFICATES ─── */}
        <section className="py-24 px-8 md:px-12 bg-zinc-50" id="training">
          <div className="max-w-5xl mx-auto">
            <SectionHeader label="Professional Development" title="Bootcamp & Course" description="Continuous learning through specialized cybersecurity training programs and workshops." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Certified Ethical Hacker Academy', org: 'Metrodata', date: '2026', desc: 'Intensive academy program covering advanced ethical hacking techniques, vulnerability assessment, and comprehensive penetration testing methodologies.', img: 'CEH_Academy.jpg' },
                { title: 'SOC Analyst L1', org: 'TryHackMe', date: '2026', desc: 'Hands-on defensive security training focusing on threat monitoring, triage execution, SIEM utilization, and practical incident response techniques via interactive learning labs.', img: 'SOC_Analyst_L1.png' },
                { title: 'Cyber Security 101', org: 'TryHackMe', date: '2026', desc: 'Hands-on learning path (45+ hrs) covering network security, web application security, operating systems, and defensive security operations.', img: 'THM_CyberSecurity101.png' },
                { title: 'Pre Security', org: 'TryHackMe', date: '2026', desc: 'Foundational learning path (19+ hrs) covering networking essentials, web fundamentals, Linux basics, and core cybersecurity principles.', img: 'THM_PreSecurity.png' },
                { title: 'Penetration Testing', org: 'Redlimit - Meta4sec', date: '2025', desc: 'Training for website penetration, learning several information gathering techniques, recon, and various types of attacks with a bug hunting approach and best practice exploitation.', img: 'Penetration Testing - Redlimit.jpg' },
                { title: 'Web Security Academy', org: 'PortSwigger', date: '2025', desc: 'Advanced hands-on web vulnerability training covering complex attack vectors like SQLi, XSS, CSRF, and Server-Side Request Forgery developed by industry experts.', img: 'Web Security Academy  - Portswigger.png' },
                { title: 'Advanced Cyber Security - Threats and Governance', org: 'Great Learning', date: '2024', desc: 'Focused on understanding complex cyber threats, assessing risks, implementing governance frameworks, and aligning security operations with business objectives at a strategic level.', img: 'Advanced Cyber Security Threats and Governance  -  Great Learning.jpg' },
                { title: 'Junior SOC Analyst', org: 'Kominfo', date: '2024', desc: 'Training to understand SOC operations including traffic analysis with Wireshark, log analysis, and the use of Kibana/Elastic based on Cisco Cyber Associate standards.', img: 'Junior SOC Analyst - Kominfo.jpg' },
                { title: 'SOC Analyst L1', org: 'Jadi Hacker', date: '2024', desc: 'Practical training on SOC Tier 1 methodologies, covering traffic analysis via Wireshark, advanced log analysis, and Wazuh deployment.', img: 'SOC L1 - Jadi Hackers.jpg' },
                { title: 'Cyber Threat Management', org: 'Cisco Networking Academy', date: '2024', desc: 'Advanced principles of threat management, covering continuous monitoring, proactive incident response, and strategic risk evaluation to maintain robust cybersecurity.', img: 'Cyber Threat Management - Cisco.jpg' },
                { title: 'Endpoint Security', org: 'Cisco Networking Academy', date: '2024', desc: 'Comprehensive training on securing endpoints against advanced threats, focusing on malwares, host-based intrusions, and effective mitigation strategies.', img: 'Endpoint Security  - Cisco.jpg' },
                { title: 'Network Defense', org: 'Cisco Networking Academy', date: '2024', desc: 'In-depth course on designing structured network defense mechanisms, securing network perimeters, and thwarting attacks targeting enterprise infrastructures.', img: 'Network Defense - Cisco.jpg' },
                { title: 'OSINT Analyst', org: 'Cyber Academy Indonesia', date: '2024', desc: 'Comprehensive training to conduct deep-dive investigations and intelligence gathering on open-source platforms.', img: 'Osint Analyst - Cyber Academy.jpg' },
                { title: 'Web Penetration Testing', org: 'Jadi Hacker', date: '2023', desc: 'Basic to intermediate training for website penetration covering information gathering, recon techniques, diverse attack vectors, up to the reporting stage.', img: 'Web Pentesting - Jadi Hacker.jpg' },
                { title: 'CCNA 200-301', org: 'ID-Networkers', date: '2023', desc: 'Network engineering training designed to deepen the understanding and configuration of Cisco network devices based on CCNA 200-301 standards.', img: 'CCNA 200-301  - ID Networkers.jpg' },
                { title: 'Computer Network Basic', org: 'ITBOX', date: '2023', desc: 'Fundamental networking concepts encompassing basic network topologies, communication protocols, IP addressing, and fundamental infrastructure troubleshooting.', img: 'Computer  Network - ITBOX.jpg' },
                { title: 'Cyber Security Basic', org: 'ITBOX', date: '2023', desc: 'Foundational cybersecurity course covering core concepts of information security, threat landscapes, basic access controls, and essential security hygiene.', img: 'Cyber Security Basic - ITBOX.jpg' },
              ].map((item, i) => {
                const isBootcamp = ['ID-Networkers', 'Cyber Academy Indonesia', 'Jadi Hacker', 'Metrodata', 'Redlimit - Meta4sec', 'Kominfo'].includes(item.org);
                return (
                  <div key={i} className={`reveal ${i > 0 ? `reveal-delay-${Math.min(i % 3, 2)}` : ''} bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col group`}>
                    <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden flex items-center justify-center">
                      {item.img ? (
                        <img src={`${import.meta.env.BASE_URL}${item.img}`} alt={item.title} className="w-full h-full object-contain p-6" loading="lazy" />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-zinc-300">
                          <span className="material-symbols-outlined text-4xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                          <span className="text-[10px] font-medium tracking-wider uppercase">Certificate Pending</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider rounded ${isBootcamp ? 'bg-accent/10 text-accent' : 'bg-zinc-100 text-zinc-500'}`}>
                          {isBootcamp ? 'Bootcamp' : 'Course'}
                        </span>
                        <span className="text-[11px] font-medium text-zinc-400">{item.date}</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider mb-1">{item.org}</p>
                      <h3 className="font-headline font-bold text-base text-zinc-900 mb-2 leading-snug">{item.title}</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed flex-grow">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── PROJECTS ─── */}
        <section className="py-24 px-8 md:px-12 bg-zinc-900 text-white" id="projects">
          <div className="max-w-5xl mx-auto">
            <SectionHeader dark label="Portfolio" title="Projects" description="Security tools and open-source projects built to solve real-world cybersecurity challenges." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'SentraMind', tech: 'AI · Cybersecurity', desc: 'SentraMind combines advanced AI technology with cybersecurity expertise to provide comprehensive threat detection, log analysis, and security insights for your organization.', icon: 'memory', link: 'https://sentramind.biz.id/', img: 'sentramind.png' },
                { title: 'Fragnesia (CVE-2026-46300)', tech: 'Linux Kernel · LPE · C / Bash', desc: 'Linux Kernel Local Privilege Escalation (LPE) audit & exploit toolkit exploiting a page-cache corruption regression via XFRM ESP-in-TCP (espintcp).', icon: 'terminal', link: 'https://github.com/Kentox493/CVE-2026-46300_Fragnesia' },
                { title: 'NginxRift (CVE-2026-42945)', tech: 'RCE Exploit · Automation · Python / Bash', desc: 'PoC automation driver for heap-based buffer overflow RCE in NGINX Rift container environments, orchestrating preflight checks to interactive reverse-shell.', icon: 'bolt', link: 'https://github.com/Kentox493/CVE-2026-42945_NginxRift' },
                { title: 'S1C0N', tech: 'Reconnaissance · Security', desc: 'Simple recon tool to help you search for vulnerabilities and execute automated reconnaissance on target web servers.', icon: 'radar', link: 'https://github.com/Kentox493/sicon-web', img: 'S1C0N.png' },
                { title: 'ScanexEZ', tech: 'Python · Automation', desc: 'ScanexEZ is an advanced, yet user-friendly, penetration testing tool designed to automate the scanning of URL parameters for common web vulnerabilities.', icon: 'security', link: 'https://github.com/Kentox493/ScanexEZ', img: 'scanexez.png' },
                { title: 'Sercing', tech: 'Python · SerpAPI', desc: 'Automated File Search & Download Tool. Your go-to solution for searching and downloading specific files from a given domain, powered by Google Dorking via SerpAPI.', icon: 'search', link: 'https://github.com/Kentox493/Sercing', img: 'sercing.png' },
                { title: 'Ransom-Simulator', tech: 'Cryptography · RSA-4096', desc: 'A ransomware simulator using the RSA-4096 bits algorithm. It simulates how ransomware works, where victim files are encrypted using RSA encryption and decrypted via private key.', icon: 'lock', link: 'https://github.com/Kentox493/Ransom-Simulator', img: 'ransom.png' },
                { title: 'OSecure', tech: 'GUI · Firewall Config', desc: 'OSecure is a user-friendly GUI application designed to simplify the management and configuration of firewalls across different systems without requiring deep technical knowledge.', icon: 'shield', link: 'https://github.com/Kentox493/OSecure', img: 'osecure.png' },
                { title: 'AESTXT', tech: 'Python · AES', desc: 'AESTXT is a Python tool for AES encryption and decryption, supporting multiple modes of operation (ECB, CBC, CTR, GCM). It securely encrypts/decrypts data with customizable parameters.', icon: 'key', link: 'https://github.com/Kentox493/AESTXT', img: 'AESTXT.jpg' },
              ].map((item, i) => (
                <div key={i} className={`reveal ${i > 0 ? `reveal-delay-${Math.min(i % 3, 2)}` : ''} bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden hover:border-zinc-500 transition-colors duration-300 flex flex-col group`}>
                  <div className="aspect-[2/1] bg-zinc-900 border-b border-zinc-700 relative overflow-hidden flex items-center justify-center">
                    {item.img ? (
                      <img src={`${import.meta.env.BASE_URL}${item.img}`} alt={item.title} className="w-full h-full object-contain p-4" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-900/90 p-4">
                        <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shadow-inner group-hover:border-accent/50 transition-all duration-300">
                          <span className="material-symbols-outlined text-2xl text-zinc-400 group-hover:text-accent transition-colors">{item.icon}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-[10px] text-accent font-semibold tracking-wider uppercase mb-2">{item.tech}</p>
                    <h3 className="font-headline font-bold text-lg text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed flex-grow">{item.desc}</p>
                    <div className="mt-5 pt-4 border-t border-zinc-700">
                      <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer">
                        View Source <span className="material-symbols-outlined text-sm">arrow_outward</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WRITE-UPS ─── */}
        <section className="py-24 px-8 md:px-12 bg-white" id="writeups">
          <div className="max-w-5xl mx-auto">
            <SectionHeader label="Knowledge Sharing" title="Write-ups" description="Detailed technical write-ups documenting vulnerability discoveries, CTF solutions, and security research." />

            {(() => {
              const allWriteups = [
                { title: 'CVE-2025-68613: Authenticated RCE via Expression Injection in n8n', category: 'Vulnerability Research', date: 'Sep 2026', desc: 'In-depth analysis of CVE-2025-68613 in n8n, demonstrating how expression injection enables authenticated attackers to achieve arbitrary Remote Code Execution.', tag: 'CVE', link: 'https://medium.com/@utomoa448/cve-2025-68613-authenticated-remote-code-execution-via-expression-injection-pada-n8n-d05705b74cd6' },
                { title: 'CVE-2025-29927: Next.js Middleware Authorization Bypass', category: 'Vulnerability Research', date: 'Sep 2026', desc: 'Technical breakdown of CVE-2025-29927, analyzing how crafted HTTP headers bypass Next.js middleware security controls to access protected internal routes.', tag: 'CVE', link: 'https://medium.com/@utomoa448/cve-2025-29927-next-js-middleware-bypass-vulnerability-737d8b9d6263' },
                { title: 'CVE-2021-41773: Apache Path Traversal & Remote Code Execution', category: 'Vulnerability Research', date: 'Sep 2026', desc: 'Comprehensive root-cause analysis and exploit reproduction of the Apache 2.4.49 path traversal vulnerability escalating into RCE via mod_cgi.', tag: 'CVE', link: 'https://medium.com/@utomoa448/cve-2021-41773-apache-http-server-path-traversal-remote-code-execution-via-mod-cgi-e9692ceb7e16' },
                { title: 'CVE-2021-35042: Django QuerySet order_by SQL Injection', category: 'Vulnerability Research', date: 'Sep 2026', desc: 'Source-code review and exploit demonstration of CVE-2021-35042 in Django ORM, bypassing column validation to inject arbitrary SQL statements.', tag: 'CVE', link: 'https://medium.com/@utomoa448/cve-2021-35042-django-queryset-order-by-sql-injection-e201381ecc27' },
                { title: 'Missing Person — TryHackMe', category: 'OSINT Investigation', date: 'Sep 2026', desc: 'Practical walkthrough of the Missing Person OSINT investigation on TryHackMe, demonstrating open-source intelligence gathering and digital footprint tracking.', tag: 'OSINT', link: 'https://medium.com/@utomoa448/missing-person-tryhackme-f1605ac5db61' },
                { title: 'Masquerade — TryHackMe Challenge', category: 'Threat Hunting', date: 'Sep 2026', desc: 'Investigating process masquerading and defense evasion techniques through event log correlation and Windows endpoint forensics.', tag: 'Blue Team', link: 'https://medium.com/@utomoa448/masquerade-tryhackme-challenge-f4e2d3952450' },
                { title: 'TShark Challenge II: Directory — TryHackMe', category: 'Packet Analysis', date: 'Sep 2026', desc: 'Advanced command-line network packet analysis with TShark, dissecting SMB/HTTP directory traversal and payload extraction from PCAP dumps.', tag: 'DFIR', link: 'https://medium.com/@utomoa448/tshark-challenge-ii-directory-aaca5294a939' },
                { title: 'TShark Challenge I: Teamwork — TryHackMe', category: 'Network Forensics', date: 'Sep 2026', desc: 'Network packet analysis using TShark CLI to isolate compromised internal nodes, reconstruct TCP streams, and track malicious traffic.', tag: 'DFIR', link: 'https://medium.com/@utomoa448/tshark-challenge-i-teamwork-tryhackme-7e839e3c2168' },
                { title: 'New Hire, Old Artifacts — TryHackMe', category: 'Endpoint Forensics', date: 'Aug 2026', desc: 'Endpoint investigation analyzing forensic artifacts, identifying adversary persistence, and uncovering unauthorized lateral movement.', tag: 'Forensic', link: 'https://medium.com/@utomoa448/new-hire-old-artifacts-tryhackme-0a29459cbfe5' },
                { title: 'Disk Analysis & Autopsy — TryHackMe', category: 'Disk Forensics', date: 'Aug 2026', desc: 'In-depth disk forensics using Autopsy to inspect MFT records, carve unallocated space, and reconstruct attacker timeline activity.', tag: 'Forensic', link: 'https://medium.com/@utomoa448/disk-analysis-autopsy-tryhackme-9d3817344fb3' },
                { title: 'Memory Forensics — TryHackMe Challenge', category: 'Memory Analysis', date: 'Aug 2026', desc: 'Volatile memory investigation utilizing Volatility 3 to uncover memory injection, hidden DLLs, and rootkit activity from raw RAM dumps.', tag: 'Forensic', link: 'https://medium.com/@utomoa448/memory-forensics-tryhackme-challenge-3389779bcc88' },
                { title: 'PS Eclipse — TryHackMe Challenge', category: 'PowerShell Analysis', date: 'Aug 2026', desc: 'Analyzing heavily obfuscated malicious PowerShell scripts, deobfuscating payload layers, and identifying staging C2 infrastructure.', tag: 'Blue Team', link: 'https://medium.com/@utomoa448/ps-eclipse-tryhackme-challenge-eb5aa895e77e' },
                { title: 'Shadow Trace — TryHackMe Challenge', category: 'Threat Hunting', date: 'Aug 2026', desc: 'Adversary tracking and threat intelligence analysis, correlating disparate network logs to identify covert command-and-control beacons.', tag: 'Blue Team', link: 'https://medium.com/@utomoa448/shadow-trace-tryhackme-challenge-f92e90bc4069' },
                { title: 'Secret Recipe — TryHackMe Challenge', category: 'Incident Response', date: 'Aug 2026', desc: 'Digital incident response investigation resolving unauthorized data exfiltration, compromised service credentials, and internal leaks.', tag: 'Blue Team', link: 'https://medium.com/@utomoa448/secret-recipe-tryhackme-challenge-ba79355bae4d' },
                { title: 'ItsyBitsy — TryHackMe Challenge', category: 'SIEM & Log Analysis', date: 'Aug 2026', desc: 'Investigating an incident via Elasticsearch and Kibana, tracking anomalous outbound connections and malicious IP interactions.', tag: 'SOC Ops', link: 'https://medium.com/@utomoa448/itsybitsy-tryhackme-challenge-27df6ee3a3dd' },
                { title: 'Benign — TryHackMe Challenge', category: 'Splunk Alert Triage', date: 'Jul 2026', desc: 'Triage of enterprise security alerts in Splunk, distinguishing benign administrative events from living-off-the-land attacks.', tag: 'SOC Ops', link: 'https://medium.com/@utomoa448/benign-tryhackme-challenge-85fa2cb511b5' },
                { title: 'Investigating with Splunk — TryHackMe', category: 'SIEM Investigation', date: 'Jul 2026', desc: 'Writing custom Splunk search processing language (SPL) queries to investigate a complex enterprise multi-stage cyber attack.', tag: 'SOC Ops', link: 'https://medium.com/@utomoa448/investigating-with-splunk-tryhackme-challenge-7440f7ed83c7' },
                { title: 'Proxy — TryHackMe Challenge', category: 'Web Traffic Forensics', date: 'Jul 2026', desc: 'Forensic audit of forward and reverse HTTP proxy access logs to identify proxy tunneling, unauthorized pivoting, and web attacks.', tag: 'Blue Team', link: 'https://medium.com/@utomoa448/proxy-tryhackme-challenge-149646112815' },
                { title: 'Support — TryHackMe Challenge', category: 'Active Directory', date: 'Jun 2026', desc: 'Penetration testing an Active Directory domain environment, covering SMB enumeration, credential hunting, and Kerberoasting.', tag: 'Red Team', link: 'https://medium.com/@utomoa448/support-tryhackme-challenge-b391803973ee' },
                { title: 'Recruit — TryHackMe Challenge', category: 'Active Directory', date: 'Jun 2026', desc: 'Comprehensive AD exploitation path covering initial foothold, post-exploitation enumeration, and lateral movement to Domain Admin.', tag: 'Red Team', link: 'https://medium.com/@utomoa448/recruit-tryhackme-challenge-35fc7f65385a' },
                { title: 'SOC336 - Windows OLE Zero-Click RCE (CVE-2025-21298)', category: 'Vulnerability Research', date: 'May 2026', desc: 'Investigating and triaging alerts related to CVE-2025-21298 Windows OLE Zero-Click RCE exploitation, identifying payload behaviors and malicious network traces.', tag: 'CVE', link: 'https://medium.com/@utomoa448/soc336-windows-ole-zero-click-rce-exploitation-detected-cve-2025-21298-9212f0eaf4f9' },
                { title: '[ BTLO ] Network Analysis — Ransomware', category: 'Network Analysis', date: 'Jun 2026', desc: 'Deep-dive packet dissection investigating an enterprise ransomware intrusion, analyzing initial delivery vectors and lateral movement.', tag: 'Blue Team', link: 'https://medium.com/@utomoa448/btlo-network-analysis-ransomware-9dfa16574b77' },
                { title: 'SOC127 - SQL Injection Detected', category: 'SOC Operations', date: 'May 2026', desc: 'SOC Tier 1 investigation and verification of SQL injection attempts against web applications, confirming payload efficacy and host impact.', tag: 'SOC Ops', link: 'https://medium.com/@utomoa448/soc127-sql-injection-detected-2a9b619e6571' },
                { title: '[ Writed Up ] Hacktrace Rangers - LogBreaker', category: 'CTF Challenge', date: 'May 2026', desc: 'Technical write-up solving the LogBreaker challenge on Hacktrace Rangers, analyzing application server logs to identify web vulnerabilities.', tag: 'CTF', link: 'https://medium.com/@utomoa448/writed-up-hacktrace-rangers-logbreaker-f02efa1a57e2' },
                { title: '[ Writed Up ] Hacktrace Rangers - PhishHunt', category: 'CTF Challenge', date: 'May 2026', desc: 'Technical write-up solving the PhishHunt challenge on Hacktrace Rangers, inspecting email headers and malicious phishing artifacts.', tag: 'CTF', link: 'https://medium.com/@utomoa448/writed-up-hacktrace-rangers-phishhunt-84821dbed70f' },
                { title: 'Zerobank Lab Pentest', category: 'Web Pentest', date: 'Mar 2026', desc: 'A lab penetration testing report on the Zero Bank security environment, detailing discovery and exploitation of critical vulnerabilities.', tag: 'Lab', link: 'https://docs.google.com/document/d/1CBzjlEOUZx5HShZWMG9aT-OmagdKzjkv/edit' },
                { title: 'Wazuh SIEM Deployment: SOC Lab Setup Guide', category: 'SOC Operations', date: 'Feb 2026', desc: 'A technical step-by-step guide on the deployment and configuration of Wazuh SIEM within a simulated SOC laboratory environment.', tag: 'Guide', link: 'https://drive.google.com/file/d/1juSU0ALh7sluLPbIi7N83WgdyvT8WFGY/view?usp=sharing' },
                { title: 'Removable Media Forensics: Suspicious USB Artifact Recovery', category: 'Digital Forensic', date: 'Jan 2026', desc: 'A digital forensic examination of a suspicious USB drive, detailing bit-stream imaging and file carving to recover hidden artifacts.', tag: 'Forensic', link: 'https://docs.google.com/document/d/1HLeld6BUaaWGiYgWNAHWK6pdiW7pkn-r/edit?usp=sharing&ouid=101223023870245930597&rtpof=true&sd=true' },
                { title: 'Digital Image Forensics: Metadata Analysis & Source Verification', category: 'Digital Forensic', date: 'Dec 2025', desc: 'Technical forensic analysis of digital images utilizing metadata extraction and hex-level examination to trace origins and verify authenticity.', tag: 'Analysis', link: 'https://docs.google.com/document/d/1zA9IwMc41y55aXBN4Z2THU9n5o_tW1FF/edit?usp=sharing&ouid=101223023870245930597&rtpof=true&sd=true' },
                { title: 'Identifying Internal Intruders via Network and File Analysis', category: 'Digital Forensic', date: 'Oct 2025', desc: 'A formal forensic investigation identifying an internal intruder through network traffic decryption (PCAP) and credential recovery.', tag: 'Pro Justitia', link: 'https://docs.google.com/document/d/1VP7MZlxXiRGuFMXlFa6psOqn14ktm-Sb/edit?usp=sharing&ouid=101223023870245930597&rtpof=true&sd=true' },
                { title: 'Leveraging OSINT Methodologies for Target Profiling', category: 'OSINT · Recon', date: 'Sep 2025', desc: 'A technical OSINT investigation on target profiling and digital footprint analysis using Google Dorking, Spiderfoot, and Wayback Machine.', tag: 'Recon', link: 'https://drive.google.com/file/d/16DdlbTDEpY1djrrCGm_XyxCmiN_q-GVk/view?usp=sharing' },
                { title: 'SOC Incident Triage & Log Analysis: Monitoring System Exploitation Attempts', category: 'SOC Ops · Triage', date: 'Aug 2025', desc: 'A security log analysis and triage report identifying multi-vector attacks including SSH Brute Forcing and Nikto scans.', tag: 'SOC Ops', link: 'https://docs.google.com/spreadsheets/d/1JwKvvVSYWvpcMNKLUtpAC8pRZ0zOadUB/edit?usp=sharing&ouid=101223023870245930597&rtpof=true&sd=true' },
                { title: 'Memory Forensics: Wanacrypt0r (WannaCry) Lifecycle Analysis', category: 'Incident Response', date: 'Nov 2025', desc: 'A volatile memory investigation of a system compromised by the Wanacrypt0r ransomware, dissecting malicious injects and artifacts.', tag: 'Forensic', link: 'https://drive.google.com/file/d/1KoYAIIC-NRcG5BJDXLq6BOjyPaBZ8KMp/view?usp=sharing' },
                { title: 'Investigating Internal SSH Log Anomalies & User Enumeration', category: 'Digital Forensic · SSH', date: 'Jul 2025', desc: 'A formal digital forensic investigation under a Pro Justitia framework to analyze SSH log activity and identify intruder IPs.', tag: 'Pro Justitia', link: 'https://docs.google.com/document/d/1BUpJQ9_6cnVGezdZ9VnRoQ-drHDs8VIb/edit?usp=sharing&ouid=101223023870245930597&rtpof=true&sd=true' },
              ];

              const itemsPerPage = 6;
              const totalPages = Math.ceil(allWriteups.length / itemsPerPage);
              const currentPage = Math.min(Math.max(1, writeupPage), totalPages);
              const startIndex = (currentPage - 1) * itemsPerPage;
              const currentItems = allWriteups.slice(startIndex, startIndex + itemsPerPage);

              const handlePageChange = (newPage: number) => {
                setWriteupPage(newPage);
                const el = document.getElementById('writeups');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              };

              return (
                <>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-100 text-xs text-zinc-500">
                    <span>
                      Showing <strong className="text-zinc-800 font-semibold">{startIndex + 1}–{Math.min(startIndex + itemsPerPage, allWriteups.length)}</strong> of <strong className="text-zinc-800 font-semibold">{allWriteups.length}</strong> publications
                    </span>
                    <span>
                      Page <strong className="text-zinc-800 font-semibold">{currentPage}</strong> of <strong className="text-zinc-800 font-semibold">{totalPages}</strong>
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentItems.map((item, i) => (
                      <a key={`${currentPage}-${i}`} href={item.link} target="_blank" rel="noreferrer" className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-6 flex flex-col hover:border-zinc-400 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 group cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-md ${
                            item.tag === 'CVE' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                            item.tag === 'Red Team' ? 'bg-red-50 text-red-600 border border-red-100' :
                            item.tag === 'SOC Ops' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                            item.tag === 'Blue Team' ? 'bg-sky-50 text-sky-600 border border-sky-100' :
                            item.tag === 'DFIR' ? 'bg-violet-50 text-violet-600 border border-violet-100' :
                            item.tag === 'OSINT' ? 'bg-teal-50 text-teal-600 border border-teal-100' :
                            item.tag === 'Pro Justitia' ? 'bg-red-50 text-red-600 border border-red-100' :
                            item.tag === 'Forensic' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                            item.tag === 'CTF' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                            item.tag === 'Lab' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                            item.tag === 'Guide' ? 'bg-sky-50 text-sky-600 border border-sky-100' :
                            item.tag === 'Analysis' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                            item.tag === 'Recon' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                            'bg-accent/5 text-accent border border-accent/10'
                          }`}>{item.tag}</span>
                          <span className="text-[11px] text-zinc-400 font-medium">{item.date}</span>
                        </div>
                        <p className="text-[10px] text-accent font-semibold tracking-wider uppercase mb-1">{item.category}</p>
                        <h3 className="font-headline font-bold text-base text-zinc-900 mb-2 leading-snug group-hover:text-accent transition-colors duration-200">{item.title}</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed flex-grow line-clamp-3">{item.desc}</p>
                        <div className="mt-4 pt-4 border-t border-zinc-200/60 flex items-center justify-between">
                          <span className="text-xs font-medium text-zinc-500 group-hover:text-accent transition-colors duration-200 flex items-center gap-1">
                            Read Report <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                        <span>Prev</span>
                      </button>

                      {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
                        <button
                          key={p}
                          onClick={() => handlePageChange(p)}
                          className={`w-9 h-9 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            currentPage === p
                              ? 'bg-zinc-900 text-white shadow-sm'
                              : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300'
                          }`}
                        >
                          {p}
                        </button>
                      ))}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>Next</span>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="py-10 bg-zinc-950 text-white px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <span className="text-base font-headline font-bold tracking-tight">AWU<span className="text-accent">.</span></span>
            <p className="text-xs text-zinc-500 mt-1">© {new Date().getFullYear()} Arya Widyanto Utomo. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a className="text-xs font-medium text-zinc-500 hover:text-white transition-colors" href="mailto:utomoa448@gmail.com">Email</a>
            <a className="text-xs font-medium text-zinc-500 hover:text-white transition-colors" href="https://www.linkedin.com/in/arya-widyanto-utomo-873100288" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* ─── PROOF / IMAGE PREVIEW MODAL ─── */}
      {previewModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setPreviewModal(null)}
        >
          <div
            className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh] animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 px-6 border-b border-zinc-800 bg-zinc-900">
              <div>
                <h4 className="text-white font-headline font-bold text-base md:text-lg">{previewModal.title}</h4>
                {previewModal.subtitle && (
                  <p className="text-xs text-zinc-400 mt-0.5">{previewModal.subtitle}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`${import.meta.env.BASE_URL}${previewModal.img}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors flex items-center gap-1.5 text-xs font-medium"
                  title="Open full size in new tab"
                >
                  <span className="material-symbols-outlined text-base">open_in_new</span>
                  <span className="hidden sm:inline">Buka Tab Baru</span>
                </a>
                <button
                  onClick={() => setPreviewModal(null)}
                  className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                  aria-label="Close preview"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>
            </div>
            <div className="p-2 sm:p-6 bg-zinc-950/80 flex items-center justify-center overflow-auto">
              <img
                src={`${import.meta.env.BASE_URL}${previewModal.img}`}
                alt={previewModal.title}
                className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain shadow-2xl border border-zinc-800"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
