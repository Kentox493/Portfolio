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

  const [exp1Slide, setExp1Slide] = useState(0);
  const [exp2Slide, setExp2Slide] = useState(0);
  const [doscomSlide, setDoscomSlide] = useState(0);
  const exp1Photos = ['teknologiserverindonesia1.jpeg', 'teknologiserverindonesia2.jpeg'];
  const exp2Photos = ['rsud1.jpg', 'rsud2.jpg', 'rsud3.jpg', 'rsud4.jpeg', 'rsud5.jpeg'];
  const doscomPhotos = ['doscom2.jpeg', 'doscom3.jpeg', 'doscom4.jpeg', 'doscom5.jpeg', 'doscom6.jpeg', 'doscom7.jpeg', 'doscom8.jpeg', 'doscom9.jpeg'];

  const achievements = [
    { company: 'OpenAI', year: '2026', desc: 'Inducted into the OpenAI Hall of Fame for reporting valid security vulnerabilities within their infrastructure.', type: 'Hall of Fame Inductee', img: 'hof-openai.jpg' },
    { company: 'Perplexity AI', year: '2026', desc: 'Recognized in the Perplexity AI Hall of Fame for contributing successful security bug submissions.', type: 'Hall of Fame', img: 'hof-perplexity.jpg' },
    { company: 'Samsung Mobile', year: '2026', desc: 'Awarded a bounty by Samsung Mobile for identifying vulnerabilities in their self-hosted bug bounty program.', type: 'Bug Bounty Award', isBounty: true, img: 'hof-samsung.jpg' },
    { company: 'Arc Browser', year: '2025', desc: 'Achieved the #10 spot in "The Browser of NYC" Hall of Fame for reporting multiple valid flaws in Arc Browser.', type: 'Top 10 Researcher', img: 'hof-browsercompany.webp' },
    { company: 'Brave Software', year: '2025', desc: 'Listed in the Brave Software Bug Hunter Hall of Fame following successful vulnerability disclosures.', type: 'Bug Hunter Hall of Fame', img: 'hof-brave.jpg' },
  ];

  const certs = [
    { cert: 'CNSP', name: 'Network Security Practitioner', org: 'The SecOps Group', img: 'CNSP.jpg' },
    { cert: 'C3SA', name: 'Cyber Security Analyst', org: 'CyberWarfare Labs', img: 'C3SA.jpg' },
    { cert: 'FCA', name: 'Fortinet Certified Associate', org: 'Fortinet', img: 'FCA.jpg' },
    { cert: 'JWD', name: 'Junior Web Developer', org: 'BNSP' },
  ];

  const navItems = [
    { label: 'Expertise', id: 'expertise' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Write-ups', id: 'writeups' },
    { label: 'Credentials', id: 'credentials' },
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
              href="https://drive.google.com/file/d/1Z6-LD_EhMWkpPAvYzOfaXdyu6Qcsa5vH/view?usp=sharing"
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
          </div>
        )}
      </header>

      <main>
        {/* ─── HERO ─── */}
        <section className="relative pt-32 pb-20 md:pt-32 md:pb-28 px-8 md:px-12 bg-zinc-50 overflow-hidden">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="reveal inline-flex items-center gap-2 px-3 py-1 bg-white border border-zinc-200 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-zinc-600 font-medium text-xs">Available for engagements</span>
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
                <a href="https://drive.google.com/file/d/1Z6-LD_EhMWkpPAvYzOfaXdyu6Qcsa5vH/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="bg-white text-zinc-900 border border-zinc-200 px-6 py-3 rounded-lg font-semibold text-sm hover:bg-zinc-50 transition-colors duration-200 flex items-center gap-2 cursor-pointer">
                  <span className="material-symbols-outlined text-base">download</span>
                  Download CV
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

        {/* ─── HALL OF FAME ─── */}
        <section className="py-24 px-8 md:px-12 bg-zinc-900 text-white" id="achievements">
          <div className="max-w-5xl mx-auto">
            <SectionHeader dark label="Security Recognition" title="Hall of Fame" description="Recognized by world-class tech companies for identifying and responsibly disclosing critical security vulnerabilities." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((a, i) => (
                <div key={i} className={`reveal ${i > 0 ? `reveal-delay-${Math.min(i, 5)}` : ''} bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden hover:border-zinc-500 transition-colors duration-300 flex flex-col`}>
                  <div className="w-full aspect-[16/10] relative overflow-hidden bg-zinc-900 border-b border-zinc-700">
                    <img src={`${import.meta.env.BASE_URL}${a.img}`} alt={a.company} className="w-full h-full object-cover" loading="lazy" />
                    <span className="absolute top-4 right-4 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md bg-zinc-100 text-zinc-900 border border-transparent">
                      {a.year}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-headline font-bold text-xl text-white mb-2">{a.company}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed flex-grow">{a.desc}</p>
                    <div className="mt-5 pt-4 border-t border-zinc-700">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium block mb-1">Achievement</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">{a.type}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Stats card */}
              <div className="reveal reveal-delay-5 bg-zinc-800 border border-zinc-700 rounded-2xl flex flex-col items-center justify-center text-center p-10 min-h-[380px] hover:border-zinc-500 transition-colors duration-300">
                <span className="material-symbols-outlined text-4xl text-zinc-500 mb-4">public</span>
                <span className="font-headline font-extrabold text-6xl text-white mb-2">5+</span>
                <span className="text-accent font-semibold text-xs tracking-widest uppercase mb-3">Global Programs</span>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-[240px]">Proven track record across leading international bug bounty platforms worldwide.</p>
              </div>
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
                { title: 'S1C0N', tech: 'Reconnaissance · Security', desc: 'Simple recon tool to help you search for vulnerabilities and execute automated reconnaissance on target web servers.', icon: 'radar', link: 'https://github.com/Kentox493/sicon-web', img: 'S1C0N.png' },
                { title: 'Sercing', tech: 'Python · SerpAPI', desc: 'Automated File Search & Download Tool. Your go-to solution for searching and downloading specific files from a given domain, powered by Google Dorking via SerpAPI.', icon: 'search', link: 'https://github.com/Kentox493/Sercing', img: 'sercing.png' },
                { title: 'ScanexEZ', tech: 'Python · Automation', desc: 'ScanexEZ is an advanced, yet user-friendly, penetration testing tool designed to automate the scanning of URL parameters for common web vulnerabilities.', icon: 'security', link: 'https://github.com/Kentox493/ScanexEZ', img: 'scanexez.png' },
                { title: 'Ransom-Simulator', tech: 'Cryptography · RSA-4096', desc: 'A ransomware simulator using the RSA-4096 bits algorithm. It simulates how ransomware works, where victim files are encrypted using RSA encryption and decrypted via private key.', icon: 'lock', link: 'https://github.com/Kentox493/Ransom-Simulator', img: 'ransom.png' },
                { title: 'OSecure', tech: 'GUI · Firewall Config', desc: 'OSecure is a user-friendly GUI application designed to simplify the management and configuration of firewalls across different systems without requiring deep technical knowledge.', icon: 'shield', link: 'https://github.com/Kentox493/OSecure', img: 'osecure.png' },
                { title: 'AESTXT', tech: 'Python · AES', desc: 'AESTXT is a Python tool for AES encryption and decryption, supporting multiple modes of operation (ECB, CBC, CTR, GCM). It securely encrypts/decrypts data with customizable parameters.', icon: 'key', link: 'https://github.com/Kentox493/AESTXT', img: 'AESTXT.jpg' },
              ].map((item, i) => (
                <div key={i} className={`reveal ${i > 0 ? `reveal-delay-${Math.min(i % 3, 2)}` : ''} bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden hover:border-zinc-500 transition-colors duration-300 flex flex-col`}>
                  <div className="aspect-[2/1] bg-zinc-900 border-b border-zinc-700 relative overflow-hidden flex items-center justify-center">
                    {item.img ? (
                      <img src={`${import.meta.env.BASE_URL}${item.img}`} alt={item.title} className="w-full h-full object-contain p-4" loading="lazy" />
                    ) : (
                      <span className="material-symbols-outlined text-4xl text-zinc-600">{item.icon}</span>
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: '[ BTLO ] Network Analysis — Ransomware', category: 'Network Analysis', date: 'Jun 2026', desc: 'Description: ABC Industries worked day and night for a month to prepare a tender document for a prestigious project that would...', tag: 'Blue Team', link: 'https://medium.com/@utomoa448/btlo-network-analysis-ransomware-9dfa16574b77' },
                { title: 'SOC127 - SQL Injection Detected', category: 'SOC Operations', date: 'May 2026', desc: 'I am an SOC Analyst L1 ( Lets Defend Practice ), at this moment I got an alert related to SQL Injection, I will make a documentation...', tag: 'Blue Team', link: 'https://medium.com/@utomoa448/soc127-sql-injection-detected-2a9b619e6571' },
                { title: 'SOC336 - Windows OLE Zero-Click RCE Exploitation Detected (CVE-2025-21298)', category: 'SOC Operations', date: 'May 2026', desc: 'I am an SOC Analyst L1 ( Lets Defend Practice ), at this moment I got an alert related to CVE-2025-21298, I will make a...', tag: 'Blue Team', link: 'https://medium.com/@utomoa448/soc336-windows-ole-zero-click-rce-exploitation-detected-cve-2025-21298-9212f0eaf4f9' },
                { title: '[ Writed Up ] Hacktrace Rangers - LogBreaker', category: 'CTF Writeup', date: 'May 2026', desc: 'Challenge Description : Karina, a web programmer, has completed a web server development project for her company...', tag: 'CTF', link: 'https://medium.com/@utomoa448/writed-up-hacktrace-rangers-logbreaker-f02efa1a57e2' },
                { title: '[ Writed Up ] Hacktrace Rangers - PhishHunt', category: 'CTF Writeup', date: 'May 2026', desc: 'Challenge Description : A technical write-up for the PhishHunt challenge on the Hacktrace Rangers platform.', tag: 'CTF', link: 'https://medium.com/@utomoa448/writed-up-hacktrace-rangers-phishhunt-84821dbed70f' },
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
                <a key={i} href={item.link} target="_blank" rel="noreferrer" className={`reveal ${i > 0 ? `reveal-delay-${Math.min(i % 3, 2)}` : ''} bg-zinc-50 border border-zinc-100 rounded-2xl p-6 flex flex-col hover:border-zinc-300 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group cursor-pointer`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded ${
                      item.tag === 'Pro Justitia' ? 'bg-red-50 text-red-600' :
                      item.tag === 'Forensic' ? 'bg-purple-50 text-purple-600' :
                      item.tag === 'CTF' ? 'bg-amber-50 text-amber-600' :
                      item.tag === 'Lab' ? 'bg-emerald-50 text-emerald-600' :
                      item.tag === 'Guide' ? 'bg-sky-50 text-sky-600' :
                      item.tag === 'Analysis' ? 'bg-indigo-50 text-indigo-600' :
                      item.tag === 'Recon' ? 'bg-orange-50 text-orange-600' :
                      'bg-accent/5 text-accent'
                    }`}>{item.tag}</span>
                    <span className="text-[11px] text-zinc-400 font-medium">{item.date}</span>
                  </div>
                  <p className="text-[10px] text-accent font-semibold tracking-wider uppercase mb-1">{item.category}</p>
                  <h3 className="font-headline font-bold text-base text-zinc-900 mb-2 leading-snug group-hover:text-accent transition-colors duration-200">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed flex-grow line-clamp-3">{item.desc}</p>
                  <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-400 group-hover:text-accent transition-colors duration-200 flex items-center gap-1">
                      Read Report <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                    </span>
                  </div>
                </a>
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
                <div key={i} className={`reveal ${i > 0 ? `reveal-delay-${Math.min(i, 5)}` : ''} bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden hover:border-zinc-500 transition-colors duration-300 flex flex-col`}>
                  <div className="aspect-[4/3] bg-zinc-100 border-b border-zinc-700 relative overflow-hidden flex items-center justify-center">
                    {item.img ? (
                      <img src={`${import.meta.env.BASE_URL}${item.img}`} alt={item.cert} className="w-full h-full object-contain p-6" loading="lazy" />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-zinc-400">
                        <span className="material-symbols-outlined text-4xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                        <span className="text-[10px] font-medium tracking-wider uppercase">Verified Credential</span>
                      </div>
                    )}
                    <span className="absolute top-4 right-4 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md bg-accent text-white">Verified</span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-headline font-bold text-xl text-white mb-1">{item.cert}</h3>
                    <p className="text-zinc-400 text-sm mb-4">{item.name}</p>
                    <div className="mt-auto pt-4 border-t border-zinc-700">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium block mb-1">Issuing Organization</span>
                      <span className="text-xs font-semibold text-accent">{item.org}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
            <a className="text-xs font-medium text-zinc-500 hover:text-white transition-colors" href="https://tinyurl.com/mry5bad3" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
