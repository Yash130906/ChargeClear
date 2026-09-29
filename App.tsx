import { ChangeEvent, DragEvent, useEffect, useRef, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, Check, CheckCircle2, ChevronDown, CircleHelp, Clock3,
  FileCheck2, FileText, Fingerprint, Flag, Globe2, Info, LockKeyhole, Menu, MessageSquareText,
  Minus, MoveUpRight, Play, Plus, RefreshCw, Scale, ShieldCheck, Sparkles, Trash2, UploadCloud,
  UserRound, X, Zap,
} from 'lucide-react';

type DemoState = 'idle' | 'processing' | 'complete';
type ProcessingStep = { label: string; detail: string; done: boolean; active: boolean };

const processingSteps = [
  ['Securing your document', 'Encrypted in transit.'],
  ['Reading the structure', 'Finding sections, dates and parties.'],
  ['Checking the context', 'Matching language to reviewed sources.'],
  ['Building your clarity map', 'Separating facts from allegations.'],
];

const fields = [
  { label: 'Document type', value: 'Court summons', tone: 'teal' },
  { label: 'Reference number', value: 'CC / 2025 / 01482', tone: 'ink' },
  { label: 'Issued to', value: 'A. Rao', tone: 'ink' },
  { label: 'Court / authority', value: 'District Civil Court', tone: 'ink' },
  { label: 'Response date', value: '18 October 2025', tone: 'coral' },
  { label: 'Confidence', value: '91% · high', tone: 'teal' },
];

const checklist = [
  { title: 'Note the response date', body: 'Write it somewhere you will see it. ChargeClear cannot file or respond for you.', urgent: true },
  { title: 'Keep the full document', body: 'Save the original summons and any envelope or delivery details with it.', urgent: false },
  { title: 'Ask a qualified person', body: 'A legal-aid clinic or lawyer can help you understand how your situation applies.', urgent: false },
];

function Brand({ light = false }: { light?: boolean }) {
  return <a href="#top" className={`brand ${light ? 'brand-light' : ''}`} aria-label="ChargeClear home">
    <span className="brand-mark"><span></span><i></i></span><span>Charge<span>Clear</span></span>
  </a>;
}

function App() {
  const demoRef = useRef<HTMLElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [demoState, setDemoState] = useState<DemoState>('idle');
  const [selectedFile, setSelectedFile] = useState<string>('your-document.pdf');
  const [progress, setProgress] = useState(0);
  const [feedback, setFeedback] = useState<'helpful' | 'unclear' | null>(null);
  const [showSources, setShowSources] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (demoState !== 'processing') return;
    const started = Date.now();
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - started;
      const next = Math.min(100, Math.round((elapsed / 3600) * 100));
      setProgress(next);
      if (next >= 100) {
        window.clearInterval(timer);
        window.setTimeout(() => setDemoState('complete'), 420);
      }
    }, 80);
    return () => window.clearInterval(timer);
  }, [demoState]);

  const scrollToDemo = () => demoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const startDemo = (name = 'your-document.pdf') => {
    setSelectedFile(name);
    setProgress(0);
    setFeedback(null);
    setShowSources(false);
    setDemoState('processing');
  };
  const handleFile = (file?: File) => {
    if (!file) return;
    const allowed = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowed.includes(file.type)) return;
    startDemo(file.name);
  };
  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => handleFile(event.target.files?.[0]);
  const onDrop = (event: DragEvent<HTMLDivElement>) => { event.preventDefault(); handleFile(event.dataTransfer.files?.[0]); };

  return <div className="app-shell" id="top">
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className={menuOpen ? 'mobile-open' : ''}>
          <a href="#why" onClick={() => setMenuOpen(false)}>Why ChargeClear</a>
          <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#trust" onClick={() => setMenuOpen(false)}>Our promise</a>
          <a href="#demo" className="nav-cta" onClick={(event) => { event.preventDefault(); setMenuOpen(false); scrollToDemo(); }}>Try the demo <ArrowUpRight size={15} /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </header>

    <main>
      <section className="hero-section">
        <div className="hero-orb orb-a"></div><div className="hero-orb orb-b"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot"></span>Legal clarity, without the legalese</div>
            <h1>The document is hard enough. <em>Understanding it shouldn’t be.</em></h1>
            <p className="hero-lede">ChargeClear turns a confusing legal document into a plain-language explanation, a source trail you can inspect, and a clearer idea of what to look into next.</p>
            <div className="hero-actions"><button className="button button-primary" onClick={scrollToDemo}>See how it works <ArrowRight size={17} /></button><a className="text-link" href="#how">Explore the approach <ArrowUpRight size={16} /></a></div>
            <div className="hero-trust"><span><LockKeyhole size={14} /> Privacy-first by design</span><span><ShieldCheck size={14} /> Sources, not guesses</span></div>
          </div>
          <div className="hero-visual" aria-label="ChargeClear product preview">
            <div className="visual-glow"></div>
            <div className="floating-note note-top"><span className="note-icon coral"><Clock3 size={15} /></span><div><strong>18 Oct</strong><small>response date found</small></div></div>
            <div className="product-card">
              <div className="product-top"><span className="mini-brand"><span className="mini-mark"></span> ChargeClear</span><span className="secure-pill"><LockKeyhole size={11} /> private</span></div>
              <div className="card-kicker">DOCUMENT CLARITY MAP <span>01 / 04</span></div>
              <div className="doc-title-row"><div className="doc-icon"><FileText size={20} /></div><div><h3>Court summons</h3><p>your-document.pdf · just now</p></div><span className="confidence-chip"><span></span>91%</span></div>
              <div className="preview-lines"><span></span><span></span><span></span><span className="short"></span></div>
              <div className="preview-result"><div className="result-check"><Check size={15} /></div><div><strong>Here’s the short version</strong><p>This appears to be a formal notice asking you to attend or respond to a court matter.</p></div></div>
              <div className="card-footer"><span><Sparkles size={13} /> explained in plain language</span><ArrowUpRight size={15} /></div>
            </div>
            <div className="floating-note note-bottom"><div className="stack-avatars"><span>AR</span><span>+</span></div><div><strong>Human help, when it matters</strong><small>resources are part of the map</small></div></div>
          </div>
        </div>
        <div className="container hero-foot"><span>BUILT FOR THE MOMENT AFTER “WHAT IS THIS?”</span><span className="hero-foot-line"></span><span>Lexcelerate '26 · Access to Justice</span></div>
      </section>

      <section className="logo-strip"><div className="container strip-inner"><span>Designed around real friction</span><span className="strip-divider"></span><span>Plain language</span><span>Source-grounded</span><span>Human escalation</span><span>Mobile-first</span></div></section>

      <section className="section problem-section" id="why"><div className="container">
        <div className="section-heading split-heading"><div><div className="eyebrow dark"><span className="eyebrow-dot"></span>The gap is not always information</div><h2>It’s knowing <em>which information</em> applies.</h2></div><p>Legal systems can be difficult to navigate even when rights and resources exist. ChargeClear starts with the document in front of you and works outward—carefully.</p></div>
        <div className="friction-grid"><div className="friction-card"><span className="friction-number">01</span><div className="friction-icon"><MessageSquareText size={22} /></div><h3>“What does this mean?”</h3><p>Translate legal terms into language you can actually use, without sanding away the meaning.</p><span className="friction-arrow"><ArrowUpRight size={17} /></span></div><div className="friction-card highlighted"><span className="friction-number">02</span><div className="friction-icon"><Flag size={22} /></div><h3>“What am I being asked to do?”</h3><p>Find the dates, sections, parties and requests that matter so the next step is less abstract.</p><span className="friction-arrow"><ArrowUpRight size={17} /></span></div><div className="friction-card"><span className="friction-number">03</span><div className="friction-icon"><UserRound size={22} /></div><h3>“When should I ask for help?”</h3><p>Know where automated explanation stops and a qualified person should enter the picture.</p><span className="friction-arrow"><ArrowUpRight size={17} /></span></div></div>
      </div></section>

      <section className="section dark-section" id="how"><div className="container"><div className="section-heading centered light"><div className="eyebrow"><span className="eyebrow-dot"></span>A calmer path through the document</div><h2>From <em>“I received this”</em><br />to “I know what to look into next.”</h2><p>One focused workflow. Clear labels. No false certainty.</p></div><div className="steps-grid">{['Upload','Extract','Explain','Verify','Navigate','Escalate'].map((step, index) => <div className="step-item" key={step}><div className="step-top"><span>0{index + 1}</span>{index < 5 && <span className="step-connector"></span>}</div><div className="step-symbol">{index === 0 ? <UploadCloud /> : index === 1 ? <FileCheck2 /> : index === 2 ? <Sparkles /> : index === 3 ? <ShieldCheck /> : index === 4 ? <MoveUpRight /> : <Scale />}</div><h3>{step}</h3><p>{['Securely submit a PDF or image.', 'Find key fields and structure.', 'Make the language easier to follow.', 'Show sources and uncertainty.', 'Turn context into general next steps.', 'Route to human and legal-aid resources.'][index]}</p></div>)}</div></div></section>

      <section className="section promise-section" id="trust"><div className="container promise-grid"><div className="promise-copy"><div className="eyebrow dark"><span className="eyebrow-dot"></span>The ChargeClear promise</div><h2>Helpful enough to move forward. <em>Careful enough to trust.</em></h2><p>We believe uncertainty is a feature. ChargeClear separates what a document says, what it alleges, what a source explains, and what still needs a human eye.</p><a href="#demo" className="text-link dark-link" onClick={(event) => { event.preventDefault(); scrollToDemo(); }}>Try the clarity map <ArrowRight size={16} /></a></div><div className="principles-list"><div className="principle"><span className="principle-mark"><Check size={16} /></span><div><h3>Explain, don’t impersonate counsel</h3><p>Information and navigation—not representation or a legal outcome.</p></div></div><div className="principle"><span className="principle-mark"><Check size={16} /></span><div><h3>Separate facts from allegations</h3><p>Labels matter. A statement in a document is not a finding of truth.</p></div></div><div className="principle"><span className="principle-mark"><Check size={16} /></span><div><h3>Show the source trail</h3><p>Material explanations point back to a named, reviewed source where possible.</p></div></div><div className="principle"><span className="principle-mark"><Check size={16} /></span><div><h3>Keep sensitive data minimal</h3><p>Delete your document from the demo at any time. No attorney-client privilege claim.</p></div></div></div></div></section>

      <section className="section demo-section" id="demo" ref={demoRef}><div className="container"><div className="demo-intro"><div><div className="eyebrow dark"><span className="eyebrow-dot"></span>Try the product story</div><h2>See a document become <em>a clarity map.</em></h2></div><p>Use the sample to explore the full experience. This demo uses fictional data and does not provide legal advice.</p></div>
        <div className={`demo-workspace ${demoState}`}>
          <div className="demo-sidebar"><div className="demo-side-label">ANALYSIS FLOW</div>{['Upload','Extract','Explain','Verify','Navigate','Escalate'].map((step, i) => <div className={`side-step ${(demoState === 'complete' && i < 6) || (demoState === 'processing' && i < Math.ceil(progress / 20)) ? 'done' : ''} ${demoState === 'processing' && i === Math.min(3, Math.floor(progress / 26)) ? 'active' : ''}`} key={step}><span>{(demoState === 'complete' || (demoState === 'processing' && i < Math.ceil(progress / 20))) ? <Check size={13} /> : `0${i + 1}`}</span>{step}</div>)}<div className="side-privacy"><LockKeyhole size={14} /><span><strong>Private by design</strong><small>Fictional demo data · delete anytime</small></span></div></div>
          <div className="demo-main">
            {demoState === 'idle' && <div className="intake-view"><div className="intake-copy"><span className="demo-badge"><Zap size={13} /> SECURE INTAKE</span><h3>Start with the document<br />you’re looking at.</h3><p>Upload a legal document and we’ll show how the clarity map works. Your real file is never sent in this demo.</p></div><div className="dropzone" onDrop={onDrop} onDragOver={(event) => event.preventDefault()} onClick={() => fileInput.current?.click()} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") fileInput.current?.click(); }} role="button" tabIndex={0} aria-label="Upload a PDF or image legal document"><input ref={fileInput} type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" onChange={onFileChange} /><UploadCloud size={27} /><strong>Drop a PDF or image here</strong><span>or click to choose a file · PDF, JPG, PNG</span><button className="button button-primary small" onClick={(event) => { event.stopPropagation(); startDemo(); }}>Use the sample document <Play size={14} fill="currentColor" /></button></div><div className="demo-disclaimer"><Info size={14} /> In a real account, documents would be encrypted in transit and stored only according to your retention settings.</div></div>}
            {demoState === 'processing' && <div className="processing-view"><div className="processing-header"><span className="demo-badge"><Sparkles size={13} /> ANALYZING SECURELY</span><span className="processing-percent">{progress}%</span></div><h3>Making the legal language<br /><em>easier to work with.</em></h3><p className="processing-file"><FileText size={15} /> {selectedFile}</p><div className="progress-track"><span style={{ width: `${progress}%` }}></span></div><div className="processing-list">{processingSteps.map((step, i) => { const done = progress >= (i + 1) * 25; const active = !done && progress >= i * 25; return <div className={`processing-step ${done ? 'done' : ''} ${active ? 'active' : ''}`} key={step[0]}><span className="processing-check">{done ? <Check size={13} /> : active ? <span className="pulse-dot"></span> : <span></span>}</span><div><strong>{step[0]}</strong><small>{step[1]}</small></div>{done && <span className="step-time">done</span>}</div>})}</div><div className="processing-note"><Info size={14} /> This is a fictional result to show the product flow.</div></div>}
            {demoState === 'complete' && <div className="result-view"><div className="result-header"><div><span className="demo-badge"><CheckCircle2 size={13} /> CLARITY MAP READY</span><h3>This appears to be a <em>court summons.</em></h3><p>We’re 91% confident based on the document structure and language.</p></div><button className="icon-button" aria-label="Delete document" onClick={() => setDemoState('idle')}><Trash2 size={16} /></button></div><div className="result-grid"><div className="result-column"><div className="result-card"><div className="card-header"><span>WHAT WE FOUND</span><span className="confidence-label"><span></span>91% confidence</span></div><div className="fields-grid">{fields.map((field) => <div className="field" key={field.label}><span>{field.label}</span><strong className={field.tone}>{field.value}</strong></div>)}</div><div className="uncertainty-note"><CircleHelp size={16} /><span><strong>Worth checking:</strong> The exact response process depends on your situation and local rules. A qualified person can help confirm it.</span></div></div><div className="result-card explanation-card"><div className="card-header"><span>THE SHORT VERSION</span><span className="source-tag"><FileCheck2 size={12} /> Source-grounded</span></div><p className="explanation-lede">This document appears to be a formal notice connected to a civil court matter. It says you are expected to pay attention to the matter and may need to attend or respond by the date shown.</p><div className="labelled-lines"><div><span className="label fact">DOCUMENT STATEMENT</span><p>“The recipient is directed to appear before the District Civil Court.”</p></div><div><span className="label allegation">ALLEGATION</span><p>The document references a claim. A claim is not the same as a court finding.</p></div><div><span className="label unknown">NOT YET KNOWN</span><p>ChargeClear cannot tell whether the claim is correct or what outcome may follow.</p></div></div><button className="source-toggle" onClick={() => setShowSources(!showSources)}>{showSources ? 'Hide source trail' : 'View source trail'} <ChevronDown size={15} className={showSources ? 'rotated' : ''} /></button>{showSources && <div className="source-trail"><div className="source-row"><span className="source-dot"></span><div><strong>Indian Code of Civil Procedure, 1908</strong><small>Order V · reviewed reference for summons context</small></div><ArrowUpRight size={14} /></div><div className="source-row"><span className="source-dot muted"></span><div><strong>Document excerpt</strong><small>Page 1 · “directed to appear”</small></div><ArrowUpRight size={14} /></div></div>}</div></div><aside className="result-column right"><div className="result-card checklist-card"><div className="card-header"><span>NEXT THINGS TO LOOK INTO</span><span className="general-pill">General guidance</span></div>{checklist.map((item, i) => <div className="check-item" key={item.title}><span className={`check-box ${item.urgent ? 'urgent' : ''}`}>{item.urgent ? <Clock3 size={14} /> : <Check size={14} />}</span><div><strong>{item.title}</strong><p>{item.body}</p></div><span className="check-num">0{i + 1}</span></div>)}</div><div className="escalation-card"><div className="escalation-icon"><Scale size={20} /></div><div><span className="label escalation-label">HUMAN HELP IS PART OF THE MAP</span><h3>Talk to someone qualified</h3><p>If this document affects your rights, deadlines or safety, a lawyer or legal-aid worker can help apply the information to your situation.</p><a href="#resources">Find legal-aid resources <ArrowUpRight size={14} /></a></div></div></aside></div><div className="result-footer"><div className="feedback"><span>Was this explanation clear?</span><button className={feedback === 'helpful' ? 'selected' : ''} onClick={() => setFeedback('helpful')}><Check size={14} /> Yes</button><button className={feedback === 'unclear' ? 'selected' : ''} onClick={() => setFeedback('unclear')}><X size={14} /> Not quite</button></div><button className="restart-button" onClick={() => setDemoState('idle')}><RefreshCw size={14} /> Try another document</button></div></div>}
          </div>
        </div>
        <div className="demo-bottom-note"><ShieldCheck size={15} /><span>ChargeClear provides general legal information and navigation. <strong>It does not replace a lawyer.</strong></span></div>
      </div></section>

      <section className="section impact-section"><div className="container impact-grid"><div className="impact-intro"><div className="eyebrow dark"><span className="eyebrow-dot"></span>Why it matters</div><h2>Small clarity can unlock <em>the next right thing.</em></h2><p>For the person who received the notice, the family member helping them, or the legal-aid worker triaging the queue.</p></div><div className="metrics"><div className="metric"><strong>6</strong><span>clear steps<br />from upload to help</span></div><div className="metric"><strong>4</strong><span>ways to distinguish<br />what you know</span></div><div className="metric"><strong>1</strong><span>human pathway<br />when it matters</span></div></div></div></section>
    </main>
    <footer className="site-footer" id="resources"><div className="container footer-grid"><div><Brand light /><p>The navigation layer between receiving a legal document and knowing what information and human help to seek next.</p></div><div className="footer-links"><div><span>Explore</span><a href="#why">The problem</a><a href="#how">How it works</a><a href="#demo">Try the demo</a></div><div><span>Principles</span><a href="#trust">Our promise</a><a href="#resources">Human help</a><a href="mailto:hello@chargeclear.example">Contact</a></div></div></div><div className="container footer-bottom"><span>© 2025 ChargeClear · Lexcelerate '26</span><span>Not legal advice · No attorney-client privilege</span><span>Built for access to justice <HeartMark /></span></div></footer>
  </div>;
}

function HeartMark() { return <span className="heart-mark">✦</span>; }

export default App;
